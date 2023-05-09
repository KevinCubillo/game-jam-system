const Jam = require('../models/Jam');

// Create a new jam
exports.createJam = async (req, res, next) => {
  try {
    const jam = new Jam(req.body);
    await jam.save();
    res.status(201).json(jam);
  } catch (error) {
    next(error);
  }
};

// Get all jams
exports.getAllJams = async (req, res, next) => {
  try {
    const jams = await Jam.find();
    res.json(jams);
  } catch (error) {
    next(error);
  }
};

// Get a single jam by ID
exports.getJamById = async (req, res, next) => {
  try {
    const jam = await Jam.findById(req.params.id);
    res.json(jam);
  } catch (error) {
    next(error);
  }
};

// Update a jam by ID
exports.updateJamById = async (req, res, next) => {
  try {
    const jam = await Jam.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(jam);
  } catch (error) {
    next(error);
  }
};

// Delete a jam by ID
exports.deleteJamById = async (req, res, next) => {
  try {
    await Jam.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
