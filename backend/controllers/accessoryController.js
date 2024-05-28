const Accessory = require('../models/AccessoryModel');

exports.createAccessory = async (req, res) => {
    const { name, category, price, description, images, stock } = req.body;

    try {
        const newAccessory = new Accessory({
            name,
            category,
            price,
            description,
            images,
            stock
        });

        const accessory = await newAccessory.save();
        res.status(201).json(accessory);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getAllAccessories = async (req, res) => {
    try {
        const accessories = await Accessory.find();
        res.json(accessories);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getAccessoryById = async (req, res) => {
    try {
        const accessory = await Accessory.findById(req.params.id);

        if (!accessory) {
            return res.status(404).json({ message: 'Accessory not found' });
        }

        res.json(accessory);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.updateAccessory = async (req, res) => {
    const { name, category, price, description, images, stock } = req.body;

    try {
        const accessory = await Accessory.findById(req.params.id);

        if (!accessory) {
            return res.status(404).json({ message: 'Accessory not found' });
        }

        accessory.name = name || accessory.name;
        accessory.category = category || accessory.category;
        accessory.price = price || accessory.price;
        accessory.description = description || accessory.description;
        accessory.images = images || accessory.images;
        accessory.stock = stock || accessory.stock;

        const updatedAccessory = await accessory.save();
        res.json(updatedAccessory);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.deleteAccessory = async (req, res) => {
    try {
        const accessory = await Accessory.findById(req.params.id);

        if (!accessory) {
            return res.status(404).json({ message: 'Accessory not found' });
        }

        await Accessory.deleteOne({ _id: req.params.id });
        res.json({ message: 'Accessory removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
