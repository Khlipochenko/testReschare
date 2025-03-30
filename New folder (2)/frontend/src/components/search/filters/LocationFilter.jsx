import React, { useContext } from 'react';
import { FilterContext } from '../../../context/FilterContext';
import { useToggleFilter } from '../../../hooks/useToggleFilter';
import { FilterButton } from './FilterButton';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import { useToggleMenu } from '../../../hooks/useToggleMenu';

export const LocationFilter = () => {
  const { setSelectedLocation, availableFilters, pendingFilters, setPendingFilters } = useContext(FilterContext);
  const { togglePendingFilter } = useToggleFilter();
  const { showMenu, toggleMenu } = useToggleMenu(false);

  const availableLocations = availableFilters.location;
  // console.log('Location', availableFilters);

  const sortedLocations = availableLocations.sort();

  const applyFilters = () => {
    setSelectedLocation(pendingFilters.location);
    toggleMenu();
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <button className="flex items-center justify-between w-full cursor-pointer" onClick={toggleMenu}>
        <h2 className="text-xl font-medium text-custom-text-brown">Ort</h2>
        {showMenu ? <RiArrowDropUpLine className="text-3xl" /> : <RiArrowDropDownLine className="text-3xl" />}
      </button>

      {showMenu && (
        <div className="transition-all duration-200 ease-in-out overflow-hidden text-lg mt-4">
          <div className="flex flex-col gap-2 font-light text-custom-text-grey pl-4 ">
            {sortedLocations.map((location) => (
              <label key={location} className="flex gap-2 cursor-pointer">
                <input
                  className="w-3 cursor-pointer"
                  type="checkbox"
                  value={location}
                  checked={pendingFilters.location.includes(location)}
                  onChange={() => {
                    togglePendingFilter(location, 'location');
                  }}
                />
                {location}
              </label>
            ))}
          </div>
          <FilterButton onClick={applyFilters}>Anwenden</FilterButton>
        </div>
      )}
    </div>
  );
};
