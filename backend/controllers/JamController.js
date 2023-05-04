const mongoose = require('mongoose');

// Define schema for Jam model
const jamSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  categories: {
    type: String,
    enum: ['category1', 'category2', 'category3'] // insert your desired categories here
  },
  endDate: {
    type: Date,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  theme: {
    type: String,
    required: true
  },
  experiences: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Experience'
  }],
  themes: [{
    type: String
  }]
});

// Define Jam model
//const Jam = mongoose.model('Jam', jamSchema);

module.exports = mongoose.model('Jam', jamSchema);
