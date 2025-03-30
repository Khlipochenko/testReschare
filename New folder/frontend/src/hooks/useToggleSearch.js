import React, { useContext } from 'react';
// import { SearchContext } from '../context/SearchContext';

import { SearchContext } from '../context/SearchContext';

export const useToggleSearch = () => {
  const { showSearch, setShowSearch, setSearchTerm, setLocalSearchTerm } = useContext(SearchContext);
  const toggleSearch = () => {
    if (showSearch) {
      // Wenn die Suche offen ist und auf das X-Icon geklickt wird
      setShowSearch(false); // Suche schließen
      setLocalSearchTerm(''); // Lokalen Suchbegriff zurücksetzen
      setSearchTerm(''); // Globalen Suchbegriff zurücksetzen
    } else {
      // Wenn die Suche geschlossen ist, Suche öffnen
      setShowSearch(true);
    }
  };

  return { toggleSearch, showSearch };
};
