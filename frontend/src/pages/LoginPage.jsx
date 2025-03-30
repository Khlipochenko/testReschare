import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import GoogleLoginButton from '../components/auth/GoogleLoginButton';

export const LoginPage = () => {
  return (
    <div className="min-h-screen pt-36 flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-custom-text-green text-center">Anmelden</h1>
        {/* Login-Formular */}
        <LoginForm />
        {/* Google Login Button */}
        <GoogleLoginButton />
        <p className="text-center text-custom-text-grey ">
          <a href="/forgot-password" className="text-custom-text-green hover:underline">
            Passwort vergessen?
          </a>
        </p>
        <p className="text-center text-custom-text-grey">
          Kein Konto?{' '}
          <a href="/register" className="text-custom-text-green hover:underline">
            Registrieren
          </a>
        </p>
      </div>
    </div>
  );
};
export default LoginPage;
