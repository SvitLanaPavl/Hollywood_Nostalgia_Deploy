# API Documentation

## Endpoints

### `/movies`
- **Method**: `GET`
- **Description**: Retrieves a list of movies based on queries.

### `/login`
- **Method**: `POST`
- **Description**: Authenticates a user and returns a token if credentials are valid.

### `/register`
- **Method**: `POST`
- **Description**: Creates a new user with a hashed password and stores them in the database.

---

## Request/Response Examples

### `GET /movies`

**Description**: Retrieves a list of movies based on the provided query parameters.

#### Request

- **Query Parameters** (optional):
  - `title`: Filter movies by title.
  - `release_date`: Filter movies by release date.
  - `genre`: Filter movies by genre.
  - `actors`: Filter movies by actors.

**Example Request URL**:

http://localhost:3000/movies?title=Dr.%20Jekyll%20and%20Mr.%20Hyde

#### Response

```json
[
  {
    "ID": 1,
    "Title": "Dr. Jekyll and Mr. Hyde",
    "Release_Date": "1920-03-18",
    "Popularity": "16.08",
    "Poster_URL": "https://image.tmdb.org/t/p/w500/u8OL0RbTNzqqB1WmkxroTBXohnv.jpg",
    "Backdrop_URL": "https://image.tmdb.org/t/p/w500/tQRHrssevbysfmDG9FbA86qesCH.jpg",
    "Overview": "A doctor's research into the roots of evil turns him into a hideous depraved fiend.",
    "Genres": "Horror;Science Fiction;Drama",
    "Actors": "John Barrymore;Brandon Hurst;Martha Mansfield;Charles Lane;Cecil Clovelly",
    "Trailers": "https://www.youtube.com/watch?v=P0DK1dl8eRc"
  }
]
```
### `POST /login`

**Description**: Authenticates a user and returns a token if the credentials are valid.
#### Request

```json
[
  {
    "username": "jane_doe",
    "password": "password123"
  }
]
```

### `POST /register`

**Description**: Creates a new user with a hashed password and stores them in the database.
#### Request

```json
[
  {
    "user_name": "jane_doe",
    "password": "password123",
    "email": "jane@example.com"
  }
]
```

