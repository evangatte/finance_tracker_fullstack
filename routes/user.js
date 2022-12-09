const express = require('express');
const router = express();


router.get('/finance', (req, res) => {
	if (req.user) {
		res.render('user/userFinancePage');
	} else {
		res.redirect('/');
	}
})







module.exports = router;