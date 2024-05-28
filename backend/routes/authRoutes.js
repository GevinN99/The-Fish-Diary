const express = require('express');
const router = express.Router();
const passport = require('passport');
const { registerUser, loginUser } = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        const { user, token } = req.user;
        res.redirect(`http://localhost:3000/google?token=${token}&userId=${user.id}&name=${user.name}&role=${user.role}`);
    }
);

router.get('/logout', (req, res, next) => {
    req.logout(err => {
        if (err) { return next(err); }
        res.redirect('http://localhost:3000/');
    });
});

module.exports = router;
