const Medic = require('../models/MedicModel');

exports.createMedic = async (req, res) => {
    const { name, description, images, videos, stock, price } = req.body;

    try {
        const newMedic = new Medic({
            name,
            description,
            images,
            videos,
            stock,
            price,
        });

        const savedMedic = await newMedic.save();
        res.status(201).json(savedMedic);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getAllMedics = async (req, res) => {
    try {
        const medics = await Medic.find();
        res.json(medics);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getMedicById = async (req, res) => {
    try {
        const medic = await Medic.findById(req.params.id);

        if (!medic) {
            return res.status(404).json({ message: 'Medic not found' });
        }

        res.json(medic);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.updateMedic = async (req, res) => {
    const { name, description, images, videos, stock, price } = req.body;

    try {
        let medic = await Medic.findById(req.params.id);

        if (!medic) {
            return res.status(404).json({ message: 'Medic not found' });
        }

        medic.name = name || medic.name;
        medic.description = description || medic.description;
        medic.images = images || medic.images;
        medic.videos = videos || medic.videos;
        medic.stock = stock || medic.stock;
        medic.price = price || medic.price;

        const updatedMedic = await medic.save();
        res.json(updatedMedic);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.deleteMedic = async (req, res) => {
    try {
        const medic = await Medic.findById(req.params.id);

        if (!medic) {
            return res.status(404).json({ message: 'Medic not found' });
        }

        await Medic.findByIdAndDelete(req.params.id);
        res.json({ message: 'Medic item removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

