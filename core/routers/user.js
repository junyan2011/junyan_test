const express = require('express');

const router = express.Router();

const User = require('../controllers/user');
// const Auth = require('../controllers/authVerifController');

router.post('/', User.create);
// router.get('/:uid', Auth.isSignedIn, User.read);
// router.put('/:uid', Auth.isSignedIn, User.update);

// API Server Endpoints
module.exports = router;
