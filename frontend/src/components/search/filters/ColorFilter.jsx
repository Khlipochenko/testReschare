import React, { useContext } from 'react';
import { FilterContext } from '../../../context/FilterContext';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';

const customColorOrder = [
  { colorcode: '#000000', name: 'Schwarz' },
  { colorcode: '#663300', name: 'Braun' },
  { colorcode: '#919191', name: 'Grau' },
  { colorcode: '#F7E9D8', name: 'Beige' },
  { colorcode: '#FF0080', name: 'Pink' },
  { colorcode: '#800080', name: 'Lila' },
  { colorcode: '#CC3300', name: 'Rot' },
  { colorcode: '#FFF200', name: 'Gelb' },
  { colorcode: '#007BC4', name: 'Blau' },
  { colorcode: '#369A3D', name: 'Grün' },
  { colorcode: '#FFA500', name: 'Orange' },
  { colorcode: '#FFFFFF', name: 'Weiß' },
  { colorcode: 'conic-gradient(red, yellow, lime, aqua, blue, magenta, red)', name: 'Bunt' }
];

export const ColorFilter = () => {
  const { setSelectedColor, selectedColor, openFilters, toggleFilterMenu, allFilters } = useContext(FilterContext);

  const allColors = allFilters.colors || [];

  const sortedColors =
    allColors.length > 0
      ? allColors.sort(
          (a, b) =>
            customColorOrder.findIndex((color) => color.name === a.name) -
            customColorOrder.findIndex((color) => color.name === b.name)
        )
      : customColorOrder;

  const toggleCheckbox = (filterValue) => {
    setSelectedColor(
      (prev) =>
        prev.includes(filterValue)
          ? prev.filter((item) => item !== filterValue) // Entfernt den Filter
          : [...prev, filterValue] // Fügt den Filter hinzu
    );
    //toggleFilterMenu('subcategory'); // Dropdown schließen nach Anwenden
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <button
        className="flex items-center justify-between w-full cursor-pointer"
        onClick={() => toggleFilterMenu('color')}
      >
        <h2 className="text-xl font-medium text-custom-text-brown">Farbe</h2>
        {openFilters.color ? <RiArrowDropUpLine className="text-3xl" /> : <RiArrowDropDownLine className="text-3xl" />}
      </button>

      {openFilters.color && (
        <div className="transition-all duration-200 ease-in-out overflow-hidden text-lg mt-4">
          <div className="flex flex-wrap gap-2 px-4 py-2">
            {sortedColors.length > 0 ? (
              sortedColors.map((color) => (
                <label key={color.name} className="relative">
                  <input
                    className="hidden"
                    type="checkbox"
                    value={color.name}
                    checked={selectedColor.includes(color.name)}
                    onChange={() => toggleCheckbox(color.name)}
                  />
                  <div
                    className={`w-8 h-8 rounded-full border border-gray-300 cursor-pointer transition-all hover:scale-105 ${
                      selectedColor.includes(color.name) ? 'outline outline-2 outline-orange-500' : ''
                    }`}
                    style={{ background: color.colorcode }}
                  ></div>
                </label>
              ))
            ) : (
              <p>Keine Farbe verfügbar</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
