import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

export const HeaderNavigation = ({ isHomePage, isScrolled }) => {
  return (
    <ul className="flex gap-8 text-2xl">
      <li>
        <NavLink
          to="/category/Damen"
          onClick={() => window.scrollTo(0, 0)}
          className="flex flex-col items-center gap-1"
        >
          <p>Damen</p>
          <hr className="w-full border-none h-[1.5px] bg-custom-text-green hidden" />
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/category/Herren"
          onClick={() => window.scrollTo(0, 0)}
          className="flex flex-col items-center gap-1"
        >
          <p>Herren</p>
          <hr className="w-full border-none h-[1.5px] bg-custom-text-green hidden" />
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/category/Kinder"
          onClick={() => window.scrollTo(0, 0)}
          className="flex flex-col items-center gap-1"
        >
          <p>Kinder</p>
          <hr className="w-full border-none h-[1.5px] bg-custom-text-green hidden" />
        </NavLink>
      </li>
      <li>
        <NavLink
          to={'/items/new/create'}
          onClick={() => window.scrollTo(0, 0)}
          className="flex flex-col items-center gap-1"
        >
          <p>VERSCHENKEN</p>
          <hr className="w-full border-none h-[1.5px] bg-custom-text-green hidden" />
        </NavLink>
      </li>
    </ul>
  );
};
