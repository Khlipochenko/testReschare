import React, { useContext } from 'react';
import { FilterContext } from '../../../context/FilterContext';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';

const customSubcategoryOrder = [
  'Bodies & Strampler',
  'Shirts & Tops',
  'Pullover',
  'Hosen & Jeans',
  'Shorts',
  'Kleider & Röcke',
  'Jacken & Mäntel',
  'Kleider & Röcke',
  'Nachtwäsche',
  'Bademode',
  'Anzüge & Blazer',
  'Kleiderpakete'
];

export const SubcategoryFilter = () => {
  const {
    setSelectedSubcategory,
    selectedSubcategory,
    openFilters,
    toggleFilterMenu,
    allFilters
  } = useContext(FilterContext);

  const allSubcategories = allFilters.subcategories || [];
  //console.log('Subcat', allSubcategories);

  const sortedSubcategories = allSubcategories.sort(
    (a, b) =>
      customSubcategoryOrder.indexOf(a) - customSubcategoryOrder.indexOf(b)
  );

  const toggleCheckbox = (filterValue) => {
    setSelectedSubcategory(
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
        onClick={() => toggleFilterMenu('subcategory')}
      >
        <h2 className="text-xl font-medium text-custom-text-brown">
          Produkttyp
        </h2>
        {openFilters.subcategory ? (
          <RiArrowDropUpLine className="text-3xl" />
        ) : (
          <RiArrowDropDownLine className="text-3xl" />
        )}
      </button>

      {openFilters.subcategory && (
        <div className="transition-all duration-200 ease-in-out overflow-hidden text-lg mt-4">
          <div className="flex flex-col gap-2 font-light text-custom-text-grey pl-4 ">
            {sortedSubcategories.length > 0 ? (
              sortedSubcategories.map((subcategory) => (
                <label key={subcategory} className="flex gap-2 cursor-pointer">
                  <input
                    className="w-3 cursor-pointer"
                    type="checkbox"
                    value={subcategory}
                    checked={selectedSubcategory.includes(subcategory)}
                    onChange={() => toggleCheckbox(subcategory)}
                  />
                  {subcategory}
                </label>
              ))
            ) : (
              <p>Kein Produkttyp verfügbar</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
