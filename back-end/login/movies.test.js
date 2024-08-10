const request = require('supertest');
const { app, server } = require('./app');
const pool = require('./db');

describe('GET /movies', () => {
  beforeAll(async () => {
    // connects database
    await pool.query('SELECT 1');
  });

  afterAll(async () => {
    // clean up database
    await pool.end();
    server.close();
  });

  it('should return movies by genres', async () => {
    const response = await request(app).get('/movies').query({ genres: 'Horror' });
    expect(response.status).toBe(200);
  });

  it('should return movies by actors', async () => {
    const response = await request(app).get('/movies').query({ actors: 'Glenn Ford' });
    expect(response.status).toBe(200);
  });

  it('should return movies by title', async () => {
    const response = await request(app).get('/movies').query({ title: 'Dracula' });
    expect(response.status).toBe(200);
  });

  it('should return movies by release_date', async () => {
    const response = await request(app).get('/movies').query({ release_date: '1960' });
    expect(response.status).toBe(200);
  });

  it('should handle no results found', async () => {
    const response = await request(app).get('/movies').query({ actors: 'Ted Williams' });
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('No movies found matching your query.');
  });
});
