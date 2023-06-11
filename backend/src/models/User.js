const mongoose = require('mongoose');
const notificationSchema = require('./Notification');

let validatedRols = {
    values: ['ADMIN', 'USER'],
    message: '{VALUE} is not a valid role'
}

let Schema = mongoose.Schema;

let userSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "The name is necessary"],
    },
    lastname: {
        type:String,
    },
    email: {
        type: String,
        required: [true, "The email is necessary"],
    },
    password: {
        type: String,
        required: [true, "Password must be provided"]
    },
    role: {
        type: [{
            type: String,
            enum: validatedRols.values
        }],
        default: ['USER']
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'], // Agrega o modifica estos valores según tus necesidades
    },
    timezone: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    birthdate: {
        type: Date,
    },
    notifications: [notificationSchema]
}, { timestamps: true });

userSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
};

userSchema.methods.update = async function (data) {
    this.notifications.push(data);
    await this.save();
};

module.exports = mongoose.model('User', userSchema)

