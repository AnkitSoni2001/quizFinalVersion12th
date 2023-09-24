const { validationResult } = require("express-validator");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/User");

const JWT_SECRET = "helloiamsecret";

// Create a User
const createUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res
                .status(200)
                .json({ success: false, error: "sorry a user with this email already exists" });
        }
        // using bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        const authToken = jwt.sign({ user: { id: user.id } }, JWT_SECRET);
        res.status(201).json({ success: true, authToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
    }
};

// Authenticate a User
const loginUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        let user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            const authToken = jwt.sign({ user: { id: user.id } }, JWT_SECRET);
            return res.status(201).json({ success: true, authToken });
        } else {
            return res.status(200).json({ success: false, error: "Invalid credentials" });

        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
};

// Get logged in User details
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    createUser,
    loginUser,
    getUser,
};
