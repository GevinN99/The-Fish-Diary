const express = require('express');
const router = express.Router();
const tankController = require('../controllers/tankController');

router.post('/', tankController.createTank);
router.get('/', tankController.getAllTanks);
router.get('/:id', tankController.getTankById);
router.put('/:id', tankController.updateTankById);
router.delete('/:id', tankController.deleteTankById);

module.exports = router;