const express = require("express");
require('dotenv').config()
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../model/user.model");
const auth = require("../middleware/auth.middleware");

userRouter.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        let existing = await UserModel.findOne({ email });

        if (existing) {
            return res.status(400).send({ message: "Email Already Registered." });
        }

        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                return res.status(400).send({ message: err.message });
            }
            try {
                let newUser = new UserModel({ username, email, password: hash });
                await newUser.save();

                let token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
                res.status(200).send({ message: "Registration successful.", token , username:newUser.username, score:newUser.score});
            } catch (error) {
                res.status(400).send({ message: error.message });
            }
        });
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
});


userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).send({ statusCode: 404, message: 'User not found' });
        }


        const isPasswordValid = await new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        if (!isPasswordValid) {
            return res.status(400).send({ message: "Invalid password" });
        }
        const token = jwt.sign({ username: user.username, userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.status(200).json({ message: "Login successful.", token, username:user.username, score:user.score});

    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

userRouter.use(auth);
userRouter.post("/score", async (req, res) => {
    console.log("route is correct");
    const userId = req.userId;
    try {
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).send({ statusCode: 404, message: 'User not found' });
        }
        user.score += 1;
        await user.save();
        res.status(200).send({ message: "Score increased successfully.", score: user.score });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});


userRouter.get("/leaderboard",async (req, res) => {
    try {
        const users = await UserModel.find().sort({ score: -1 });
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

module.exports = {
    userRouter
}