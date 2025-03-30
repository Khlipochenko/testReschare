import React, { useContext } from 'react';
import { ColorFilter } from './ColorFilter';
import { SizeFilter } from './SizeFilter';
import { FaFilter, FaTimes } from 'react-icons/fa';
import { ShippingFilter } from './ShippingFilter';
import { Sort } from '../Sort';
import { useActiveFilters } from '../../../hooks/useActiveFilters';
import { ActiveFilters } from './ActiveFilters';
import { FilterContext } from '../../../context/FilterContext';
import { SubcategoryFilter } from './SubcategoryFilter';
import { CategoryFilter } from './CategoryFilter';
import { LocationFilter } from './LocationFilter';

export const Filters = ({ isSearchResultPage }) => {
  const { showFilter, setShowFilter } = useContext(FilterContext);
  const { clearAllFilters, hasActiveFilters } = useActiveFilters();

  return (
    <>
      {/* Mobile Ansicht */}
      {/* Filter-Button für mobile Ansicht */}
      <div className="flex items-center justify-between md:hidden gap-2 text-custom-text-brown">
        <Sort />

        <button
          onClick={() => setShowFilter(!showFilter)}
          className="flex items-center gap-2 text-xl font-medium py-2 cursor-pointer"
        >
          <FaFilter className="text-xl" />
          <span>Filter</span>
        </button>
      </div>

      {/* Filter Sidebar Menü für mobile Ansicht */}
      <div
        className={`fixed top-0 left-0 w-4/6 max-w-sm h-screen bg-white md:bg-custom-bg-page shadow-xl transition-all duration-500 ease-in-out overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 z-50 ${
          showFilter ? 'translate-x-0' : '-translate-x-full'
        } md:hidden`}
      >
        {/* Close Button für mobile Ansicht */}
        <div className="sticky top-0 w-full md:hidden">
          <div className=" bg-custom-text-green pl-6 py-2 text-white flex justify-between items-center">
            {' '}
            <h3 className="text-xl">Filter</h3>
            <button
              onClick={() => setShowFilter(false)}
              className="w-12 h-12 flex items-center justify-center cursor-pointer pr-6"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>
          <div>
            {/* Aktive Filter in der mobilen Ansicht */}
            {hasActiveFilters && (
              <div className="mx-6 py-4 border-b bg-white">
                <div className="flex justify-between items-center text-custom-text-brown">
                  <h3 className="text-xl font-medium">Gefiltert nach:</h3>
                  <button
                    onClick={clearAllFilters}
                    className="text-custom-text-grey hover:text-custom-text-green text-md hover:underline flex items-center gap-1"
                  >
                    Alle löschen
                  </button>
                </div>
                <ActiveFilters />
              </div>
            )}
          </div>
        </div>
        {/* Filter Optionen mobile Ansicht */}
        {/* CategoryFilter wird nur auf der SearchResultPage angezeigt*/}
        {isSearchResultPage && (
          <div className="mx-6 py-4 border-b">
            <CategoryFilter />
          </div>
        )}
        <div className="mx-6 py-4 border-b">
          <SubcategoryFilter />
        </div>
        <div className="mx-6 py-4 border-b">
          <SizeFilter />
        </div>
        <div className="mx-6 py-4 border-b">
          <ColorFilter />
        </div>
        <div className="mx-6 py-4 border-b">
          <ShippingFilter />
        </div>{' '}
        <div className="mx-6 py-4 border-b">
          <LocationFilter />
        </div>
      </div>

      {/* Desktop Ansicht */}
      <div className="hidden md:flex flex-col h-screen max-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 md:w-1/6 md:min-w-64">
        {hasActiveFilters && (
          <div className="order-first py-4 pr-2 border-b-2">
            <div className="flex justify-between items-center text-custom-text-brown">
              <h3 className="text-xl font-medium">Gefiltert nach:</h3>
              <button
                onClick={clearAllFilters}
                className="text-custom-text-grey hover:text-custom-text-green text-md hover:underline flex items-center gap-1"
              >
                Alle löschen
              </button>
            </div>
            <ActiveFilters />
          </div>
        )}

        {/* Filter Optionen Desktop Ansicht */}
        {/* CategoryFilter wird nur auf der SearchResultPage angezeigt*/}
        {isSearchResultPage && (
          <div className="py-4 border-b-2">
            <CategoryFilter />
          </div>
        )}
        <div className="py-4 border-b-2">
          <SubcategoryFilter />
        </div>
        <div className="py-4 border-b-2">
          <SizeFilter />
        </div>
        <div className="py-4 border-b-2">
          <ColorFilter />
        </div>
        <div className="py-4 border-b-2">
          <ShippingFilter />
        </div>
        <div className="py-4 border-b-2">
          <LocationFilter />
        </div>
      </div>
    </>
  );
};
