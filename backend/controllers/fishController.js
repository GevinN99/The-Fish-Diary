const Fish = require('../models/FishModel');

exports.createFish = async (req, res) => {
    const { name, species, price, description, images, videos, stock } = req.body;

    try {
        const newFish = new Fish({
            name,
            species,
            price,
            description,
            images,
            videos,
            stock,
        });

        const fish = await newFish.save();
        res.status(201).json(fish);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getAllFish = async (req, res) => {
    try {
        const fish = await Fish.find();
        res.json(fish);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getFishById = async (req, res) => {
    try {
        const fish = await Fish.findById(req.params.id);

        if (!fish) {
            return res.status(404).json({ message: 'Fish not found' });
        }

        res.json(fish);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.updateFishById = async (req, res) => {
    const { name, species, price, description, images, videos, stock } = req.body;

    try {
        const fish = await Fish.findById(req.params.id);

        if (!fish) {
            return res.status(404).json({ message: 'Fish not found' });
        }

        fish.name = name || fish.name;
        fish.species = species || fish.species;
        fish.price = price || fish.price;
        fish.description = description || fish.description;
        fish.images = images || fish.images;
        fish.videos = videos || fish.videos;
        fish.stock = stock || fish.stock;

        await fish.save();
        res.json(fish);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.deleteFishById = async (req, res) => {
    try {
        const fish = await Fish.findById(req.params.id);

        if (!fish) {
            return res.status(404).json({ message: 'Fish not found' });
        }

        await Fish.deleteOne({ _id: req.params.id });
        res.json({ message: 'Fish removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
