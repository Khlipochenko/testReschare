import React, { useContext } from 'react';
import { FilterContext } from '../../../context/FilterContext';
import { useToggleFilter } from '../../../hooks/useToggleFilter';
import { FilterButton } from './FilterButton';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import { useToggleMenu } from '../../../hooks/useToggleMenu';

const customCategoryOrder = ['Damen', 'Herren', 'Kinder'];

export const CategoryFilter = () => {
  const { setSelectedCategory, availableFilters, pendingFilters } = useContext(FilterContext);
  const { togglePendingFilter } = useToggleFilter();
  const { showMenu, toggleMenu } = useToggleMenu(false);

  const availableCategories = availableFilters.categories;

  const sortedCategories = availableCategories.sort(
    (a, b) => customCategoryOrder.indexOf(a) - customCategoryOrder.indexOf(b)
  );

  const applyFilters = () => {
    setSelectedCategory(pendingFilters.category);
    toggleMenu(); // Dropdown schließen nach Anwenden
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <button className="flex items-center justify-between w-full cursor-pointer" onClick={toggleMenu}>
        <h2 className="text-xl font-medium text-custom-text-brown">Kategorie</h2>
        {showMenu ? <RiArrowDropUpLine className="text-3xl" /> : <RiArrowDropDownLine className="text-3xl" />}
      </button>

      {showMenu && (
        <div className="transition-all duration-200 ease-in-out overflow-hidden text-lg mt-4">
          <div className="flex flex-col gap-2 font-light text-custom-text-grey pl-4">
            {sortedCategories.map((category) => (
              <label key={category} className="flex gap-2 cursor-pointer">
                <input
                  className="w-3 cursor-pointer"
                  type="checkbox"
                  value={category}
                  checked={pendingFilters.category.includes(category)}
                  onChange={() => togglePendingFilter(category, 'category')}
                />
                {category}
              </label>
            ))}
          </div>
          <FilterButton onClick={applyFilters}>Anwenden</FilterButton>
        </div>
      )}
    </div>
  );
};

// import React, { useContext, useEffect } from 'react';
// // import { useParams } from 'react-router-dom';
// import { FilterContext } from '../../../context/FilterContext';
// import { ToggleDropdown } from './ToggleDropdown';
// import { useToggleFilter } from '../../../hooks/useToggleFilter';
// import { FilterButton } from './FilterButton';
// import { useToggleMenu } from '../../../hooks/useToggleMenu';

// const customCategoryOrder = ['Damen', 'Herren', 'Kinder'];

// export const CategoryFilter = () => {
//   const { setSelectedCategory, availableFilters, pendingFilters} =
//     useContext(FilterContext);
//   const { togglePendingFilter } = useToggleFilter();

//   const availableCategories = availableFilters.categories;

//   const sortedCategories = availableCategories.sort(
//     (a, b) => customCategoryOrder.indexOf(a) - customCategoryOrder.indexOf(b)
//   );

//   const applyFilters = () => {
//     setSelectedCategory(pendingFilters.category);

//   };

//   return (
//     <ToggleDropdown title="Kategorie" isOpen={isOpen}>
//       {
//         <>
//           <div className="flex flex-col gap-2 font-light text-custom-text-grey pl-4 ">
//             {sortedCategories.map((category) => (
//               <label key={category} className="flex gap-2 cursor-pointer">
//                 <input
//                   className="w-3 cursor-pointer"
//                   type="checkbox"
//                   value={category}
//                   checked={pendingFilters.category.includes(category)}
//                   onChange={() => togglePendingFilter(category, 'category')}
//                 />
//                 {category}
//               </label>
//             ))}
//           </div>
//           <FilterButton onClick={applyFilters}>Anwenden</FilterButton>
//         </>
//       }
//     </ToggleDropdown>
//   );
// };
