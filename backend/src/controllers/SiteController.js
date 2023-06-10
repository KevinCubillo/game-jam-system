
const Site = require('../models/Site');

// Create a new site
exports.createSite = async (req, res, next) => {
    console.log('Entering POST /sites route');
    console.log('Request body:', req.body);
  
    try {
      const site = new Site(req.body);
      const savedSite = await site.save();
  
      // Notifica a los observadores cuando se crea una nueva Jam
      const notificationData = {
          notificationType: 'NEW_SITE',
          notificationText: `A new Site has been created: ${site.theme}`
      };
      notificationObserver.notify(notificationData);
  
      res.status(201).json(savedSite);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error creating Site' });
    }
};

// Get all sites
exports.getAllSites = async (req, res, next) => {
    try {
        const sites = await Site.find();
        res.json(sites);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
};

// Get a single site by ID
exports.getSiteById = async (req, res, next) => {
    try {
        const site = await Site.findById(req.params.id);
        res.json(site);
    } catch (error) {
        next(error);
    }
};

//Update a site by ID
exports.updateSite = async (req, res, next) => {
    try{
        const siteId = req.params.id;
        const update = req.body;
        const options = { new: true };

        const updateSite = await Jam.findByIdAndUpdate(siteId, update, options);

        if (!updateSite) {
            return res.status(404).json({ message: 'Site not found' });
        }
        res.json(updateSite);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating Site' });
    }
};

// Delete a site by ID
exports.deleteSite= async (req, res, next) => {
    const id = req.params.id;
    try {
      const site = await Jam.findById(id);
   
      if (!site) {
        return res.status(404).json({ message: 'Site not found' });
      }
      await Site.findByIdAndDelete(id);
  
      res.json({ message: 'Site deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
};
