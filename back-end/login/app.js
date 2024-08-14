const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movies');
const pool = require('./db');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
  }
app.use(cors(corsOptions));
//console.log('after body parser');

// Serve static files from 'public' directory
app.use(express.static('public'));
//console.log('after static public directory');

// Routes
app.use('/auth', authRoutes);
app.use('/movies', movieRoutes);
console.log('after route');

// Test database connection
(async () => {
    try {
        await pool.query('SELECT 1');
        console.log('Connection to MySQL has been established successfully.');
    } catch (err) {
        console.error('Unable to connect to the database:', err);
        process.exit(1);
    }
})();

// Start the server
const PORT = process.env.PORT || 3000;
// made server for tests
const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = { app, server };
