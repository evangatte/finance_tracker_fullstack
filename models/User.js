const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	email: String,
	password: String,
	expenses: [{ 
		expenseName: String, 
		expenseAmount: Number,
		dueDate: Number,
		status: String
	}]
});




UserSchema.methods.expenseTotal = function() {
	let totalArray = [];
	this.expenses.forEach((arr) => {
		totalArray.push(arr.expenseAmount);
	}) 

	let sum = totalArray.reduce((partialSum, val) => partialSum + val, 0);
	return sum;
}




UserSchema.methods.nextDue = function() {
	const d = new Date();
	const currentDay = d.getDate();
	const newArr = [];

	this.expenses.forEach((obj) => {
		if (obj.dueDate >= currentDay) {
			newArr.push(obj)
		}
	})

	const returnArr = [];

	newArr.forEach((val) => {
		if ((val.dueDate - currentDay) <= 5) {
			returnArr.push(val)
		}
	})

	return returnArr;
}




module.exports = mongoose.model('User', UserSchema);