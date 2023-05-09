const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new mongoose.Schema({
    notificationType: {
      type: String,
      required: true
    },
    notificationText: {
      type: String,
      required: true
    },
    read: {
      type: Boolean,
      default: false
    
  }
}, { timestamps: true });

module.exports = notificationSchema; 

