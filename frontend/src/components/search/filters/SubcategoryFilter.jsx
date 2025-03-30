import React, { useContext } from 'react';
import { FilterContext } from '../../../context/FilterContext';
import { useToggleFilter } from '../../../hooks/useToggleFilter';
import { FilterButton } from './FilterButton';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import { useToggleMenu } from '../../../hooks/useToggleMenu';

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
  const { setSelectedSubcategory, availableFilters, pendingFilters, setPendingFilters } = useContext(FilterContext);
  const { togglePendingFilter } = useToggleFilter();
  const { showMenu, toggleMenu } = useToggleMenu(false);

  const availableSubcategories = availableFilters.subcategories;
  console.log('Subcategories:', availableFilters);

  const sortedSubcategories = availableSubcategories.sort(
    (a, b) => customSubcategoryOrder.indexOf(a) - customSubcategoryOrder.indexOf(b)
  );

  const applyFilters = () => {
    setSelectedSubcategory(pendingFilters.subcategory);
    toggleMenu(); // Dropdown schließen nach Anwenden
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <button className="flex items-center justify-between w-full cursor-pointer" onClick={toggleMenu}>
        <h2 className="text-xl font-medium text-custom-text-brown">Produkttyp</h2>
        {showMenu ? <RiArrowDropUpLine className="text-3xl" /> : <RiArrowDropDownLine className="text-3xl" />}
      </button>

      {showMenu && (
        <div className="transition-all duration-200 ease-in-out overflow-hidden text-lg mt-4">
          <div className="flex flex-col gap-2 font-light text-custom-text-grey pl-4 ">
            {sortedSubcategories.map((subcategory) => (
              <label key={subcategory} className="flex gap-2 cursor-pointer">
                <input
                  className="w-3 cursor-pointer"
                  type="checkbox"
                  value={subcategory}
                  checked={pendingFilters.subcategory.includes(subcategory)}
                  onChange={() => {
                    togglePendingFilter(subcategory, 'subcategory');
                  }}
                />
                {subcategory}
              </label>
            ))}
          </div>
          <FilterButton onClick={applyFilters}>Anwenden</FilterButton>
        </div>
      )}
    </div>
  );
};
