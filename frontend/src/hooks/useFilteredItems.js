import React, { useContext, useEffect, useState } from 'react';
import { FilterContext } from '../context/FilterContext';
import { SearchContext } from '../context/SearchContext';
import { useParams } from 'react-router-dom';
import { ItemsContext } from '../context/ItemsContext';

export const useFilteredItems = () => {
  const { category } = useParams();
  const { searchTerm, sortOption } = useContext(SearchContext);
  const {
    selectedCategory,
    selectedSubcategory,
    selectedSize,
    selectedColor,
    selectedLocation,
    selectedShipping,
    availableFilters,
    setAvailableFilters,
    allFilters,
    setAllFilters,
    setTotalItemsCount
  } = useContext(FilterContext);

  const [filteredItems, setFilteredItems] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchFilteredItems = async () => {
    setLoading(true);
    try {
      const categoryParam = category ? category : selectedCategory.length > 0 ? selectedCategory.join(',') : '';

      const queryParams = new URLSearchParams({
        q: searchTerm,
        category: categoryParam,
        subcategory: selectedSubcategory.join(','),
        size: selectedSize.join(','),
        color: selectedColor.join(','),
        location: selectedLocation.join(','),
        shipping: selectedShipping,
        sort: sortOption,
        page: currentPage,
        limit: 12
      });

      const url = category
        ? `${import.meta.env.VITE_API_URL}/api/search/category/${category}?${queryParams.toString()}`
        : `${import.meta.env.VITE_API_URL}/api/search?${queryParams.toString()}`;

      const response = await fetch(url);

      if (response.status === 404) {
        setFilteredItems([]); // Keine Ergebnisse
        console.log('Keine Ergebnisse gefunden.');
        return;
      }

      if (!response.ok && response.status !== 404) {
        throw new Error('Fehler beim Laden der Items');
      }

      const data = await response.json();
      console.log('Response data:', data);

      console.log('Received availableFilters', data.availableFilters);
      console.log('Received allFilters:', data.allFilters);

      setFilteredItems(data.searchItems);
      setTotalPages(data.totalPages);
      setTotalItemsCount(data.totalItemsCount);
      console.log('Received availableFilters:', data.availableFilters, data.totalItemsCount);

      setAvailableFilters(data.availableFilters);
      setAllFilters(data.allFilters);

      // console.log('Gefilterte Items gesetzt:', data.searchItems);
    } catch (error) {
      console.error('Fehler beim Laden der Items:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Setzt die Seite auf 1, wenn sich Filter oder Suchbegriffe ändern
    setCurrentPage(1);
  }, [
    category,
    searchTerm,
    sortOption,
    selectedCategory,
    selectedSubcategory,
    selectedSize,
    selectedColor,
    selectedLocation,
    selectedShipping
  ]);

  useEffect(() => {
    fetchFilteredItems();
  }, [
    category,
    searchTerm,
    sortOption,
    selectedCategory,
    selectedSubcategory,
    selectedSize,
    selectedColor,
    selectedLocation,
    selectedShipping,
    currentPage
  ]);

  return { filteredItems, totalPages, currentPage, loading, setCurrentPage, availableFilters, allFilters };
};
