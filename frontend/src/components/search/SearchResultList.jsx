import React, { useContext } from 'react';
import { ItemCard } from '../Item/ItemCard';
import CircularProgress from '@mui/material/CircularProgress';
import { useFilteredItems } from '../../hooks/useFilteredItems';
import Pagination from './Pagination';

export const SearchResultList = () => {
  const { filteredItems, loading, totalPages, currentPage, setCurrentPage } = useFilteredItems();

  // console.log('filteredItems:', filteredItems);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="pb-10">
      {' '}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
        {filteredItems?.length > 0 ? (
          filteredItems.map((item) => <ItemCard key={item._id} item={item} />)
        ) : (
          <div className="col-span-full flex justify-center items-center mt-20 text-lg text-custom-text-brown">
            <p>Keine Artikel gefunden.</p>
          </div>
        )}
      </div>
      {totalPages > 0 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
      )}
    </div>
  );
};
