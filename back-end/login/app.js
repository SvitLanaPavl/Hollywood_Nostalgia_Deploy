const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const promisePool = require('./db');
const cors = require('cors')
const app = express();
// const mysql = require('mysql2');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
console.log('after body parser');

// Serve static files from 'public' directory
app.use(express.static('public'));
console.log('after static public directory');

// Routes
app.use('/auth', authRoutes);
console.log('after route');

// Test database connection
promisePool.getConnection()
    .then(connection => {
        console.log('Connection to MySQL has been established successfully.');
        connection.release(); // Release the connection back to the pool
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
