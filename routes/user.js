const express = require('express') // import express
const router = express.Router()
const userCtrl = require('../controllers/user') // import controller user
const {
    body,
    validationResult
} = require('express-validator'); // import express-validator

router.post('/signup', [ //route /signup
    body('email').isEmail(), // check if 'email' is a email
    body('password').isLength({ // check if password length is equal : min 5 letters and max 20 letters
        min: 5,
        max: 20
    })
], userCtrl.signup) // use controller user with signup
router.post('/login', [ //route /login
    body('email').isEmail(), // check if 'email' is a email
    body('password').isLength({ // check if password length is equal : min 5 letters and max 20 letters
        min: 5,
        max: 20
    })
], userCtrl.login) // use controller user with login

module.exports = router