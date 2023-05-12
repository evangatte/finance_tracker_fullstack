const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const User = require('.././models/User');

router.get('/', (req, res) => {
    res.render('register/register');
})

router.post('/', async (req, res) => {
    console.log(req.body.payPeriod, "|", req.body.payDay)
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
    });
    try {
        await newUser.save();
        res.redirect('/');
    } catch (e) {
        console.log(e.message);
        res.redirect('/')
    }
})

module.exports = router;