import React, { useContext } from 'react';
import { FilterContext } from '../../../context/FilterContext';
import { FilterButton } from './FilterButton';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import { useToggleMenu } from '../../../hooks/useToggleMenu';

const customShippingOrder = ['Versand möglich', 'Nur Abholung'];

export const ShippingFilter = () => {
  const { setSelectedShipping, availableFilters, pendingFilters, setPendingFilters } = useContext(FilterContext);
  const { showMenu, toggleMenu } = useToggleMenu(false);

  const availableShipping = availableFilters.shipping;

  const sortedShipping = customShippingOrder.filter((option) => availableShipping.includes(option));

  const applyFilters = () => {
    setSelectedShipping(pendingFilters.shipping);
    toggleMenu(); // Dropdown schließen nach Anwenden
    window.scrollTo(0, 0);
  };

  const togglePendingShipping = (e) => {
    setPendingFilters((prevFilters) => ({
      ...prevFilters,
      shipping: e.target.value
    }));
  };

  return (
    <div>
      <button className="flex items-center justify-between w-full cursor-pointer" onClick={toggleMenu}>
        <h2 className="text-xl font-medium text-custom-text-brown">Versand</h2>
        {showMenu ? <RiArrowDropUpLine className="text-3xl" /> : <RiArrowDropDownLine className="text-3xl" />}
      </button>

      {showMenu && (
        <div className="transition-all duration-200 ease-in-out overflow-hidden text-lg mt-4">
          <div className="flex flex-col gap-2 font-light text-custom-text-grey pl-4">
            {sortedShipping.map((shipping) => (
              <label key={shipping} className="flex gap-2 cursor-pointer">
                <input
                  className="w-3 cursor-pointer"
                  type="radio"
                  value={shipping}
                  checked={pendingFilters.shipping === shipping}
                  onChange={togglePendingShipping}
                />{' '}
                {shipping}
              </label>
            ))}
          </div>
          <FilterButton onClick={applyFilters}>Anwenden</FilterButton>
        </div>
      )}
    </div>
  );
};
