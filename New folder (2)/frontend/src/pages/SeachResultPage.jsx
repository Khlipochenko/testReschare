import React, { useContext } from 'react';
import { Filters } from '../components/search/filters/Filters';
import { SearchResultList } from '../components/search/SearchResultList';
import { Sort } from '../components/search/Sort';
import { SearchContext } from '../context/SearchContext';
import { SearchResultMessage } from '../components/search/SearchResultMessage';

export const SearchResultPage = () => {
  const { searchTerm, showSearch } = useContext(SearchContext);
  return (
    <div className={`px-[5vw] md:px-[7vw] lg:px-[9vw] ${showSearch ? 'py-56' : 'py-36 '}`}>
      <div
        className={`hidden sm:flex text-lg font-medium items-center my-2 ${
          searchTerm ? 'justify-between' : 'justify-end'
        }`}
      >
        {searchTerm && <SearchResultMessage />}
        <Sort />
      </div>

      <div className="mb-4 md:hidden">{searchTerm && <SearchResultMessage />}</div>

      <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 sm:border-t-2">
        {/* Filter Komponente*/}
        <Filters isSearchResultPage={true} />

        <div className="flex-1 pt-6 border-t-2 sm:border-none">
          {/* ItemList Komponente */}
          <SearchResultList />
        </div>
      </div>
    </div>
  );
};
