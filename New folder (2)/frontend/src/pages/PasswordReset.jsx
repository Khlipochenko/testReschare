import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ResetPasswordForm from '../components/auth/ResetPasswordForm';

const PasswordReset = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scrollt nach oben
  }, []);
  const { token } = useParams(); // Token aus der URL holen
  return (
    <div className="min-h-screen flex items-center justify-center bg-custom-bg-page">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-custom-text-green text-center">Neues Passwort festlegen</h1>
        <ResetPasswordForm token={token} /> {/* Token übergeben */}
      </div>
    </div>
  );
};
export default PasswordReset;
