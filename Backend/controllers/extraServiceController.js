const ExtraService = require('../models/ExtraService');

exports.createExtraService = async (req, res) => {
  try {
    const { name, price, branch, details } = req.body;
    const newExtraService = new ExtraService({
      name,
      price,
      branch,
      details
    });
    await newExtraService.save();
    res.status(201).json(newExtraService);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getExtraServices = async (req, res) => {
  try {
    const extraServices = await ExtraService.find();
    res.status(200).json(extraServices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getExtraService = async (req, res) => {
  try {
    const extraService = await ExtraService.findById(req.params.id);
    if (!extraService) {
      return res.status(404).json({ error: 'Extra service not found' });
    }
    res.status(200).json(extraService);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateExtraService = async (req, res) => {
  try {
    const { name, price, branch, details } = req.body;
    const updatedExtraService = await ExtraService.findByIdAndUpdate(
      req.params.id,
      { name, price, branch, details },
      { new: true }
    );
    if (!updatedExtraService) {
      return res.status(404).json({ error: 'Extra service not found' });
    }
    res.status(200).json(updatedExtraService);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteExtraService = async (req, res) => {
  try {
    const deletedExtraService = await ExtraService.findByIdAndDelete(req.params.id);
    if (!deletedExtraService) {
      return res.status(404).json({ error: 'Extra service not found' });
    }
    res.status(200).json({ message: 'Extra service deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
