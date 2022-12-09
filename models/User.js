const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	email: String,
	password: String,
	expenses: [{ 
		expenseName: String, 
		expenseAmount: Number,
	}]
});




UserSchema.methods.addExpenses = function() {
	let totalArray = [];
	this.expenses.forEach((arr) => {
		totalArray.push(arr.expenseAmount)
	}) 

	let sum = totalArray.reduce((partialSum, val) => partialSum + val, 0);
	return sum;
}


UserSchema.methods.getSpendingMoney = function() {
	let check = 500;
	let expenseDayArray = [];

	
	
	let expenseTotal = this.addExpenses()

	let spendingMoney = check - expenseTotal;
	return spendingMoney;
}


UserSchema.methods.daysUntilCheck = function() {
	
}

module.exports = mongoose.model('User', UserSchema);