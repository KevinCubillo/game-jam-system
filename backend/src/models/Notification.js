const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let notificationSchema = new Schema({
    notificationType: {
        type: String,
        required: [true, "Notification type is required"]
    },
    seen: {
        type: Boolean,
        default: false
    },
    notificationText: {
        type: String,
        required: [true, "Notification text is required"]
    }
}, { timestamps: true });

module.exports = notificationSchema; 

