# Database Documentation

## Overview

This document describes the database schema and setup used for the `nostalgia_movie` application. It includes details about the tables, their structure, and the setup process.

## Database Setup

### `dbSetup.js`

This script is used to set up the MySQL database and tables. It includes functionality for creating the database, tables, and importing data from a CSV file.

#### Key Operations:

1. **Connect to MySQL**: Establishes a connection to the MySQL server.
2. **Drop Database**: Deletes the existing `nostalgia_movie` database if it exists.
3. **Create Database**: Creates a new `nostalgia_movie` database.
4. **Create Tables**:
   - `Old_Hollywood_Movies`
   - `login_tb`
5. **Import Data**: Reads data from `movies.csv` and inserts it into the `Old_Hollywood_Movies` table.

### SQL Table Definitions

#### `Old_Hollywood_Movies`

- **Description**: Stores information about movies.
- **Columns**:
  - `ID`: INT, Primary Key
  - `Title`: VARCHAR(255)
  - `Release_Date`: DATE
  - `Popularity`: DECIMAL(5,2)
  - `Poster_URL`: VARCHAR(255)
  - `Backdrop_URL`: VARCHAR(255)
  - `Overview`: TEXT
  - `Genres`: TEXT
  - `Actors`: TEXT
  - `Trailers`: VARCHAR(255)

#### `login_tb`

- **Description**: Stores user login information.
- **Columns**:
  - `id`: INT, Primary Key, AUTO_INCREMENT
  - `username`: VARCHAR(255), Unique
  - `password`: VARCHAR(255)
  - `email`: VARCHAR(255)
