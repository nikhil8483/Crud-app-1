const bcrypt = require('bcrypt');
const UserModel = require('../Models/Users');
const jwt = require('jsonwebtoken');

// Signup Controller
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required', success: false });
        }

        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists, please login', success: false });
        }

        // Hash password and save user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'Signup successful', success: true });
    } catch (err) {
        console.error('Signup Error:', err.message);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

// Login Controller
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required', success: false });
        }

        // Check if user exists
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(403).json({ message: 'Authentication failed: email or password is incorrect', success: false });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Authentication failed: email or password is incorrect', success: false });
        }

        // Generate JWT token
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            console.error('JWT_SECRET is not defined in the environment variables.');
            return res.status(500).json({ message: 'Internal server error', success: false });
        }

        const token = jwt.sign(
            { email: user.email, _id: user._id },
            jwtSecret,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: 'Login successful',
            success: true,
            token,
            email,
            name: user.name
        });
    } catch (err) {
        console.error('Login Error:', err.message);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

module.exports = {
    signup,
    login
};
