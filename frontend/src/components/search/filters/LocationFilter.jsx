import React, { useContext } from 'react';
import { FilterContext } from '../../../context/FilterContext';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';

export const LocationFilter = () => {
  const { setSelectedLocation, selectedLocation, openFilters, toggleFilterMenu, allFilters } =
    useContext(FilterContext);
  // const { toggleCheckbox } = useToggleFilter();

  const allLocations = allFilters.locations || [];

  const sortedLocations = allLocations.sort();

  const toggleCheckbox = (filterValue) => {
    setSelectedLocation(
      (prev) =>
        prev.includes(filterValue)
          ? prev.filter((item) => item !== filterValue) // Entfernt den Filter
          : [...prev, filterValue] // Fügt den Filter hinzu
    );
    //toggleFilterMenu('subcategory'); // Dropdown schließen nach Anwenden
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <button
        className="flex items-center justify-between w-full cursor-pointer"
        onClick={() => toggleFilterMenu('location')}
      >
        <h2 className="text-xl font-medium text-custom-text-brown">Ort</h2>
        {openFilters.location ? (
          <RiArrowDropUpLine className="text-3xl" />
        ) : (
          <RiArrowDropDownLine className="text-3xl" />
        )}
      </button>

      {openFilters.location && (
        <div className="transition-all duration-200 ease-in-out overflow-hidden text-lg mt-4">
          <div className="flex flex-col gap-2 font-light text-custom-text-grey pl-4">
            {sortedLocations.length > 0 ? (
              sortedLocations.map((location) => (
                <label key={location} className="flex gap-2 cursor-pointer">
                  <input
                    className="w-3 cursor-pointer"
                    type="checkbox"
                    value={location}
                    checked={selectedLocation.includes(location)}
                    onChange={() => {
                      toggleCheckbox(location);
                    }}
                  />
                  {location}
                </label>
              ))
            ) : (
              <p>Kein Ort verfügbar</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
