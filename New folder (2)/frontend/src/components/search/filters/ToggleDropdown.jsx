// import React, { useContext } from 'react';
// import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
// import { FilterContext } from '../../../context/FilterContext';

// export const ToggleDropdown = ({ title, children }) => {
//   const { openFilters, setOpenFilters } = useContext(FilterContext);
//   const isOpen = openFilters[title] || false; // Nutzt `title` als Schlüssel

//   const toggleMenu = () => {
//     setOpenFilters((prev) => ({
//       ...prev,
//       [title]: !prev[title]
//     }));
//   };

//   return (
//     <div>
//       <button className="flex items-center justify-between w-full cursor-pointer" onClick={toggleMenu}>
//         <h2 className="text-xl font-medium text-custom-text-brown">{title}</h2>
//         {isOpen ? <RiArrowDropUpLine className="text-3xl" /> : <RiArrowDropDownLine className="text-3xl" />}
//       </button>

//       <div
//         className={`transition-all duration-200 ease-in-out overflow-hidden text-lg ${
//           isOpen ? 'max-h-screen opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
//         }`}
//       >
//         {children}
//       </div>
//     </div>
//   );
// };
