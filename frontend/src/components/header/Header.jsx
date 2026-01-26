import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
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
import { SearchContext } from '../../context/SearchContext';

export const Header = () => {
  const { user, logout, loadingUser } = useContext(AuthContext);
  const { setUserItems } = useContext(ItemsContext);
  const { showSearch, setShowSearch, setSearchTerm, setLocalSearchTerm } = useContext(SearchContext);
  const { showMenu, setShowMenu, toggleMenu } = useToggleMenu(false);
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { hasNewMessage, resetNewMessageNotification } = useChat(); //für Benachrichtigung

  // UseEffect, damit auf Homepage zu Beginn Header nicht sichtbar ist
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10); // Sobald über 10px gescrollt wird, ändert sich die bg-Farbe
    };
    // EventListener für Scrollen
    window.addEventListener('scroll', handleScroll);
    // Cleanup-Funktion, um den EventListener zu entfernen
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // Prüfen, ob es homepage ist
  const isHomePage = location.pathname === '/home';

  //Funktion, um Searchbar zu öffnen und zu schließen
  const toggleSearchBar = () => {
    if (showSearch) {
      setShowSearch(false); // Suche schließen
      setLocalSearchTerm(''); // Lokalen Suchbegriff zurücksetzen
      setSearchTerm(''); // Globalen Suchbegriff zurücksetzen
    } else {
      setShowSearch(true);
    }
  };

  const handleLogout = async () => {
    if (user) {
      await logout();
      setUserItems([]);
      setShowMenu(false);
      setShowSideMenu(false);
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
        <div className="flex h-full w-full items-center justify-between px-[5vw]  text-lg bg-transparent gap-8">
          <div>
            {' '}
            <NavLink to="/" className="cursor-pointer">
              <img src="/reshareLogo.png" alt="Logo" className="w-32 lg:w-44 min-w-32 mr-8" />
            </NavLink>
          </div>

          {/* Desktop-Navigation */}
          <div className={`${isHomePage && !isScrolled ? 'hidden' : 'hidden lg:flex flex-1 justify-center'}`}>
            <HeaderNavigation isHomePage={isHomePage} isScrolled={isScrolled} />
          </div>

          {/* Container rechts  hier red button notification hinzugefügt */}
          <div className="flex items-center gap-6 lg:gap-8">
            {user && (
              <>
                {/* <div className="lg:hidden text-2xl sm:flex items-center justify-center">{user.username}</div> */}
                <NavLink to="/chat" onClick={resetNewMessageNotification} className="relative">
                  <FaEnvelope className="text-2xl" />
                  {hasNewMessage && (
                    <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                  )}
                </NavLink>
              </>
            )}

            {/* Such-Icon mit Öffnen-Schließen Toggle-Funktion */}
            {showSearch ? (
              <FaTimes onClick={toggleSearchBar} className="text-2xl cursor-pointer" />
            ) : (
              <FaSearch onClick={toggleSearchBar} className="text-2xl cursor-pointer" />
            )}

            {/* Anmeldebutton oder wenn User eingeloggt ist user-icon mit Dropdown */}
            {user ? (
              <div className="relative xl:flex justify-center items-center hidden">
                <button className="flex items-center justify-center gap-2" onClick={toggleMenu}>
                  <FaUser className="text-2xl" />
                  <div className="text-2xl flex items-center justify-center">{user.username.split(' ')[0]}</div>
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
                      <button>Abmelden</button>
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
                className={`text-xl text-white px-4 py-2 rounded-md hover:bg-custom-olivegreen hidden lg:flex  ${
                  isHomePage && !isScrolled
                    ? 'bg-custom-text-brown hover:bg-custom-text-green'
                    : 'bg-custom-text-green hover:bg-custom-text-brown'
                }`}
              >
                <p>Anmelden</p>
              </button>
            )}

            {/* Hamburger Menu nur für mobile Ansicht */}
            <FaBars
              className={`text-2xl cursor-pointer ${user ? 'xl:hidden' : 'lg:hidden'}`}
              onClick={() => setShowSideMenu(true)}
            />
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
