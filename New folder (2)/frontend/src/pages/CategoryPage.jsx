import React, { useContext, useEffect } from 'react';
import { Filters } from '../components/search/filters/Filters';
import { Sort } from '../components/search/Sort';
import { SearchResultList } from '../components/search/SearchResultList';
import { SearchResultMessage } from '../components/search/SearchResultMessage';
import { SearchContext } from '../context/SearchContext';
import { FilterContext } from '../context/FilterContext';
import { useParams } from 'react-router-dom';
// import { useToggleMenu } from '../hooks/useToggleMenu';

export const CategoryPage = () => {
  const { category } = useParams();
  const { searchTerm, showSearch } = useContext(SearchContext);
  const { clearAllFilters, resetOpenFilters } = useContext(FilterContext);
  // const { setShowMenu } = useToggleMenu(false);

  useEffect(() => {
    window.scrollTo(0, 0); // Scrollt nach oben
  }, []);

  useEffect(() => {
    clearAllFilters(); // Filter zurücksetzen, wenn sich die Kategorie ändert
    resetOpenFilters();
  }, [category]); // Der Effekt wird ausgeführt, wenn die Kategorie sich ändert

  return (
    <div className={`px-[5vw] md:px-[7vw] lg:px-[9vw] ${showSearch ? 'py-56' : 'py-36 '}`}>
      <div
        className={`hidden md:flex text-lg font-medium items-center my-2 ${
          searchTerm ? 'justify-between' : 'justify-end'
        }`}
      >
        {searchTerm && <SearchResultMessage />}
        <Sort />
      </div>

      <div className="mb-4 md:hidden">{searchTerm && <SearchResultMessage />}</div>

      <div className="flex flex-col md:flex-row gap-1 sm:gap-10 md:border-t-2">
        {/* Filter Komponente*/}
        <Filters />

        <div className="flex-1 pt-6 border-t-2 md:border-none">
          {/* ItemList Komponente */}
          <SearchResultList />
        </div>
      </div>
    </div>
  );
};
