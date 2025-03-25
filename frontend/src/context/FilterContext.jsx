import { createContext, useContext, useEffect, useState } from 'react';
import { SearchContext } from './SearchContext';

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState([]);
  const [selectedSize, setSelectedSize] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);
  const [selectedShipping, setSelectedShipping] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [availableFilters, setAvailableFilters] = useState({
    categories: [],
    subcategories: [],
    sizes: [],
    colors: [],
    shipping: ''
  });
  const [pendingFilters, setPendingFilters] = useState({
    category: [],
    subcategory: [],
    size: [],
    color: [],
    shipping: ''
  });

  const [currentPage, setCurrentPage] = useState(1);
  const { setSearchTerm } = useContext(SearchContext);

  const clearAllFilters = () => {
    setSelectedCategory([]);
    setSelectedSubcategory([]);
    setSelectedSize([]);
    setSelectedColor([]);
    setSelectedShipping('');
    setSearchTerm('');
    setPendingFilters({
      category: [],
      subcategory: [],
      size: [],
      color: [],
      shipping: ''
    });
  };

  return (
    <FilterContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        selectedSubcategory,
        setSelectedSubcategory,
        selectedSize,
        setSelectedSize,
        selectedColor,
        setSelectedColor,
        selectedShipping,
        setSelectedShipping,
        availableFilters,
        setAvailableFilters,
        clearAllFilters,
        showFilter,
        setShowFilter,
        totalItemsCount,
        setTotalItemsCount,
        pendingFilters,
        setPendingFilters,
        currentPage,
        setCurrentPage,
        setSearchTerm
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
