const express = require('express');
const router = express.Router();
const User = require('../models/User');


router.post('/', async (req, res) => {
	if (req.user) {
		const index = req.body.expenseIndex;
		try {
			const user = await User.findById(req.user.id);
			user.expenses.splice(index, 1);
			await user.save();		
			res.redirect('user/finance');

		} catch (e) {
			res.json({ "Operation": "Failed" });

		}
	} else {
		res.json({
			"error": "error"
		})
	}

});



module.exports = router;