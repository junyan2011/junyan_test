const express = require('express');
const path = require('path');

const app = express();

// const auth = require('./authRoutes');
// const user = require('./user');
const signup = require('./signup');

console.log(__dirname);

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');

app.use('/signup/', signup);

app.get('/', (req, res) => {
    res.render('home', { title: 'welcome' });
});
// router.use('/auth/', auth);
// router.use('/user/', user);


module.exports = app;
