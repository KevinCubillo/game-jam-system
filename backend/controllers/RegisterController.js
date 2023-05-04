const express = require('express');
const bcrypt = require('bcrypt');
const User = require('./../models/User');
const path = require('path');

class RegisterController {

    renderRegister(req, res) {
        let renderRegister = path.resolve(__dirname, './../views/register.html');
        res.sendFile(renderRegister);
    }

    async register(req, res) {
        try {
            const body = req.body;
            const { nombre, email, password, role } = body;
            const newUser = new User({
                nombre,
                email,
                password: await bcrypt.hash(password, 10),
                role,
            });
            const UserDB = await newUser.save();
            res.redirect('/welcome');
        } catch (err) {
            return res.status(400).json({
                ok: false,
                err: err.message,
            });
        }
    }
}

module.exports = new RegisterController();
