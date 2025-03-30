// import React from 'react';
// import { ItemCard } from '../Item/ItemCard';
// import { useFilteredItems } from '../../hooks/useFilteredItems';
// import CircularProgress from '@mui/material/CircularProgress'; // Falls du Material-UI verwendest

// export const ResultList = () => {
//   const { filteredItems, loading } = useFilteredItems();

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <CircularProgress />
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
//       {filteredItems?.length > 0 ? (
//         filteredItems.map((item) => <ItemCard key={item._id} item={item} />)
//       ) : (
//         <div className="col-span-full flex justify-center items-center mt-20 text-lg text-custom-text-brown">
//           <p>Keine Artikel gefunden.</p>
//         </div>
//       )}
//     </div>
//   );
// };
