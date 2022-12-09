const express = require('express');
const router = express.Router();
const passport = require('passport');


router.get('/', (req, res) => {
	res.send("failed");
})

router.post(
    '/',
    passport.authenticate('local', {
        successRedirect: '/user/finance',
        failureRedirect: '/',
    }),
);

router.get('/out', (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    })
});


module.exports = router;