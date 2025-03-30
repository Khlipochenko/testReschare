import React, { useContext, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import { FilterContext } from '../../../context/FilterContext';
import { ToggleDropdown } from './ToggleDropdown';
import { useToggleFilter } from '../../../hooks/useToggleFilter';
import { FilterButton } from './FilterButton';

const customCategoryOrder = ['Damen', 'Herren', 'Kinder'];

export const CategoryFilter = () => {
  const { setSelectedCategory, availableFilters, pendingFilters } = useContext(FilterContext);
  const { togglePendingFilter } = useToggleFilter();

  const availableCategories = availableFilters.categories;

  const sortedCategories = availableCategories.sort(
    (a, b) => customCategoryOrder.indexOf(a) - customCategoryOrder.indexOf(b)
  );

  const applyFilters = () => {
    setSelectedCategory(pendingFilters.category);
  };

  return (
    <ToggleDropdown title="Kategorie">
      {
        <>
          <div className="flex flex-col gap-2 font-light text-custom-text-grey pl-4 ">
            {sortedCategories.map((category) => (
              <label key={category} className="flex gap-2 cursor-pointer">
                <input
                  className="w-3 cursor-pointer"
                  type="checkbox"
                  value={category}
                  checked={pendingFilters.category.includes(category)}
                  onChange={() => togglePendingFilter(category, 'category')}
                />
                {category}
              </label>
            ))}
          </div>
          <FilterButton onClick={applyFilters}>Anwenden</FilterButton>
        </>
      }
    </ToggleDropdown>
  );
};
