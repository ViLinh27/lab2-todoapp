//The /auth/register endpoint requires the bCrypt hash of the password the user submitted in order to be 
//able to persist the password to the database

//One method of making the hashed password available is to add a piece of middleware to the auth route which will
//hash the inbound password and add it to the request

//imports
const express = require("express");
const bcrypt = require("bcrypt");//for hashing
const jwt = require("jsonwebtoken");//for token

const User = require("../models/User");

const router = express.Router();

const saltRounds = 10;
const privateKey = ``;//sign the password hash//from RSA key generator

//middlware // pw needs hashing// executes on every inbound req
router.use(function(req, res, next) {
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            req.hashedPassword = hash;
            next(); // if post, andthe path is login,we go to login middlweare
        });
    });
})

//middleware for login route: persist new user //   login route
router.post("/login", async function (req, res, next) {
    if (req.body.username && req.body.password) {
        const user = await User.findOne() //await will let us resolve promise wihtout chaining a then catch
            .where("username")
            .equals(req.body.username)
            .exec();

        if (user) {
            return bcrypt
                .compare(req.body.password, user.password)
                .then((result) => {

                if (result === true) {
                    const token = jwt.sign({ id: user._id }, privateKey, {
                        algorithm: "RS256",
                    });

                    return res.status(200).json({ username: user.username, access_token: token });
                } 
                
                else {
                    return res.status(401).json({ error: "Invalid credentials." });
                }
            })  
            .catch((error) => {
                return res.status(500).json({ error: error.message });
            });
        }
    return res.status(401).json({ error: "Invalid credentials." });
    } 
    
    else {
        res.status(400).json({ error: "Username or Password Missing" });
    }
});

//middlware for register route: persist new user //  register route
router.post("/register", async function (req, res, next) {
    if (req.body.username && req.body.password && req.body.passwordConfirmation) {
        if (req.body.password === req.body.passwordConfirmation) {
            const user = new User({
                username: req.body.username,
                password: req.hashedPassword,
            });
            
            return user
                .save()
                .then((savedUser) => {
                    const token = jwt.sign({ id:user._id}, privateKey, {
                        algorithm:"RS256",
                    });

                    return res.status(201).json({
                        id: savedUser._id,
                        username: savedUser.username,
                        access_token:token,
                    });
                })
                .catch((error) => {
                    return res.status(500).json({ error: "Oh no, something went wrong." });
                });
        }

        res.status(400).json({ error: "Passwords not matching" });
    } 
    
    else {
        res.status(400).json({ error: "Username or Password Missing" });
    }
});

module.exports = router;


