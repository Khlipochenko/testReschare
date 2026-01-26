import React, { useContext, useEffect } from 'react';
import { Filters } from '../components/search/filters/Filters';
import { Sort } from '../components/search/Sort';
import { SearchResultList } from '../components/search/SearchResultList';
import { SearchResultMessage } from '../components/search/SearchResultMessage';
import { SearchContext } from '../context/SearchContext';
import { FilterContext } from '../context/FilterContext';
import { useParams } from 'react-router-dom';

export const CategoryPage = () => {
  const { category } = useParams();
  const { searchTerm, showSearch } = useContext(SearchContext);
  const { clearAllFilters, closeAllFilters } = useContext(FilterContext);

  useEffect(() => {
    window.scrollTo(0, 0); // Scrollt nach oben
  }, []);

  useEffect(() => {
    clearAllFilters(); // Filter zurücksetzen
    closeAllFilters(); // Alle Filter schließen
  }, [category]); // useEffect wird immer ausgeführt, wenn sich die Kategorie ändert

  return (
    <div className={` px-[5vw] pb-10 ${showSearch ? 'pt-56' : 'pt-36 '} min-h-screen`}>
      <div
        className={`hidden md:flex text-lg font-medium items-center my-2 ${
          searchTerm ? 'justify-between' : 'justify-end'
        }`}
      >
        {searchTerm && <SearchResultMessage />}
        <Sort />
      </div>

      <div className="mb-4 md:hidden">{searchTerm && <SearchResultMessage />}</div>

      <div className="flex flex-col md:flex-row gap-5 md:border-t-2 min-h-screen overflow-hidden">
        {/* Filter Komponente*/}

        <Filters />

        <div className="flex-1 pt-6 border-t-2 md:border-none overflow-hidden">
          {/* ItemList Komponente */}
          <SearchResultList />
        </div>
      </div>
    </div>
  );
};
