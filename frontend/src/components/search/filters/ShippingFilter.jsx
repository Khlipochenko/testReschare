import React, { useContext } from 'react';
import { FilterContext } from '../../../context/FilterContext';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';

const customShippingOrder = ['Versand möglich', 'Nur Abholung'];

export const ShippingFilter = () => {
  const { setSelectedShipping, selectedShipping, openFilters, toggleFilterMenu, allFilters } =
    useContext(FilterContext);

  const allShipping = allFilters.shipping || [];

  const sortedShipping = customShippingOrder.filter((option) => allShipping.includes(option));

  const toggleShipping = (e) => {
    setSelectedShipping(e.target.value); // Richtige Funktion aufrufen
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <button
        className="flex items-center justify-between w-full cursor-pointer"
        onClick={() => toggleFilterMenu('shipping')}
      >
        <h2 className="text-xl font-medium text-custom-text-brown">Versand</h2>
        {openFilters.shipping ? (
          <RiArrowDropUpLine className="text-3xl" />
        ) : (
          <RiArrowDropDownLine className="text-3xl" />
        )}
      </button>

      {openFilters.shipping && (
        <div className="transition-all duration-200 ease-in-out overflow-hidden text-lg mt-4">
          <div className="flex flex-col gap-2 font-light text-custom-text-grey pl-4">
            {sortedShipping.length > 0 ? (
              sortedShipping.map((shipping) => (
                <label key={shipping} className="flex gap-2 cursor-pointer">
                  <input
                    className="w-3 cursor-pointer"
                    type="radio"
                    value={shipping}
                    checked={selectedShipping === shipping}
                    onChange={toggleShipping}
                  />{' '}
                  {shipping}
                </label>
              ))
            ) : (
              <p>Keine Versandoption verfügbar</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
