const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
	const user = await User.findById(req.user.id);
	const newBill = {};

	if (req.body.draftType === "Auto-draft") {
			newBill.status = "Auto"
	}

	newBill.expenseName = req.body.expenseName
	newBill.expenseAmount = req.body.expenseAmount
	newBill.dueDate = req.body.dueDate
	newBill.draftType = req.body.draftType

	user.expenses.push(newBill);

	await user.save();
	
	if (req.user) {
		res.redirect('/user/finance');
	} else {
		res.json({"Input": "Failed"});
	}
})

module.exports = router;