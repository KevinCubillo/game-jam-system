const { json } = require("express");
const productsMdl = require("../models/product");
const inventoryCtrl = {};

//Obtener todos los productos de la base de datos

inventoryCtrl.getProducts = async(req,res)=>{
    const products = await productsMdl.getAll();
    res.json(products);
};
//------------------------------------------------

//Agregar un nuevo producto
inventoryCtrl.createProduct = async(req,res)=>{
    const data = req.body;
    const result = await productsMdl.add(data.nombre, data.cantidad, data.tipo, data.foto);
    res.send("Id: " + result);
};
//------------------------------------------------

//Obtener un producto en especifico por su código
inventoryCtrl.getProduct = async(req,res)=>{
    const id = req.params.id;
    const product = await productsMdl.getById(id);
    res.json(product);
}
//------------------------------------------------

//Actualizar un producto por su código
inventoryCtrl.updateProduct = async(req,res)=>{
    const data = req.body;
    const product = await productsMdl.update(data.codigo, data.nombre, data.cantidad, data.tipo, data.foto);
    res.json(product);
}
//------------------------------------------------

//Eliminar un producto por su código
inventoryCtrl.deleteProduct = async(req,res)=>{
    const id = req.params.id;
    await productsMdl.delete(id);
    res.json("Se borró compa, ya no hay");
}
//------------------------------------------------

module.exports = inventoryCtrl;

