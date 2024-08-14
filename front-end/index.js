import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Adjust import path as needed
import { FiltersProvider } from './components/Filters/FiltersContext'; // Adjust import path as needed

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <FiltersProvider>
    <App />
  </FiltersProvider>
);