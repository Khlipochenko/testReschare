import React, { useContext } from 'react';
import { useActiveFilters } from '../../../hooks/useActiveFilters';
import { IoClose } from 'react-icons/io5';
import { SearchContext } from '../../../context/SearchContext';

export const ActiveFilters = () => {
  const { selectedCategory, selectedSubcategory, selectedSize, selectedColor, selectedShipping, removeFilter } =
    useActiveFilters(); // ausgewählte Filter aus dem custom hook holen
  const { searchTerm, setSearchTerm } = useContext(SearchContext);

  return (
    <div className="flex flex-col gap-2 mt-2">
      {/* Überprüfung, ob keine Filter ausgwählt sind */}
      {selectedCategory.length === 0 &&
        selectedSubcategory.length === 0 &&
        selectedSize.length === 0 &&
        selectedColor.length === 0 &&
        selectedSubcategory.length === 0 &&
        !selectedShipping &&
        !searchTerm && <span className="text-gray-500 text-sm">Keine aktiven Filter</span>}

      {/* Alle aktiven Filter anzeigen */}
      <ul className="list-none p-0 m-0">
        {searchTerm && (
          <li className="mb-2 cursor-pointer" onClick={() => removeFilter('searchTerm', searchTerm)}>
            <span className="hover:bg-custom-text-green hover:text-white text-custom-text-brown border border-custom-text-green px-2 py-1 text-sm rounded-full flex items-center gap-1 w-max">
              "{searchTerm}" <IoClose className="text-lg" />
            </span>
          </li>
        )}

        {selectedCategory.map((category, index) => (
          <li key={index} className="mb-2 cursor-pointer" onClick={() => removeFilter('category', category)}>
            <span className="hover:bg-custom-text-green hover:text-white text-custom-text-brown border border-custom-text-green px-2 py-1 text-sm rounded-full flex items-center gap-1 w-max">
              {category} <IoClose className="text-lg" />
            </span>
          </li>
        ))}
        {selectedSubcategory.map((subcategory, index) => (
          <li key={index} className="mb-2 cursor-pointer" onClick={() => removeFilter('subcategory', subcategory)}>
            <span className="hover:bg-custom-text-green hover:text-white text-custom-text-brown border border-custom-text-green px-2 py-1 text-sm rounded-full flex items-center gap-1 w-max">
              {subcategory} <IoClose className="text-lg" />
            </span>
          </li>
        ))}
        {selectedSize.map((size, index) => (
          <li key={index} className="mb-2 cursor-pointer" onClick={() => removeFilter('size', size)}>
            <span className="hover:bg-custom-text-green hover:text-white text-custom-text-brown border border-custom-text-green px-2 py-1 text-sm border rounded-full flex items-center gap-1 w-max">
              {size} <IoClose className="text-lg" />
            </span>
          </li>
        ))}
        {selectedColor.map((color, index) => (
          <li key={index} className="mb-2 cursor-pointer" onClick={() => removeFilter('color', color)}>
            <span className="hover:bg-custom-text-green hover:text-white text-custom-text-brown border border-custom-text-green px-2 py-1 text-sm rounded-full flex items-center gap-1 w-max">
              {color} <IoClose className="text-lg" />
            </span>
          </li>
        ))}
        {selectedShipping && (
          <li className="mb-2 cursor-pointer " onClick={() => removeFilter('shipping', selectedShipping)}>
            <span className="hover:bg-custom-text-green hover:text-white text-custom-text-brown border border-custom-text-green px-2 py-1 text-sm rounded-full flex items-center gap-1 w-max">
              {selectedShipping} <IoClose className="text-lg" />
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};
