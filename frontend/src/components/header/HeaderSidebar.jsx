import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaTimes, FaUser } from 'react-icons/fa';

export const HeaderSidebar = ({ showSideMenu, setShowSideMenu, handleLogout, user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      {/* HeaderSidebar für mobile Ansicht */}
      <div
        className={`fixed top-0 left-0 w-5/6 max-w-sm h-screen bg-white shadow-xl transition-all duration-500 ease-in-out overflow-y-auto z-50 ${
          showSideMenu ? 'translate-x-0' : '-translate-x-full'
        } xl:hidden`}
      >
        <div
          onClick={() => setShowSideMenu(false)}
          className="w-full bg-custom-text-green text-white pl-6 py-2 text-xl flex justify-between items-center cursor-pointer"
        >
          {user ? (
            <>
              <div className="flex items-center gap-2">
                <FaUser className="text-2xl" />
                <div className="text-xl flex items-center justify-center">{user.username.split(' ')[0]}</div>
              </div>
              <button
                className="w-12 h-12 flex items-center justify-center cursor-pointer pr-6 text-white"
                onClick={() => setShowSideMenu(false)} // Menü schließen
              >
                <FaTimes className="text-xl" />
              </button>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <div className="text-xl flex items-center justify-center">Schliessen</div>
              </div>
              <button
                className="w-12 h-12 flex items-center justify-center cursor-pointer pr-6 text-white"
                onClick={() => setShowSideMenu(false)} // Menü schließen
              >
                <FaTimes className="text-xl" />
              </button>
            </>
          )}
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col text-custom-text-green text-xl">
          <div className="flex flex-col lg:hidden">
            {' '}
            <NavLink to="/category/Damen" className="px-6 py-4 border-b" onClick={() => setShowSideMenu(false)}>
              Damen
            </NavLink>
            <NavLink to="/category/Herren" className="px-6 py-4 border-b" onClick={() => setShowSideMenu(false)}>
              Herren
            </NavLink>
            <NavLink to="/category/Kinder" className="px-6 py-4 border-b" onClick={() => setShowSideMenu(false)}>
              Kinder
            </NavLink>
            <NavLink to="/items/new/create" className="px-6 py-4 border-b" onClick={() => setShowSideMenu(false)}>
              VERSCHENKEN
            </NavLink>
          </div>

          {user ? (
            <>
              <NavLink
                to="/user/items/meine-artikel"
                className="px-6 py-4 border-b"
                onClick={() => setShowSideMenu(false)}
              >
                Meine Artikel
              </NavLink>
              <button onClick={handleLogout} className="px-6 py-4 border-b text-start">
                Abmelden
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                navigate('/login', { state: { from: location.pathname } });
                setShowSideMenu(false);
              }}
              className="px-6 py-4 border-b text-left"
            >
              Anmelden
            </button>
          )}
        </div>
      </div>
    </>
  );
};
