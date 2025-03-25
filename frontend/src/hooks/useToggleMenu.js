import { useState } from 'react';

export const useToggleMenu = (initialState = false) => {
  const [showMenu, setShowMenu] = useState(initialState);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  return { showMenu, setShowMenu, toggleMenu };
};
