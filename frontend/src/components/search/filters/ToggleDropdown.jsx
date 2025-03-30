import React from 'react';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import { useToggleMenu } from '../../../hooks/useToggleMenu';

export const ToggleDropdown = ({ title, children }) => {
  const { showMenu, toggleMenu } = useToggleMenu(false);

  return (
    <div>
      <button className="flex items-center justify-between w-full cursor-pointer" onClick={toggleMenu}>
        <h2 className="text-lg font-medium text-custom-text-brown">{title}</h2>
        {showMenu ? <RiArrowDropUpLine className="text-2xl" /> : <RiArrowDropDownLine className="text-2xl" />}
      </button>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden text-lg ${
          showMenu ? 'max-h-screen opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
};
