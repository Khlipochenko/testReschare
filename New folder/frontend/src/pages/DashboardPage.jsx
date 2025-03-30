
import React from 'react';
import LogoutButton from '../components/auth/LogoutButton';
import DashboardForm from '../components/auth/DashboardForm';
export const DashboardPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-custom-bg-page">
      <div className="w-full max-w-2xl p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-custom-text-green text-center">
          Willkommen bei reshare
        </h1>
        <p className="text-center text-custom-text-grey">
          Sie sind erfolgreich angemeldet. Hier sehen Sie Ihre persönlichen Inhalte.
        </p>
        {/* Hier wird DashboardForm eingefügt */}
        <DashboardForm />
        <div className="flex justify-center space-x-4">
          <a href="/profile" className="py-2 px-4 bg-custom-text-green text-white rounded-md hover:bg-green-700">
            Profil ansehen
          </a>
          <LogoutButton /> {/* Logout-Button bleibt */}
        </div>
      </div>
    </div>
  );
};
export default DashboardPage;




























