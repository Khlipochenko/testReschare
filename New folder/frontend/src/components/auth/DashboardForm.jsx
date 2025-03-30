
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'; // AuthContext importieren
const DashboardForm = () => {
  const { user } = useContext(AuthContext); // Nutzer aus Context holen
  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-md p-6">
      <h2 className="text-xl font-semibold text-custom-text-green">Willkommen bei reshare</h2>
      {user ? (
        <div>
          <p className="text-gray-700">Eingeloggt als: <strong>{user.username}</strong></p>
          <p className="text-gray-700">E-Mail: {user.email}</p>
        </div>
      ) : (
        <p className="text-gray-700">Keine Benutzerdaten verfügbar.</p>
      )}
    </div>
  );
};
export default DashboardForm;









