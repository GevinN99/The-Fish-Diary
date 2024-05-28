const express = require('express');
const router = express.Router();
const { createAccessory, getAllAccessories, getAccessoryById, updateAccessory, deleteAccessory } = require('../controllers/AccessoryController');

router.post('/', createAccessory);
router.get('/', getAllAccessories);
router.get('/:id', getAccessoryById);
router.put('/:id', updateAccessory);
router.delete('/:id', deleteAccessory);

module.exports = router;
