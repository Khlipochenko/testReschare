import React, { useEffect, useState } from 'react';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';
import { NavLink } from 'react-router-dom';
export const ForgotPasswordPage = () => {
  const [isLinkSent, setIsLinkSent] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0); // Scrollt nach oben
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-custom-bg-page">
      {!isLinkSent ? (
        <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold text-custom-text-green text-center">Passwort vergessen</h1>
          <ForgotPasswordForm setIsLinkSent={setIsLinkSent} /> {/* Hier wird die Form-Komponente eingebunden */}
          <p className="text-center text-custom-text-grey">
            Erinnern Sie sich wieder?{' '}
            <a href="/login" className="text-custom-text-green hover:underline">
              Anmelden
            </a>
          </p>
        </div>
      ) : (
        <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg text-center">
          <h1 className="text-3xl font-bold text-custom-text-green text-center">Bitte überprüfen Sie Ihre E-Mail</h1>
          <p>
            Ein Link zum Zurücksetzen des Passworts wurde an Ihre E-Mail-Adresse gesendet. Überprüfen Sie Ihre E-Mails
            und folgen Sie den Anweisungen.
          </p>
          <p>Falls Sie die E-Mail nicht finden, schauen Sie bitte im Spam-Ordner nach.</p>
          <button
            className="mt-4  py-2 px-4 bg-custom-text-green text-white rounded-md"
            onClick={() => setIsLinkSent(false)}
          >
            Nochmals senden
          </button>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
