import React, { useContext } from 'react';
import { FilterContext } from '../../../context/FilterContext';
import { ToggleDropdown } from './ToggleDropdown';
import { useToggleFilter } from '../../../hooks/useToggleFilter';
import { FilterButton } from './FilterButton';

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
  const { setSelectedColor, availableFilters, pendingFilters } = useContext(FilterContext);
  const { togglePendingFilter } = useToggleFilter();

  const availableColors = availableFilters.colors;
  // console.log(availableFilters.colors);

  const sortedColors = availableColors.sort(
    (a, b) =>
      customColorOrder.findIndex((color) => color.name === a.name) -
      customColorOrder.findIndex((color) => color.name === b.name)
  );

  const applyFilters = () => {
    setSelectedColor(pendingFilters.color);
  };

  return (
    <ToggleDropdown title="Farbe">
      <>
        <div className="flex flex-wrap gap-2 px-4 py-2">
          {sortedColors.map((color) => (
            <label key={color.name} className="relative">
              <input
                className="hidden"
                type="checkbox"
                value={color.name}
                checked={pendingFilters.color.includes(color.name)}
                onChange={() => togglePendingFilter(color.name, 'color')}
              />
              <div
                className={`w-8 h-8 rounded-full border border-gray-300 cursor-pointer transition-all hover:scale-105 ${
                  pendingFilters.color.includes(color.name) ? 'outline outline-2 outline-orange-500' : ''
                }`}
                style={{ background: color.colorcode }}
              ></div>
            </label>
          ))}
        </div>
        <FilterButton onClick={applyFilters}>Anwenden</FilterButton>
      </>
    </ToggleDropdown>
  );
};
