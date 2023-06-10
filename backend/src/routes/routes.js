const {Router} = require('express');
const router = Router();

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const createUser = require('../models/UserFactory');
const Observer = require('../models/EventMangager');
const notificationObserver = new Observer();

const siteController = require('../controllers/SiteController');
const jamController = require('../controllers/JamController');


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

    const token = jwt.sign({_id: user._id}, 'secretkey');
    return res.status(200).json({token, user: user.toObject({ virtuals: true })});
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

    console.log('Request body:', req.body);

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if(nombre) user.nombre = nombre;
        if(lastname) user.lastname= lastname;
        if(email) user.email = email;
        if(password) user.password = password;
        if(role) user.role = role;
        if(gender) user.gender = gender;
        if(timezone) user.timezone = timezone;
        if(phoneNumber) user.phoneNumber = phoneNumber;
        if(birthdate) user.birthdate = birthdate;

        await user.save();

        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

//--------------------------------------------
// Routes del Jam Controller
router.get('/jams', jamController.getAllJams);
router.get('/jams/:id', jamController.getJamById);
router.post('/jams', jamController.createJam);
router.put('/jams/:id', jamController.updateJam);
router.delete('/jams/:id', jamController.deleteJam);

// Routes del Site Controller
router.get('/sites', siteController.getAllSites);
router.get('/sites/:id', siteController.getSiteById);
router.post('/sites', siteController.createSite);
router.put('/sites/:id', siteController.updateSite);
router.delete('/sites/:id', siteController.deleteSite);



module.exports.router = router;
module.exports.notificationObserver = notificationObserver;

