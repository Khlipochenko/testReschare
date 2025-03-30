import React, { useContext } from 'react';
import { SearchContext } from '../../context/SearchContext';

export const SearchResultMessage = () => {
  const { searchTerm } = useContext(SearchContext);

  if (!searchTerm) return null;

  return (
    <div className="text-xl text-custom-text-brown">
      <p>Suchergebnisse für "{searchTerm}"</p>
    </div>
  );
};
