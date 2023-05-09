const {Router} = require('express');
const router = Router();

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Jam = require('../models/Jam');
const createUser = require('../models/UserFactory');
const Observer = require('../models/EventMangager');
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

  // Crea una instancia del usuario según el rol
  const newUser = createUser(role, { nombre, email, password, role });

  await newUser.save();

  // Suscribe al usuario al Observer de notificaciones
  notificationObserver.subscribe(newUser);

  const token = jwt.sign({ _id: newUser._id }, 'secretkey');
  res.status(200).json({ token });
});



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
        return res.status(200).json({token});
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

router.get('/profile', verifyToken, (req, res) => {
    res.send(req.userId);
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

//--------------------------------------------
// Routes del Jam Controller
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
      await jam.remove();

      res.json({ message: 'Jam deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

//--------------------------------------------
module.exports.router = router;
module.exports.notificationObserver = notificationObserver;

