const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/user')
const {
    body,
    validationResult
} = require('express-validator');

router.post('/signup', [
    body('email').isEmail(),
    body('password').isLength({
        min: 5,
        max: 20
    })
], userCtrl.signup)
router.post('/login', [
    body('email').isEmail(),
    body('password').isLength({
        min: 5,
        max: 20
    })
], userCtrl.login)

module.exports = router