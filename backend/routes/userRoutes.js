const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const { viewAllUsers, updateUserById, deleteUser } = require('../controllers/userController');
const passport = require('passport');

// Profile Routes
router.get('/profile', passport.authenticate('jwt', { session: false }), getUserProfile);
router.put('/profile', passport.authenticate('jwt', { session: false }), updateUserProfile);

// Admin Routes
router.get('/', viewAllUsers);
router.put('/:id', updateUserById);
router.delete('/:id', deleteUser);

module.exports = router;
