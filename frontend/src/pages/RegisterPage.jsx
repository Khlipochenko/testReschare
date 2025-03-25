import React from 'react';
import RegisterForm from '../components/auth/RegisterForm'; // RegisterForm importieren
const RegisterPage = () => {
  return (
    <div className="min-h-screen pt-36 flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-custom-text-green text-center">Konto erstellen</h1>
        {/* RegisterForm hier einfügen */}
        <RegisterForm />
        <p className="text-center text-custom-text-grey">
          Bereits ein Konto?{' '}
          <a href="/login" className="text-custom-text-green hover:underline">
            Anmelden
          </a>
        </p>
      </div>
    </div>
  );
};
export default RegisterPage;
