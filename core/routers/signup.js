const express = require('express');

const router = express.Router();

const User = require('../controllers/user');

router.get('/', (req, res) => {
    res.render('signup', { title: 'signup' });
});

router.post('/', User.create);

module.exports = router;
