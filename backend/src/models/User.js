const mongoose = require('mongoose');
const notificationSchema = require('./Notification');

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
        required: [true, "The password is necesary"],

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

