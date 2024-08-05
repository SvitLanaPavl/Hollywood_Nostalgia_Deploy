const mysql = require('mysql2/promise');

// Create a connection pool
const pool = mysql.createPool({
    host: 'localhost',    // Database host
    user: 'root',         // Database user
    password: 'root',     // Database password
    database: 'nostalgia_movie', // Database name
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Promisify for Node.js async/await
// const promisePool = pool.promise();

module.exports = pool;
