const mongoose = require('mongoose');

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
        validate: [
            {
                validator: function (value) {
                    return mongoose
                        .model('Usuario')
                        .findOne({ email: value })
                        .exec()
                        .then(user => !user);
                },
                message: '{PATH} must be unique'
            }
        ]
    },
    password: {
        type: String,
        required: [true, "Password must required"]
    },
    role: {
        type: String,
        default: 'USER',
        required: [true],
        enum: validatedRols,
    },
});

userSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
  
    return userObject;
  };

module.exports = mongoose.model('Usuario', userSchema)
