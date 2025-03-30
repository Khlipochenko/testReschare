import React, { useContext } from 'react';
import { FilterContext } from '../../../context/FilterContext';
import { useToggleFilter } from '../../../hooks/useToggleFilter';
import { FilterButton } from './FilterButton';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import { useToggleMenu } from '../../../hooks/useToggleMenu';

const customSizeOrder = [
  '50-56 (Neugeborene)',
  '62-68 (3-6 Monate)',
  '74-80 (6-12 Monate)',
  '86-92 (1-2 Jahre)',
  '98-104 (2-4 Jahre)',
  '110-116 (4-6 Jahre)',
  '122-128 (6-8 Jahre)',
  '134-140 (8-10 Jahre)',
  '146-152 (10-12 Jahre)',
  '158-164 (12-14 Jahre)',
  '32 (XS)',
  '34 (XS)',
  '36 (S)',
  '38 (M)',
  '40 (M)',
  '42 (L)',
  '44 (XL)',
  '46 (XL)',
  '48 (XXL)',
  '44 (XS)',
  '46 (S)',
  '48 (M)',
  '50 (M)',
  '52 (L)',
  '54 (XL)',
  '56 (XL)',
  '58 (XXL)',
  '60 (XXL)'
];

export const SizeFilter = () => {
  const { setSelectedSize, availableFilters, pendingFilters } = useContext(FilterContext);
  const { togglePendingFilter } = useToggleFilter();
  const { showMenu, toggleMenu } = useToggleMenu(false);

  const availableSizes = availableFilters.sizes;

  const sortedSizes = availableSizes.sort((a, b) => customSizeOrder.indexOf(a) - customSizeOrder.indexOf(b));

  const applyFilters = () => {
    setSelectedSize(pendingFilters.size);
    toggleMenu(); // Dropdown schließen nach Anwenden
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <button className="flex items-center justify-between w-full cursor-pointer" onClick={toggleMenu}>
        <h2 className="text-xl font-medium text-custom-text-brown">Größe</h2>
        {showMenu ? <RiArrowDropUpLine className="text-3xl" /> : <RiArrowDropDownLine className="text-3xl" />}
      </button>

      {showMenu && (
        <div className="transition-all duration-200 ease-in-out overflow-hidden text-lg mt-4">
          <div className="flex flex-col gap-2 font-light text-custom-text-grey pl-4">
            {sortedSizes.map((size) => (
              <label key={size} className="flex gap-2 cursor-pointer">
                <input
                  className="w-3 cursor-pointer"
                  type="checkbox"
                  value={size}
                  checked={pendingFilters.size.includes(size)}
                  onChange={() => {
                    togglePendingFilter(size, 'size');
                  }}
                />
                {size}
              </label>
            ))}
          </div>
          <FilterButton onClick={applyFilters}>Anwenden</FilterButton>
        </div>
      )}
    </div>
  );
};
