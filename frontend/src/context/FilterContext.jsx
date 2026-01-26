import { createContext, useContext, useEffect, useState } from 'react';
import { SearchContext } from './SearchContext';

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState([]);
  const [selectedSize, setSelectedSize] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selectedShipping, setSelectedShipping] = useState('');

  const [openFilters, setOpenFilters] = useState({
    category: false,
    subcategory: false,
    size: false,
    color: false,
    location: false,
    shipping: false
  });

  const [availableFilters, setAvailableFilters] = useState({
    categories: [],
    subcategories: [],
    sizes: [],
    colors: [],
    locations: [],
    shipping: ''
  });

  // Alle Filter (alle möglichen Optionen aus der DB)
  const [allFilters, setAllFilters] = useState({
    categories: [],
    subcategories: [],
    sizes: [],
    colors: [],
    locations: [],
    shipping: ''
  });

  const [pendingFilters, setPendingFilters] = useState({
    category: [],
    subcategory: [],
    size: [],
    color: [],
    location: [],
    shipping: ''
  });

  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const { setSearchTerm } = useContext(SearchContext);

  // Funktion zum Öffnen und Schließen der Filter
  const toggleFilterMenu = (menuName) => {
    setOpenFilters((prev) => {
      const isCurrentlyOpen = prev[menuName];

      return {
        category: false,
        subcategory: false,
        size: false,
        color: false,
        location: false,
        shipping: false,
        [menuName]: !isCurrentlyOpen
      };
    });
  };

  // Funktion zum Löschen der aktiven Filter
  const clearAllFilters = () => {
    setSelectedCategory([]);
    setSelectedSubcategory([]);
    setSelectedSize([]);
    setSelectedColor([]);
    setSelectedLocation([]);
    setSelectedShipping('');
    setSearchTerm('');
    setPendingFilters({
      category: [],
      subcategory: [],
      size: [],
      color: [],
      location: [],
      shipping: ''
    });
    closeAllFilters();
  };

  // Funktion zum Schließen aller Filter-Menüs
  const closeAllFilters = () => {
    setOpenFilters({
      category: false,
      subcategory: false,
      size: false,
      color: false,
      location: false,
      shipping: false
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
        selectedLocation,
        setSelectedLocation,
        selectedShipping,
        setSelectedShipping,
        availableFilters,
        setAvailableFilters,
        allFilters,
        setAllFilters,
        pendingFilters,
        setPendingFilters,
        openFilters,
        setOpenFilters,
        totalItemsCount,
        setTotalItemsCount,
        currentPage,
        setCurrentPage,
        clearAllFilters,
        closeAllFilters,
        toggleFilterMenu
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
