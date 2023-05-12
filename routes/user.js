const express = require('express');
const router = express.Router();
const User = require('../models/User.js');

router.get('/finance', async (req, res) => {
	if (req.user) {
		try {
			const user = await User.findById(req.user.id);

			res.render('user/userFinancePage');
		} catch (e) {
			console.log(e.message)
			res.redirect('/')
		}
	} else {
		res.redirect('/');
	}
});

module.exports = router;