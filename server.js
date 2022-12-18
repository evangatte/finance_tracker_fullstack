const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
const local = require('./strategies/local');
const mongoose = require('mongoose');
const path = require('path');

mongoose.connect('mongodb://127.0.0.1/finance_db', () => {console.log('connected')}, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/client')));
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});


app.get('/', (req, res) => {
    if (req.user) {
        res.redirect('/user/finance');
    } else {
        res.render('home/home');
    }
});



app.use('/login', require('./routes/login'));
app.use('/register', require('./routes/register'));
app.use('/input-expense', require('./routes/inputExpense'));
app.use('/fetch-info', require('./routes/fetchInfo'));
app.use('/edit-expense', require('./routes/editExpense'));
app.use('/delete-expense', require('./routes/deleteExpense'));
app.use('/user', require('./routes/user'));

const port = 3000;
app.listen(port, () => {console.log(`Listening on port: ${port}`)});