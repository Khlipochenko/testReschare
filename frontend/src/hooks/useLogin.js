import { useState } from 'react';

export const useLogin = () => {
  const [user, setUser] = useState(null);
  const login = async ({ email, password }) => {
    try {
      const res = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) throw new Error('Login failed');
      const data = await res.json();

      localStorage.setItem('token', data.token);

      setUser(data.user);
      toast.success('Anmeldung erfolgreich');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return { user, login };
};
