import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { useToggleSearch } from '../../hooks/useToggleSearch';
import { HeaderNavigation } from './HeaderNavigation';
import { HeaderSidebar } from './HeaderSidebar';
import { AuthContext } from '../../context/AuthContext';
import { FaEnvelope } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { useToggleMenu } from '../../hooks/useToggleMenu';
import { SearchBar } from '../search/SearchBar';
import { CircularProgress } from '@mui/material';
import { useChat } from '../../context/ChatContext';
import { ItemsContext } from '../../context/ItemsContext';
export const Header = () => {
  const { user, logout, loadingUser } = useContext(AuthContext);
  const { setUserItems } = useContext(ItemsContext);

  const { toggleSearch, showSearch } = useToggleSearch();
  const { showMenu, setShowMenu, toggleMenu } = useToggleMenu(false);
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  //für Benachrichtigung
  const { hasNewMessage, resetNewMessageNotification } = useChat();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10); // Sobald über 10px gescrollt wird, ändert sich die bg-Farbe
    };

    // EventListener für Scrollen
    window.addEventListener('scroll', handleScroll);

    // Cleanup-Funktion, um den EventListener zu entfernen
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = location.pathname === '/home';
  // console.log(isHomePage);

  const handleLogout = async () => {
    if (user) {
      await logout();
      setUserItems([]);
      setShowMenu(false);
      navigate('/logout');
    }
  };

  if (loadingUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress></CircularProgress>
      </div>
    );
  }

  return (
    <>
      {/* Header nur auf der Homepage am Anfang transparent, ansonsten mit bg-color */}
      <div
        className={`fixed h-32 top-0 left-0 w-full z-40 ${
          isHomePage && !isScrolled ? 'bg-transparent text-custom-text-brown' : 'bg-custom-bg-footer shadow-md'
        }`}
      >
        {/* Logo mit Link zur Homepage */}
        <div className="flex h-full w-full items-center justify-between px-[5vw] md:px-[7vw] lg:px-[9vw] text-lg bg-transparent gap-8">
          <NavLink to="/" className="cursor-pointer">
            <img src="/reshareLogo.png" alt="Logo" className="w-32 md:w-40 lg:w-48 h-auto" />
          </NavLink>

          {/* Desktop-Navigation */}
          <HeaderNavigation isHomePage={isHomePage} isScrolled={isScrolled} />

          {/* Container rechts  hier red button notification hinzugefügt */}
          <div className="flex items-center justify-center">
            {user && <div className="md:hidden text-2xl flex items-center justify-center">{user.username}</div>}

            {user && (
              <NavLink to="/chat" onClick={resetNewMessageNotification} className="relative">
                <FaEnvelope className="text-2xl ml-8" />
                {hasNewMessage && <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></span>}
              </NavLink>
            )}

            {/* Such-Icon mit Öffnen-Schließen Toggle-Funktion */}
            {showSearch ? (
              <FaTimes onClick={toggleSearch} className="text-2xl cursor-pointer ml-8" />
            ) : (
              <FaSearch onClick={toggleSearch} className="text-2xl cursor-pointer ml-8" />
            )}

            {/* Anmeldebutton oder wenn User eingeloggt ist user-icon mit Dropdown */}
            {user ? (
              <div className="md:relative md:flex md:justify-center md:items-center md:gap-2 ml-8 hidden">
                <button className="flex items-center justify-center gap-2" onClick={toggleMenu}>
                  <FaUser className="text-2xl" />
                  <div className="text-2xl flex items-center justify-center">{user.username}</div>
                </button>

                {/* Dropdown Menu */}
                {showMenu && (
                  <div className="absolute right-0 top-8 mt-2 w-48 text-lg bg-white shadow-xl border rounded-md  z-20">
                    <NavLink
                      to={`/user/items/meine-artikel`}
                      onClick={() => {
                        setShowMenu(false);
                      }}
                    >
                      {' '}
                      <div className="px-4 py-2 cursor-pointer hover:bg-custom-text-green hover:text-white">
                        Meine Artikel
                      </div>
                    </NavLink>
                    <div
                      className="px-4 py-2 cursor-pointer hover:bg-custom-text-green hover:text-white"
                      onClick={handleLogout}
                    >
                      <button>Logout</button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => {
                  navigate('/login', { state: { from: location.pathname } });
                  window.scrollTo(0.0);
                }}
                className={`text-xl text-white px-4 py-2 ml-10 rounded-md hover:bg-custom-olivegreen hidden md:flex ${
                  isHomePage && !isScrolled
                    ? 'bg-custom-text-brown hover:bg-custom-text-green'
                    : 'bg-custom-text-green hover:bg-custom-text-brown'
                }`}
              >
                <p>Anmelden</p>
              </button>
            )}

            {/* Hamburger Menu nur für mobile Ansicht */}
            <FaBars className="text-2xl cursor-pointer ml-8 md:hidden" onClick={() => setShowSideMenu(true)} />
          </div>

          {/* Sidebar nur für mobile Ansicht */}
          <HeaderSidebar
            showSideMenu={showSideMenu}
            setShowSideMenu={setShowSideMenu}
            handleLogout={handleLogout}
            user={user}
          />
        </div>

        <SearchBar isHomePage={isHomePage} isScrolled={isScrolled} />
      </div>
    </>
  );
};
