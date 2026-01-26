import React, { useContext, useEffect } from 'react';
import { FilterContext } from '../../../context/FilterContext';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';

const customCategoryOrder = ['Damen', 'Herren', 'Kinder'];

export const CategoryFilter = () => {
  const { setSelectedCategory, selectedCategory, openFilters, toggleFilterMenu, allFilters } =
    useContext(FilterContext);

  // Hier noch ein Fehler!! allFilters.categories gibt nicht alle Kategorien zurück
  //const allCategories = allFilters.categories || [];

  // const sortedCategories = allCategories.sort(
  //   (a, b) => customCategoryOrder.indexOf(a) - customCategoryOrder.indexOf(b)
  // );

  const toggleCheckbox = (filterValue) => {
    setSelectedCategory(
      (prev) =>
        prev.includes(filterValue)
          ? prev.filter((item) => item !== filterValue) // Entfernt den Filter
          : [...prev, filterValue] // Fügt den Filter hinzu
    );
    //toggleFilterMenu('category'); // Dropdown schließen nach Anwenden
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <button
        className="flex items-center justify-between w-full cursor-pointer"
        onClick={() => toggleFilterMenu('category')}
      >
        <h2 className="text-xl font-medium text-custom-text-brown">Kategorie</h2>
        {openFilters.category ? (
          <RiArrowDropUpLine className="text-3xl" />
        ) : (
          <RiArrowDropDownLine className="text-3xl" />
        )}
      </button>

      {openFilters.category && (
        <div className="transition-all duration-200 ease-in-out overflow-hidden text-lg mt-4">
          <div className="flex flex-col gap-2 font-light text-custom-text-grey pl-4">
            {customCategoryOrder.length > 0 ? (
              customCategoryOrder.map((category) => (
                <label key={category} className="flex gap-2 cursor-pointer">
                  <input
                    className="w-3 cursor-pointer"
                    type="checkbox"
                    value={category}
                    checked={selectedCategory.includes(category)}
                    onChange={() => toggleCheckbox(category)}
                  />
                  {category}
                </label>
              ))
            ) : (
              <p>Keine Kategorie verfügbar</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
