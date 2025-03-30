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
// import { createContext, useEffect, useState } from 'react';

// export const SearchContext = createContext();

// export const SearchProvider = ({ children }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showSearch, setShowSearch] = useState(false);
//   const [sortOption, setSortOption] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [localSearchTerm, setLocalSearchTerm] = useState('');

//   // API call für die Search Result Seite
//   useEffect(() => {
//     const fetchSearchResults = async () => {
//       try {
//         const response = await fetch(`${import.meta.env.VITE_API_URL}/api/search?q=${searchTerm}`);
//         if (!response.ok) {
//           throw new Error('Fehler beim Laden der Suchergebnisse.');
//         }
//         const data = await response.json();
//         setSearchResults(data);
//       } catch (error) {
//         console.error('Fehler beim Laden der Items:', error);
//       }
//     };

//     fetchSearchResults();
//   }, [searchTerm]);

//   return (
//     <SearchContext.Provider
//       value={{
//         searchTerm,
//         setSearchTerm,
//         showSearch,
//         setShowSearch,
//         sortOption,
//         setSortOption,
//         searchResults,
//         setSearchResults,
//         localSearchTerm,
//         setLocalSearchTerm
//       }}
//     >
//       {children}
//     </SearchContext.Provider>
//   );
// };
