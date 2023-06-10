const Jam = require('../models/Jam');


// Create a new jam
exports.createJam = async (req, res, next) => {
  console.log('Entering POST /jams route');
  console.log('Request body:', req.body);

  try {
    const jam = new Jam(req.body);
    const savedJam = await jam.save();

    // Notifica a los observadores cuando se crea una nueva Jam
    const notificationData = {
        notificationType: 'NEW_JAM',
        notificationText: `A new Jam has been created: ${jam.theme}`
    };
    notificationObserver.notify(notificationData);

    res.status(201).json(savedJam);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating jam' });
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


// Get all jams
exports.getAllJams = async (req, res, next) => {
  try {
    const jams = await Jam.find();
    res.json(jams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Update a jam by ID
exports.updateJam= async (req, res, next) => {
  try {
    const jamId = req.params.id;
    const update = req.body;
    const options = { new: true };

    const updatedJam = await Jam.findByIdAndUpdate(jamId, update, options);

    if (!updatedJam) {
      return res.status(404).json({ message: 'Jam not found' });
    }
    res.json(updatedJam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating Jam' });
  }
};


// Delete a jam by ID
exports.deleteJam = async (req, res, next) => {
  const id = req.params.id;
  try {
    const jam = await Jam.findById(id);
 
    if (!jam) {
      return res.status(404).json({ message: 'Jam not found' });
    }
    await Jam.findByIdAndDelete(id);

    res.json({ message: 'Jam deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

