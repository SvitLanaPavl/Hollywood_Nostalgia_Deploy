// routes for movies
const express = require('express');
const router = express.Router();
const promisePool = require('../db');

// Function to normalize names
const normalizeName = name => name.toLowerCase().replace(/\s+/g, '%');

// Route to get movies from filters
// Route to get movies from filters
/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Get movies based on filters
 *     description: Retrieves movies from the database based on the filters such as genres, actors, title, and release date.
 *     parameters:
 *       - name: genres
 *         in: query
 *         description: Array of genres to filter by
 *         schema:
 *           type: string
 *           example: Action,Comedy
 *       - name: actors
 *         in: query
 *         description: Array of actors to filter by
 *         schema:
 *           type: string
 *           example: Bela Lugosi, Lon Chaney
 *       - name: title
 *         in: query
 *         description: Title of the movie to filter by
 *         schema:
 *           type: string
 *           example: Gone with the Wind
 *       - name: release_date
 *         in: query
 *         description: Year of release to filter by
 *         schema:
 *           type: integer
 *           example: 1920
 *     responses:
 *       200:
 *         description: Successful retrieval of movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ID:
 *                     type: integer
 *                     description: Unique identifier for the movie
 *                     example: 1
 *                   Title:
 *                     type: string
 *                     description: Title of the movie
 *                     example: Dr. Jekyll and Mr. Hyde
 *                   Release_Date:
 *                     type: string
 *                     format: date-time
 *                     description: Release date of the movie
 *                     example: 1920-03-18
 *                   Popularity:
 *                     type: string
 *                     description: Popularity score of the movie
 *                     example: "16.08"
 *                   Poster_URL:
 *                     type: string
 *                     format: uri
 *                     description: URL to the movie's poster image
 *                     example: https://image.tmdb.org/t/p/w500/u8OL0RbTNzqqB1WmkxroTBXohnv.jpg
 *                   Backdrop_URL:
 *                     type: string
 *                     format: uri
 *                     description: URL to the movie's backdrop image
 *                     example: https://image.tmdb.org/t/p/w500/tQRHrssevbysfmDG9FbA86qesCH.jpg
 *                   Overview:
 *                     type: string
 *                     description: Brief overview of the movie
 *                     example: A doctor's research into the roots of evil turns him into a hideous depraved fiend.
 *                   Genres:
 *                     type: string
 *                     description: Semicolon-separated list of genres
 *                     example: Horror;Science Fiction;Drama
 *                   Actors:
 *                     type: string
 *                     description: Semicolon-separated list of actors
 *                     example: John Barrymore;Brandon Hurst;Martha Mansfield;Charles Lane;Cecil Clovelly
 *                   Trailers:
 *                     type: string
 *                     format: uri
 *                     description: URL to a trailer for the movie
 *                     example: https://www.youtube.com/watch?v=P0DK1dl8eRc
 *       404:
 *         description: No movies found matching the query
 *       500:
 *         description: Server error
 */
router.get('/', async (req, res) => {
    const { genres, actors, title, release_date } = req.query;

    let query = 'SELECT * FROM Old_Hollywood_Movies WHERE 1=1';
    let queryParam = [];

    // Replace spaces with % in query parameters
    const normalizeParam = param => param.replace(/\s+/g, '%');

    // Filter by genres
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

    // Filter by actors
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

    // Filter by title
    if (title) {
        query += ' AND Title LIKE ?';
        queryParam.push(`%${normalizeParam(title)}%`);
    }

    // Filter by release_date
    if (release_date) {
        query += ' AND YEAR(Release_Date) = ?';
        queryParam.push(release_date);
    }

    try {
        const [rows] = await promisePool.query(query, queryParam);
        if (rows.length === 0) {
            res.status(404).json({ message: 'No movies found matching your query.' });
        } else {
            res.json(rows);
        }
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).json({ error: 'Server Error' });
    }
});

module.exports = router;
