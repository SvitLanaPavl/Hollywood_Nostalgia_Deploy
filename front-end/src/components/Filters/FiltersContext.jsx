import React, { createContext, useContext, useState } from 'react';

const FiltersContext = createContext();

export const FiltersProvider = ({ children }) => {
  const [titleSearchTerm, setTitleSearchTerm] = useState('');
  const [actorSearchTerm, setActorSearchTerm] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSort, setSelectedSort] = useState('');
  const [selectedAlphabet, setSelectedAlphabet] = useState('');

  return (
    <FiltersContext.Provider
      value={{
        titleSearchTerm,
        setTitleSearchTerm,
        actorSearchTerm,
        setActorSearchTerm,
        selectedGenres,
        setSelectedGenres,
        selectedYear,
        setSelectedYear,
        selectedSort,
        setSelectedSort,
        selectedAlphabet,
        setSelectedAlphabet
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FiltersContext);
  if (context === undefined) {
    throw new Error('useFilters must be used within a FiltersProvider');
  }
  return context;
};
