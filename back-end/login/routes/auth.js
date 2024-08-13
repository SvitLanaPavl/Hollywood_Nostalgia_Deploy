const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const promisePool = require('../db');

router.post('/register', async (req, res) => {
    const { username, password, confirm_password, email } = req.body;

    // check if passwords match
    if (password !== confirm_password) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Password hashing
    const saltRounds = 10; // Adjust salt rounds as needed
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    try {
        const [result] = await promisePool.query(
            'INSERT INTO login_tb (username, password, email) VALUES (?, ?, ?)',
            [username, hashedPassword, email]
        );
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering user' });
    }
});

router.post('/login', async (req, res) => {
    console.log("inside login endpoint");
    const { password, username } = req.body;
    try {
        const [rows] = await promisePool.query(
            'SELECT * FROM login_tb WHERE username = ?',
            [username]
        );

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare hashed passwords
        const user = rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const token = jwt.sign({ userId: user.id }, 'secret_key'); // Use a strong secret key
        res.cookie('token', token, { httpOnly: true }); //Set token as an HTTP-only cookie
        res.json({ message: 'Login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging in' });
    }
});

module.exports = router;
