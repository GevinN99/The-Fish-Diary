const express = require('express');
const router = express.Router();
const {
    createFish,
    getAllFish,
    getFishById,
    updateFishById,
    deleteFishById
} = require('../controllers/fishController');
const passport = require("passport");

router.post('/', createFish);

router.get('/', getAllFish);

router.get('/:id', getFishById);

router.put('/:id', updateFishById);

router.delete('/:id', deleteFishById);

module.exports = router;
