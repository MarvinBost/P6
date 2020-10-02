const bcrypt = require('bcrypt') // import bcrypt
const jwt = require('jsonwebtoken') // import jsonwebtoken jwt
const User = require('../models/User') // import model User
const {
    body,
    validationResult
} = require('express-validator'); // import express-validator

exports.signup = (req, res, next) => { // export middleware signup
    const errors = validationResult(req);
    if (!errors.isEmpty()) { // if the "errors" variable is not empty
        return res.status(400).json({ // return response statut 400 (Bad Request)
            errors: errors.array()
        });
    }
    bcrypt.hash(req.body.password, 10) // use bcrypt to hashing password with 10 pass
        .then(hash => { // anonyme function with hash param
            const user = new User({ // create user with model User
                email: req.body.email, // email is body request email
                password: hash // password is hashed password
            })
            user.save() // save user on DB with mongoose
                .then(() => res.status(201).json({ // if promise is ok, i send response with status 201 (CREATED)
                    message: 'Utilisateur créé !' // with message : 'Utilisateur crée !'
                }))
                .catch(err => res.status(400).json({ // catch error and send response with status 400 (CLIENT ERROR)
                    err
                }))
        })
        .catch(err => res.status(500).json({ // catch error and send response status 500 (SERVER ERROR)
            err
        }))
}

exports.login = (req, res, next) => { // export middleware login
    const errors = validationResult(req);
    if (!errors.isEmpty()) { // if the "errors" variable is not empty
        return res.status(400).json({ // return response statut 400 (Bad Request)
            errors: errors.array()
        });
    }
    User.findOne({ // use a mongoose function called "findOne" to search for an item on DB
            email: req.body.email // search email on database
        })
        .then(user => { // promise send user
            if (!user) { // if user is empty
                return res.status(404).json({ // send response with status 404 (Not Found)
                    error: 'Utilisateur non trouvé !'
                })
            }
            bcrypt.compare(req.body.password, user.password) // compare password with bcrypt
                .then(valid => { // promise
                    if (!valid) { // if valid is false
                        res.status(401).json({ // send response with status 401 (Unauthorized)
                            error: 'Mot de passe incorrect !'
                        })
                    }
                    res.status(200).json({ // if valid is true send response with status 200 (OK) and response body :
                        userId: user._id, // user id on database
                        token: jwt.sign({ // and token for auth request
                                userId: user._id
                            },
                            'UW567vENFuehdb8WX743f7P6z7WmBr', { // secret key to generate a token, it's possible to put it in the .env
                                expiresIn: '24h' // expires in 24 hours
                            }
                        )
                    })
                })
                .catch(err => res.status(500).json({ // catch error server and send status 500 (Server Error)
                    err
                }))
        })
        .catch(err => res.status(500).json({ // catch error server and send status 500 (Server Error)
            err
        }))
}