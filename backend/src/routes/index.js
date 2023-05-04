const express = require("express");
const router = express.Router();

const user = require('../models/User');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const path = require('path');
const inventoryCtrl = require("../controllers/inventory");



router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    const newUser = new user({email, password});
    await newUser.save();
    const token = jwt.sign({_id: newUser._id}, 'secretkey');
    res.json({message: 'User Created', token});
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });
    if(!user) return res.status(401).send("The email doesn't exists");
    if(user.password !== password) return res.status(401).send("Wrong Password");
    const token = jwt.sign({_id: user._id}, 'secretkey');
    return res.status(200).json({token});
});

router.post('/userExists', async (req, res) => {
    const { email } = req.body;
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      res.status(409).send('El correo electrónico ya está en uso.');
    } else {
      res.status(200).send();
    }
  });

/*============== RUTAS PARA LOS PRODUCTOS =============================*/

//Ruta para obtener todos los productos de la base de datos
router.get('/products', inventoryCtrl.getProducts);

//Ruta para obtener un producto en especifico por su código
router.get('/product/:id', inventoryCtrl.getProduct);

//Ruta para agregar un nuevo producto
router.post('/product', inventoryCtrl.createProduct);

//Ruta para actualizar un producto por su código
router.put('/product', inventoryCtrl.updateProduct);

//Ruta para eliminar un producto por su código
router.delete('/product/:id',inventoryCtrl.deleteProduct);


module.exports = router;