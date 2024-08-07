// routes for movies
const express = require('express');
const router = express.Router();
const promisePool = require('../db');

//function to normalize names
const normalizeName = name => name.toLowerCase().replace(/\s+/, '%');

// route to get movies from filters
router.get('/', async (req, res) => {
    const { genres, actors, title, release_date } = req.query;

    let query = 'SELECT * FROM Old_Hollywood_Movies WHERE 1=1';
    let queryParam = [];

    // replace spaces with % in query parameters
    const normalizeParam = param => param.replace(/\s+/g, '%');

    // filter by genres
    if (genres) {
        const genresArray = normalizeParam(genres).split(',').map(g => `%${g}%`);
        query += ' AND (';
        genresArray.forEach((genre, index) => {
            query += `Genres LIKE ?`;
            queryParam.push(genre);
            if (index < genresArray.length - 1) query += ' OR ';
        });
        query += ')';
    }

    // filter by actors
    if (actors) {
        const actorsArray = normalizeParam(actors).split(',').map(a => `%${normalizeName(a)}%`);
        query += ' AND (';
        actorsArray.forEach((actor, index) => {
            query += `Actors LIKE ?`;
            queryParam.push(actor);
            if (index < actorsArray.length - 1) query += ' OR ';
        });
        query += ')';
    }

    // filter by title
    if (title) {
        query += ' AND Title LIKE ?';
        queryParam.push(`%${normalizeParam(title)}%`);
    }

    // filter by release_date
    if (release_date) {
        query += ' AND YEAR(Release_Date) = ?';
        queryParam.push(release_date);
    }

    try {
        const [rows] = await promisePool.query(query, queryParam);
        res.json(rows);
    } catch (err) {
        console.error('Error querying database:', err);
        res.status(500).json({ error: 'Server Error' });
    }
});

module.exports = router;
