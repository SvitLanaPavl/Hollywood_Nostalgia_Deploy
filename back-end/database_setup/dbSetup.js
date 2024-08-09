const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');
const csv = require('csv-parser');

// MySQL database connection
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'nostalgia_movie'
});

// Connect to MySQL
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL server.');

  // SQL queries to drop and create the database and table
  const dbName = 'nostalgia_movie';
  const dropDB = `DROP DATABASE IF EXISTS ${dbName}`;
  const createDB = `CREATE DATABASE ${dbName}`;
  const useDB = `USE ${dbName}`;
  const createTable = `
  CREATE TABLE Old_Hollywood_Movies (
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

  // Drop the database if it exists
  connection.query(dropDB, (err) => {
    if (err) throw err;
    console.log('Database dropped.');

    // Create the database
    connection.query(createDB, (err) => {
      if (err) throw err;
      console.log('Database created.');

      // Use the new database
      connection.query(useDB, (err) => {
        if (err) throw err;
        console.log('Using database.');

        // Create the table
        connection.query(createTable, (err) => {
          if (err) throw err;
          console.log('Table created.');

          // Path to the CSV file
          const filePath = path.join(__dirname, 'movies.csv');

          // Read and import CSV data
          fs.createReadStream(filePath)
            .pipe(csv({ separator: ',', headers: ['ID', 'Title', 'Release Date', 'Popularity', 'Poster URL', 'Backdrop URL', 'Overview', 'Genres', 'Actors', 'Trailers'], skipHeaders: true })) // Skip the header row
            .on('data', (row) => {
              // Check if the row contains header values and skips
              if (row.ID === 'ID') {
                return;
              }

              // Insert data into MySQL
              const query = `INSERT INTO Old_Hollywood_Movies (ID, Title, Release_Date, Popularity, Poster_URL, Backdrop_URL, Overview, Genres, Actors, Trailers) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
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
              ], (err) => {
                if (err) throw err;
              });
            })
            .on('end', () => {
              console.log('CSV data inserted.');
              connection.end();
            });
        });
      });
    });
  });
});
