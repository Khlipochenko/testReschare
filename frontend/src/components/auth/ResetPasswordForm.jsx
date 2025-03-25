
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ResetPasswordForm = () => {
  const { resetPassword } = useContext(AuthContext);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const token = useParams().token;
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.dismiss()
      toast.error('Passwörter stimmen nicht überein!');
      return;
    }
    try {
      const response = await resetPassword(token, password);
      console.log('Reset Password Response:', response);
      if (response?.success) {
        toast.success('Passwort erfolgreich zurückgesetzt!');
        navigate('/login', { replace: true }); // Direkt navigieren
      } else {
      toast.dismiss()
        toast.error(response?.message || 'Fehler beim Zurücksetzen des Passworts!');
      }
    } catch (error) {
      console.error('Fehler beim Zurücksetzen des Passworts:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Passwort-Reset fehlgeschlagen!');
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-custom-bg-page">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg border border-gray-300">
        <h1 className="text-2xl font-bold text-custom-text-green text-center">
          Neues Passwort festlegen
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Neues Passwort"
            className="w-full p-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-green-700 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Passwort bestätigen"
            className="w-full p-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-green-700 outline-none"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-custom-text-green text-white rounded-md hover:bg-green-800 transition duration-200"
          >
            Passwort zurücksetzen
          </button>
        </form>
      </div>
    </div>
  );
};

  
export default ResetPasswordForm;





























































































