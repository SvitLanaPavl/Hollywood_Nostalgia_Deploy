const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
// const promisePool = require('./db');
const app = express();
const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
    host: '127.0.0.1',    // Database host
    user: 'root',         // Database user
    password: 'root',     // Database password
    database: 'nostalgia_movie', // Database name
    // port: '3000'
});

// Promisify for Node.js async/await
const promisePool = pool.promise();
console.log('promises pool')

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
