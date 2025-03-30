import { useContext } from 'react';
import { FilterContext } from '../context/FilterContext';
import { SearchContext } from '../context/SearchContext';

export const useActiveFilters = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedSubcategory,
    setSelectedSubcategory,
    selectedSize,
    setSelectedSize,
    selectedColor,
    setSelectedColor,
    selectedLocation,
    setSelectedLocation,
    selectedShipping,
    setSelectedShipping,
    clearAllFilters,
    setPendingFilters
  } = useContext(FilterContext);

  const { searchTerm, setSearchTerm } = useContext(SearchContext);

  const removeFilterFromPending = (filter, value) => {
    setPendingFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: Array.isArray(prevFilters[filter])
        ? prevFilters[filter].filter((item) => item !== value) // Falls es ein Array ist, filter anwenden
        : '' // Falls es ein String ist (shipping oder searchTerm), auf leeren String setzen ""
    }));
  };
  const removeFilter = (filter, value) => {
    // Entferne den Filter aus dem ausgewählten Zustand
    if (filter === 'category') {
      setSelectedCategory(selectedCategory.filter((item) => item !== value));
    } else if (filter === 'subcategory') {
      setSelectedSubcategory(selectedSubcategory.filter((item) => item !== value));
    } else if (filter === 'size') {
      setSelectedSize(selectedSize.filter((item) => item !== value));
    } else if (filter === 'color') {
      setSelectedColor(selectedColor.filter((item) => item !== value));
    } else if (filter === 'location') {
      setSelectedColor(selectedLocation.filter((item) => item !== value));
    } else if (filter === 'shipping') {
      setSelectedShipping('');
    } else if (filter === 'searchTerm') {
      setSearchTerm('');
    }

    // Filter auch aus pendingFilters entfernen, also unchecked machen
    removeFilterFromPending(filter, value);
  };

  const hasActiveFilters =
    selectedCategory.length > 0 ||
    selectedSubcategory.length > 0 ||
    selectedSize.length > 0 ||
    selectedColor.length > 0 ||
    selectedLocation.length > 0 ||
    selectedShipping ||
    searchTerm;

  return {
    selectedCategory,
    selectedSubcategory,
    selectedSize,
    selectedColor,
    selectedLocation,
    selectedShipping,
    removeFilter,
    clearAllFilters,
    hasActiveFilters,
    searchTerm,
    setPendingFilters
  };
};
