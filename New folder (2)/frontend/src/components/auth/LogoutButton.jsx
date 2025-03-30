

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
const LogoutButton = () => {
  const { logout } = useContext(AuthContext); 
  const url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      // 1. Backend-Logout (JWT-Cookie entfernen)
      await axios.post(`${url}/api/users/logout`, {}, { withCredentials: true });
      // 2. JWT-Cookie entfernen
      Cookies.remove('token');
      // 3. Google-Logout, falls aktiv
      const googleUser = Cookies.get('googleUser');
      if (googleUser) {
      
        window.google?.accounts?.id?.disableAutoSelect();
        // Google-Token widerrufen
        window.google?.accounts?.id?.revoke(googleUser, () => {
          console.log('Google user revoked');
        });
        // Google-Cookie entfernen
        Cookies.remove('googleUser');
      }
      
      logout();
     
      localStorage.setItem('logoutMessage', 'Erfolgreich ausgeloggt! Willkommen zurück.');
      
      navigate('/login');
      console.log('Logout erfolgreich!');
    } catch (error) {
      console.error('Logout fehlgeschlagen:', error);
    }
  };
  return (
    <button
      onClick={handleLogout}
      className="py-2 px-4 bg-custom-highlight-cherryred text-white rounded"
    >
      Abmelden
    </button>
  );
};
export default LogoutButton;






























































