import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Player from './pages/Player/Player';
import { FiltersProvider } from './components/Filters/FiltersContext';
import MovieGrid from './components/MovieCards/MovieGrid';

function App() {
  return (
    <Router>
      <FiltersProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/trailer/:movieId" element={<Player />} />
          <Route path="/movies" element={<MovieGrid />} />
        </Routes>
      </FiltersProvider>
    </Router>
  );
}

export default App;
