const Tank = require('../models/TankModel');

exports.createTank = async (req, res) => {
    try {
        const newTank = new Tank(req.body);
        const savedTank = await newTank.save();
        res.status(201).json(savedTank);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getAllTanks = async (req, res) => {
    try {
        const tanks = await Tank.find();
        res.status(200).json(tanks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getTankById = async (req, res) => {
    try {
        const tank = await Tank.findById(req.params.id);
        if (!tank) {
            return res.status(404).json({ message: 'Tank not found' });
        }
        res.status(200).json(tank);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.updateTankById = async (req, res) => {
    try {
        const tank = await Tank.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!tank) {
            return res.status(404).json({ message: 'Tank not found' });
        }
        res.status(200).json(tank);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.deleteTankById = async (req, res) => {
    try {
        const tank = await Tank.findByIdAndDelete(req.params.id);
        if (!tank) {
            return res.status(404).json({ message: 'Tank not found' });
        }
        res.status(200).json({ message: 'Tank deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

