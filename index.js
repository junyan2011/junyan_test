// libs
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

// own apps
const myApp = require('./core/routers/root.js');

// require('./config/db');

const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// use morgan to log requests to the console
app.use(morgan('dev'));

// add route
app.use('/', myApp);
// app.get('/', (req, res) => {
//     res.send('hellp world!');
// });

// =======================
// start the server ======
// =======================
const port = process.env.PORT || 3000;
app.listen(port);
console.log('Magic happens at http://localhost: ', port);
