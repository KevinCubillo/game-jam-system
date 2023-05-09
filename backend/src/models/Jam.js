const mongoose = require('mongoose');

// Esquema de la coleccion Jams
const jamSchema = new mongoose.Schema({
  categories: {
    type: String,
    enum: ['category1', 'category2', 'category3'] // categorias
  },
  name: {
    type: String,
    required: true
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
  experiences: [String]
});


module.exports = mongoose.model('Jam', jamSchema);
