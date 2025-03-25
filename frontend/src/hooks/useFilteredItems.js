import React, { useContext, useEffect, useState } from 'react';
import { FilterContext } from '../context/FilterContext';
import { SearchContext } from '../context/SearchContext';
import { useParams } from 'react-router-dom';

export const useFilteredItems = () => {
  const { category } = useParams();
  const { searchTerm, showSearch, sortOption } = useContext(SearchContext);
  const {
    selectedCategory,
    selectedSubcategory,
    selectedSize,
    selectedColor,
    selectedShipping,
    availableFilters,
    setAvailableFilters,
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
      setFilteredItems(data.searchItems);
      setTotalPages(data.totalPages);
      setTotalItemsCount(data.totalItemsCount);
      // console.log('Received availableFilters:', data.availableFilters, data.totalItemsCount);
      setAvailableFilters(data.availableFilters);
      // console.log('Gefilterte Items gesetzt:', data.searchItems);
    } catch (error) {
      console.error('Fehler beim Laden der Items:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilteredItems();
  }, [
    category,
    searchTerm,
    showSearch,
    sortOption,
    selectedCategory,
    selectedSubcategory,
    selectedSize,
    selectedColor,
    selectedShipping,
    currentPage
  ]);

  return { filteredItems, totalPages, currentPage, loading, setCurrentPage, availableFilters };
};
