const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../database'); // Importa el objeto sequelize desde el archivo database.js

class product extends Model {}

product.init(
    {
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
        },
        tipo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        foto: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false,
        }
    },
    {
        sequelize,
        modelName: 'product',
    }
);


// Función para obtener todos los productos
product.getAll = async()=>{
    try{
        const [rows] = await db.execute("SELECT * FROM producto");
        return rows;
    }catch(err){
        console.log("An error has ocurred with getAll function");
        throw err;
    }
}

// Función para obtener un producto especifico
product.getById = async(codigo) =>{
    try{
        const [rows] = await db.execute("SELECT * FROM producto WHERE codigo = ?", [codigo]);
        return rows;
    }catch(err){
        console.log("An error has ocurred with getById function");
        throw err;
    }
}

// Función para agregar productos a la base de datos
product.add = async(nombre,cantidad,tipo,foto) =>{
    try{
        const [result] = await db.execute("INSERT INTO PRODUCTO(nombre,cantidad,tipo,foto) values(?,?,?,?)",[nombre,cantidad,tipo,foto]);
        return result.insertId;
    }catch(err){
        console.log("An error has ocurred with add function");
        throw err;
    }
}

// Función para eliminar elementos de la base de datos
product.delete = async(codigo)=>{
    try{
        await db.execute("DELETE FROM PRODUCTO WHERE CODIGO = ?",[codigo]);
    }catch(err){
        console.log("An error has ocurred with delete function");
        throw err;
    }
}

//Funcion para actualizar los valores en la base de datos
product.update = async(codigo,nombre,cantidad,tipo,foto) =>{
    try{
        const [result] = await db.execute("UPDATE PRODUCTO SET nombre = ?, cantidad = ?, tipo = ?, foto = ? WHERE codigo = ?",[nombre, cantidad, tipo, foto, codigo]);
        return product.getById(codigo);
    }catch(err){
        console.log("An error has ocurred with update function");
        throw err;
    }
}


module.exports = product;