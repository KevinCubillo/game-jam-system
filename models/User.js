const mongoose = require('mongoose');

var uniqueValidator = require('mongoose-unique-validator');

let validatedRols = {
    values: ["ADMIN", "USER"],
    message: '{VALUE} is not a valid rol'
}


let Schema = mongoose.Schema;

let userSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "The name is necesary"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "The password is necesary"],
    },
    role: {
        type: String,
        default: 'USER',
        required: [true],
        enum: validatedRols,
    },
});

userSchema.methods.toJSON = () => {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

userSchema.plugin(uniqueValidator, {
    message: '{PATH} most be unique'
})

module.exports = mongoose.model('Usuario', userSchema)
