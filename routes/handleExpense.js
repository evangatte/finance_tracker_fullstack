const express = require('express');
const router = express();
const User = require('../models/User');


router.post('/input-expense', async (req, res) => {
	const user = await User.findById(req.user.id);

	const newBill = {
		expenseName: req.body.name,
		expenseAmount: req.body.amount
	}

	user.expenses.push(newBill);

	//console.log(req.body.name)
	await user.save();

	
	if (req.user) {
		res.json({"Input": "Successful"});
	} else {
		res.json({"Input": "Failed"});
	}
})




module.exports = router;