import React, { useContext, useEffect } from 'react';
import { Filters } from '../components/search/filters/Filters';
import { SearchResultList } from '../components/search/SearchResultList';
import { Sort } from '../components/search/Sort';
import { SearchContext } from '../context/SearchContext';
import { SearchResultMessage } from '../components/search/SearchResultMessage';
import { FilterContext } from '../context/FilterContext';

export const SearchResultPage = () => {
  const { searchTerm, showSearch } = useContext(SearchContext);
  const {
    clearAllFilters,
    closeAllFilters,
    setSelectedCategory,
    setSelectedSubcategory,
    setSelectedSize,
    setSelectedColor,
    setSelectedLocation,
    setSelectedShipping
  } = useContext(FilterContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedCategory([]);
    setSelectedSubcategory([]);
    setSelectedSize([]);
    setSelectedColor([]);
    setSelectedLocation([]);
    setSelectedShipping('');
    closeAllFilters();

    // Scrollt nach oben
  }, []);

  return (
    <div className={`px-[5vw] pb-10 ${showSearch ? 'pt-56' : 'pt-36 '} min-h-screen`}>
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

        <Filters isSearchResultPage={true} />

        <div className="flex-1 pt-6 border-t-2 md:border-none overflow-hidden">
          {/* ItemList Komponente */}
          <SearchResultList />
        </div>
      </div>
    </div>
  );
};
