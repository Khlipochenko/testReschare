import React, { useContext, useState } from 'react';
import { FilterContext } from '../../../context/FilterContext';
import { ToggleDropdown } from './ToggleDropdown';
import { FilterButton } from './FilterButton';

const customShippingOrder = ['Versand möglich', 'Nur Abholung'];

export const ShippingFilter = () => {
  const { setSelectedShipping, availableFilters, pendingFilters, setPendingFilters } = useContext(FilterContext);

  const availableShipping = availableFilters.shipping;

  const sortedShipping = customShippingOrder.filter((option) => availableShipping.includes(option));

  const applyFilters = () => {
    setSelectedShipping(pendingFilters.shipping);
  };

  const togglePendingShipping = (e) => {
    setPendingFilters((prevFilters) => ({
      ...prevFilters,
      shipping: e.target.value
    }));
  };

  return (
    <ToggleDropdown title="Versand">
      {
        <>
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
        </>
      }
    </ToggleDropdown>
  );
};
