import { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import API from '../utils/Api';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const url = import.meta.env.VITE_API_URL;

  // Beim Laden prüfen, ob ein Token existiert (Benutzer bleibt eingeloggt)
  // useEffect(() => {
  //   const token = Cookies.get('token');
  //   if (token) {
  //     fetchUserData();
  //   } else {
  //     setUser(null);
  //     setLoadingUser(false);
  //   }
  // }, []);

  const fetchUserData = async () => {
    try {
      const res = await fetch(`${url}/api/users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await res.json();
      console.log('USER DATA:', data);

      if (res.ok) {
        setUser(data.user);
      } else {
        // toast.error('login failed')
        console.log('fehler beim laden des users:', data.message);
      }
    } catch (error) {
      console.log('fehler in useAuth', error.message);
    } finally {
      setLoadingUser(false); // Stop loading after request completes
    }
  };

  useEffect(() => {
    setLoadingUser(true);

    fetchUserData();
  }, []);

  // **Login-Funktion**
  // const login = async (email, password) => {
  //   try {
  //     const response = await API.post('/api/users/login', { email, password });
  //     Cookies.set('token', response.data.token, { expires: 1, secure: true });
  //     console.log('Login erfolgreich:', response.data);
  //     await fetchUserData();
  //   } catch (error) {
  //     console.error('Login fehlgeschlagen:', error);
  //   }
  // };
  const login = async (email, password) => {
    setLoadingUser(true);
    try {
      const res = await fetch(`${url}/api/users/login`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      console.log('Login Response:', data); // Debugging

      if (!res.ok) {
        toast.dismiss();
        toast.error(data.message);
        return false;
        throw new Error(data.message || 'Login failed');
      }

      toast.success('Login successful');
      await fetchUserData();
      return true;
      //  window.location.reload(); // Refresh to trigger `useAuth`
    } catch (error) {
      toast.dismiss();
      toast.error(error.message);
    } finally {
      setLoadingUser(false);
    }
  };

  // **Google-Login**
  const googleLogin = async () => {
    try {
      await API.get('/api/users/google');
      await fetchUserData();
    } catch (error) {
      console.error('Google-Login fehlgeschlagen:', error);
    }
  };

  // **Logout-Funktion**
  const logout = async () => {
    try {
      await API.post('/api/users/logout');
      Cookies.remove('token');
      setUser(null);
    } catch (error) {
      console.error('Logout fehlgeschlagen:', error);
    }
  };

  // **Registrierung**

  const register = async (username, email, password) => {
    try {
      const res = await API.post('/api/users/register', { username, email, password });

      return true;
    } catch (error) {
      console.error('Registrierung fehlgeschlagen:', error);

      const fehler = error.response.data.message || 'Fehler bei Anmeldung';
      toast.dismiss();
      toast.error(fehler);
      return false;
    }
  };
  // **Passwort-Reset anfordern**
  const requestPasswordReset = async (email) => {
    try {
      const antwort = await API.post('/api/users/forgot-password', { email });
      // console.log('ANTWORT',antwort)
      toast.success(antwort.data.message);
      return true;
    } catch (error) {
      toast.dismiss();
      toast.error(error.response.data.message);
      console.error('Fehler beim Senden der Passwort-Reset-Mail:', error);
      return false;
    }
  };

  // **Passwort zurücksetzen**
  const resetPassword = async (token, newPassword) => {
    try {
      const response = await API.post(`/api/users/password-reset/${token}`, { newPassword });
      console.log('Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Fehler beim Zurücksetzen des Passworts:', error.response?.data || error.message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loadingUser,
        login,
        googleLogin,
        logout,
        register,
        requestPasswordReset,
        resetPassword,
        fetchUserData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
