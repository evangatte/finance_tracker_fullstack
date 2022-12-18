const express = require('express');
const router = express.Router();
const User = require('../models/User');


router.post('/', async (req, res) => {
	const updatedExpense = {
		expenseName: req.body.expenseName,
		expenseAmount: req.body.expenseAmount,
		dueDate: req.body.dueDate
	}

	const user = await User.findById(req.user.id);

	user.expenses[req.body.expenseIndex] = updatedExpense

	try {
		await user.save();		
		res.redirect('user/finance');
	} catch(e) {
		res.json({ "Operation": "Failed" });
	}




});






module.exports = router;