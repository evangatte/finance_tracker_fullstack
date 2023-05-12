const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
	const updatedExpense = {}

	if (req.body.draftType === "Auto-draft") {
		updatedExpense.status = "Auto";
	} else {
		updatedExpense.status = req.body.status;
	}

	updatedExpense.expenseName = req.body.expenseName;
	updatedExpense.expenseAmount = req.body.expenseAmount;
	updatedExpense.dueDate = req.body.dueDate;
	updatedExpense.draftType = req.body.draftType;


	const user = await User.findById(req.user.id);

	user.expenses[req.body.expenseIndex] = updatedExpense;

	try {
		await user.save();		
		res.redirect('user/finance');
	} catch(e) {
		console.log(e.message)
		res.json({ "Operation": "Failed" });
	}
});

module.exports = router;