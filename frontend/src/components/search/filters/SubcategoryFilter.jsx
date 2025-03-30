import React, { useContext } from 'react';
import { FilterContext } from '../../../context/FilterContext';
import { ToggleDropdown } from './ToggleDropdown';
import { useToggleFilter } from '../../../hooks/useToggleFilter';
import { FilterButton } from './FilterButton';

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

  const availableSubcategories = availableFilters.subcategories;

  const sortedSubcategories = availableSubcategories.sort(
    (a, b) => customSubcategoryOrder.indexOf(a) - customSubcategoryOrder.indexOf(b)
  );

  const applyFilters = () => {
    setSelectedSubcategory(pendingFilters.subcategory); // Übernehme Subcategory-Filter
  };

  return (
    <ToggleDropdown title="Produkttyp">
      {
        <>
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
        </>
      }
    </ToggleDropdown>
  );
};
