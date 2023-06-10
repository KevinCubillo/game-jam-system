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

  const token = jwt.sign({ _id: newUser._id }, 'secretkey');
  res.status(200).json({ token });
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
router.post('/userExists', async (req, res) => {
  const { email } = req.body;
  const existingUser = await User.findOne({ email: email });;
  if (existingUser) {
    res.status(409).send('El correo electrónico ya está en uso.');
  } else {
    res.status(200).send();
  }
});


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

