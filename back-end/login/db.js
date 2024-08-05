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

module.exports = promisePool;
