const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res) => {
	if (req.user) {
		res.json({
			"expenses": req.user.expenses
		});
	} else {
		res.json({
			"error": "error"
		})
		res.redirect('/');
	}

});

module.exports = router;