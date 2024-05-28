const express = require('express');
const router = express.Router();
const {
    createMedic,
    getAllMedics,
    getMedicById,
    updateMedic,
    deleteMedic,
} = require('../controllers/medicController');

router.post('/', createMedic);
router.get('/', getAllMedics);
router.get('/:id', getMedicById);
router.put('/:id', updateMedic);
router.delete('/:id', deleteMedic);

module.exports = router;
