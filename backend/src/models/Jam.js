const mongoose = require('mongoose');

// Esquema de la colecciÃ³n Jams
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
    type: DateTime,
    required: true
  },
  startDate: {
    type: DateTime,
    required: true
  },
  theme: {
    type: String,
    required: true
  },
  experiences: [String]
});


module.exports = mongoose.model('Jam', jamSchema);
