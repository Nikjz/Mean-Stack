const router = require('express').Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', {
    scope: ['profile','email']
}));

router.get('/call', passport.authenticate('google'), (req, res) => {
    res.redirect('http://localhost:4200');
});

router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

router.get('/user', (req, res) => {
    res.status(200).json({
        user: req.user
    });
});
router.get('/logout', (req, res) => {
    req.logout();
    res.send('Loggedout');
    })
});

module.exports = router;
