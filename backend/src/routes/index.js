const {Router} = require('express');
const router = Router();

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Jam = require('../models/Jam');
const Site = require('../models/Site');
const createUser = require('../models/UserFactory');
const Observer = require('../models/EventMangager');
const { add } = require('../models/Notification');
const { use } = require('moongose/routes');
const notificationObserver = new Observer();


router.get('/', (req, res) => {
  res.send('Hello World');
});

User.find({ role: "ADMIN" }).then(adminUsers => {
adminUsers.forEach(adminUser => {
    notificationObserver.subscribe(adminUser);
});
});
async function subscribeExistingUsers() {
try {
  const users = await User.find();
  users.forEach(user => {
    notificationObserver.subscribe(user);
  });
} catch (err) {
  console.error('Error subscribing existing users:', err);
}
}

router.post('/signup', async (req, res) => {
const { nombre, email, password, role } = req.body;

// Asegúrate de que el campo role sea un arreglo
const roles = [role];

// Crea una instancia del usuario según el rol
const newUser = createUser(roles, { nombre, email, password, role });

await newUser.save();

// Suscribe al usuario al Observer de notificaciones
notificationObserver.subscribe(newUser);

const token = jwt.sign({ _id: newUser._id }, 'secretkey');
return res.status(200).json({ token, user: newUser.toObject({ virtuals: true }) });
});

router.post('')


router.post('/signin', async (req, res) => {
  const {email, password} = req.body;
  try {
      const user = await User.findOne({ email: email });
      if (!user) {
          return res.status(404).send({message: 'the email does not exist'});
      }
      if (user.password !== password) {
          return res.status(401).send({message: 'Password is wrong'});
      }
      const token = jwt.sign({_id: user._id}, 'secretkey');
      return res.status(200).json({token, user: user.toObject({ virtuals: true })});
  } catch (error) {
      console.log(error);
      return res.status(500).send({message: error});
  }
});

router.get('/public', (req, res) => {
  res.send('Hello Public World');
});

router.get('/private', verifyToken, (req, res) => {
  res.send(req.userId);
});

router.get('/profile', verifyToken, async (req, res) => {
  try {
      const user = await User.findById(req.userId);

      if (!user) {
          return res.status(404).send('User not found');
      }

      res.json(user);
  } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
  }
});

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
      return res.status(401).send('Unauthorized Request');
  }
  const token = req.headers.authorization.split(' ')[1];
  if (token === 'null') {
      return res.status(401).send('Unauthorized Request');
  }
  const payload = jwt.verify(token, 'secretkey');
  req.userId = payload._id;
  next();
}
router.post('/userExists', async (req, res) => {
const { email } = req.body;
const existingUser = await User.findOne({ email: email });

if (existingUser) {
  res.status(409).send('El correo electrónico ya está en uso.');
} else {
  res.status(200).send();
}
});

router.get('/users/:userId', async (req, res) => {
  try {
      // Intentar encontrar al usuario en la base de datos
      const user = await User.findById(req.params.userId);

      // Si no se encontró al usuario, enviar un error
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Enviar los detalles del usuario
      res.json(user);
  } catch (err) {
      // Enviar cualquier error que ocurra
      res.status(500).json({ message: err.message });
  }
});

// Ruta para actualizar un usuario existente por su ID
router.put('/users/:userId', verifyToken, async (req, res) => {
const userId = req.params.userId;
const { nombre, lastname, email, password, role, gender, timezone, phoneNumber, birthdate } = req.body;

try {
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    if (nombre) user.nombre = nombre;
    if (lastname) user.lastname = lastname;
    if (email) user.email = email;
    if (password) user.password = password;
    if (role) user.role = role instanceof Array ? role : [role];
    if (gender) user.gender = gender;
    if (timezone) user.timezone = timezone;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (birthdate) user.birthdate = birthdate;

    await user.save();

    res.json(user);
} catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
}
});

router.get('/users', async (req, res) => {
  try {
      const users = await User.find();
      res.json(users);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

router.put('/users/:userId/role', async (req, res) => {
  userId = req.params.userId;
  role = req.body.role;
  //siteId = req.body.siteId;
  const user = await User.findById(userId);
  if (!user) {
      return res.status(404).json({ message: 'User not found' });
  }
  user.role.push(role);
  //user.sites.push(siteId);
  await user.save();
  res.json(user);
});


//--------------------------------------------
// Routes del Jam 
//--------------------------------------------

// Ruta para obtener todas las Jams
router.get('/jams', async (req, res) => {
    try {
        const jams = await Jam.find();
        res.json(jams);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
});

// Ruta para obtener una Jam especÃ­fica por su ID
router.get('/jams/:id', async (req, res) => {
    try {
      const jam = await Jam.findOne({ _id: req.params.id }).populate('experiences');
      if (!jam) {
        return res.status(404).json({ message: 'Jam not found' });
      }
      res.json(jam);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  
// Ruta para crear una nueva Jam
router.post('/jams', async (req, res) => {
  console.log('Entering POST /jams route');
  console.log('Request body:', req.body);

  try {
    const jam = new Jam(req.body);
    const savedJam = await jam.save();

    // Notifica a los observadores cuando se crea una nueva Jam
    const notificationData = {
        notificationType: 'NEW_JAM',
        notificationText: `A new Jam has been created: ${jam.theme}`
    };
    notificationObserver.notify(notificationData);

    res.status(201).json(savedJam);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating jam' });
  }
});


  
// Ruta para actualizar una Jam existente por su ID
router.put('/jams/:id', async (req, res) => {
    try {
      const jamId = req.params.id;
      const update = req.body;
      const options = { new: true };

      const updatedJam = await Jam.findByIdAndUpdate(jamId, update, options);
  
      if (!updatedJam) {
        return res.status(404).json({ message: 'Jam not found' });
      }
      res.json(updatedJam);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating Jam' });
    }
  });
  

// Ruta para eliminar una Jam existente por su ID
router.delete('/jams/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const jam = await Jam.findById(id);
   
      if (!jam) {
        return res.status(404).json({ message: 'Jam not found' });
      }
      await Jam.findByIdAndDelete(id);

      res.json({ message: 'Jam deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  addSiteToJam = async (jamId, siteId) => {
    try {
      const jam = await Jam.findById(jamId);
      if (!jam) {
        return res.status(404).json({ message: 'Jam not found' });
      }
      jam.sites.push(siteId);
      await jam.save();
      return jam;
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };


//--------------------------------------------
// Routes del Site
//--------------------------------------------

// Ruta para obtener todos los Sites
router.get('/sites', async (req, res) => {
    try {
        const sites = await Site.find();
        res.json(sites);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
});

// Ruta para obtener un Site especÃ­fico por su ID
router.get('/sites/:id', async (req, res) => {
  try {
    const site = await Site.findById(req.params.id);
    res.json(site);
} catch (error) {
    next(error);
}
});

// Ruta para crear un nuevo Site
router.post('/sites', async (req, res) => {
  console.log('Entering POST /sites route');
  console.log('Request body:', req.body);

  try {
    const site = new Site(req.body);
    const savedSite = await site.save();

    // Notifica a los observadores cuando se crea una nueva Jam
    const notificationData = {
        notificationType: 'NEW_SITE',
        notificationText: `A new Site has been created: ${site.theme}`
    };
    addSiteToJam(site.jamId, savedSite._id);
    notificationObserver.notify(notificationData);
    res.status(201).json(savedSite);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating Site' });
  }
});

// Ruta para actualizar un Site existente por su ID
router.put('/sites/:id', async (req, res) => {
  try{
    const siteId = req.params.id;
    const update = req.body;
    const options = { new: true };

    const updateSite = await Jam.findByIdAndUpdate(siteId, update, options);

    if (!updateSite) {
        return res.status(404).json({ message: 'Site not found' });
    }
    res.json(updateSite);
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating Site' });
}
});

// Ruta para eliminar un Site existente por su ID
router.delete('/sites/:id', async (req, res) => {
  const id = req.params.id;
    try {
      const site = await Jam.findById(id);
   
      if (!site) {
        return res.status(404).json({ message: 'Site not found' });
      }
      await Site.findByIdAndDelete(id);
  
      res.json({ message: 'Site deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
});




module.exports.router = router;
module.exports.notificationObserver = notificationObserver;

