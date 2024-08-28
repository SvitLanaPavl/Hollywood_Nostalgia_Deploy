const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const fs = require('fs');
const mysql = require('mysql2');
const csv = require('csv-parser');

// MySQL database connection
const connection = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
});

// Connect to MySQL
connection.connect((error) => {
  if (error) throw error;
  console.log('Connected to MySQL server.');

  // SQL queries to create the tables if they do not exist
  const createMoviesTable = `
  CREATE TABLE IF NOT EXISTS Old_Hollywood_Movies (
    ID INT PRIMARY KEY,
    Title VARCHAR(255),
    Release_Date DATE,
    Popularity DECIMAL(5,2),
    Poster_URL VARCHAR(255),
    Backdrop_URL VARCHAR(255),
    Overview TEXT,
    Genres TEXT,
    Actors TEXT,
    Trailers VARCHAR(255)
  )
  `;

  const createLoginTable = `
  CREATE TABLE IF NOT EXISTS login_tb (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255)
  )
  `;

  // Create the Old_Hollywood_Movies table
  connection.query(createMoviesTable, (error) => {
    if (error) throw error;
    console.log('Old_Hollywood_Movies table created.');

    // Create the login_tb table
    connection.query(createLoginTable, (error) => {
      if (error) throw error;
      console.log('login_tb table created.');

      // Path to the CSV file
      const filePath = path.join(__dirname, 'movies.csv');

      // Read and import CSV data
      fs.createReadStream(filePath)
        .pipe(csv({ separator: ',', headers: ['ID', 'Title', 'Release Date', 'Popularity', 'Poster URL', 'Backdrop URL', 'Overview', 'Genres', 'Actors', 'Trailers'], skipHeaders: true })) // Skip the header row
        .on('data', (row) => {
          console.log('Processing row:', row);
          if (row.ID === 'ID') {
            return;
          }

          // Insert or replace data into MySQL
          const query = `REPLACE INTO Old_Hollywood_Movies (ID, Title, Release_Date, Popularity, Poster_URL, Backdrop_URL, Overview, Genres, Actors, Trailers) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
          connection.query(query, [
            row.ID,
            row['Title'],
            row['Release Date'],
            row.Popularity,
            row['Poster URL'],
            row['Backdrop URL'],
            row.Overview,
            row.Genres,
            row.Actors,
            row.Trailers
          ], (error) => {
            if (error) throw error;
          });
        })
        .on('end', () => {
          console.log('CSV data inserted.');
          connection.end();
        });
    });
  });
});
