import { createContext, useEffect, useState } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [sortOption, setSortOption] = useState('');
  const [localSearchTerm, setLocalSearchTerm] = useState('');

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        showSearch,
        setShowSearch,
        sortOption,
        setSortOption,
        localSearchTerm,
        setLocalSearchTerm
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
