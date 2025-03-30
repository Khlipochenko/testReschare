import React, { useContext, useState } from 'react';
// import { SearchContext } from '../../context/SearchContext';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import { SearchContext } from '../../context/SearchContext';
import { useToggleMenu } from '../../hooks/useToggleMenu';

export const Sort = () => {
  const { sortOption, setSortOption } = useContext(SearchContext);
  const { showMenu, setShowMenu, toggleMenu } = useToggleMenu(false);

  const options = ['Neueste', 'Älteste'];

  const handleSortOption = (value) => {
    setSortOption(value);
    setShowMenu(false);
  };

  return (
    <div className="relative justify-end flex">
      <div className="flex items-center py-2 text-xl text-custom-text-brown">
        <p>Sortieren nach:</p>
        <button className="flex items-center ml-2" onClick={toggleMenu}>
          {sortOption || 'Wählen'}
          {showMenu ? (
            <RiArrowDropUpLine className="text-2xl ml-1" />
          ) : (
            <RiArrowDropDownLine className="text-2xl ml-1" />
          )}
        </button>
      </div>

      {showMenu && (
        <div className="absolute right-0 top-8 mt-2 w-48 text-lg font-medium bg-white shadow-xl border rounded-md  z-10">
          {options.map((option) => (
            <div
              key={option}
              className="px-4 py-2 cursor-pointer text-custom-text-green hover:bg-custom-text-green hover:text-white"
              onClick={() => handleSortOption(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// import React, { useContext } from 'react';
// import { SearchContext } from '../../context/SearchContext';

// export const Sort = () => {
//   const { sortOption, setSortOption } = useContext(SearchContext);
//   return (
//     <div className="flex justify-end mb-2 mt-6">
//       <select
//         className=" text-custom-text-brown rounded-md text-lg px-3"
//         value={sortOption}
//         onChange={(e) => setSortOption(e.target.value)}
//       >
//         {/* <option value="relevant">Sortieren nach: Relevanz</option> */}
//         <option value="neueste">Sortieren nach: Neueste</option>
//         <option value="älteste">Sortieren nach: Älteste</option>
//       </select>
//     </div>
//   );
// };
