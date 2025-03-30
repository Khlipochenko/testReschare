
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'; // Korrekt importiert
import Cookies from 'js-cookie'; // Cookies für Reset-Token

const ForgotPasswordForm = ({setIsLinkSent}) => {
  const { requestPasswordReset } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await requestPasswordReset(email);
      if(response){
        setIsLinkSent(true)
      }
      else{
        setIsLinkSent(false)
      }
      if (response && response.token) {
        Cookies.set('reset-token', response.token, { expires: 1 });
      }
   //   alert('E-Mail für Passwort-Reset gesendet.');
    } catch (error) {
       toast.dismiss()
      toast.error('Fehler beim Senden der Passwort-Reset-Mail.');
    }
  };
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded-md p-6">
      
      <label className="block text-gray-700">E-Mail-Adresse</label>
      <input
        type="email"
        className="w-full p-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-green-700"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit" className="mt-4 py-2 px-4 bg-custom-text-green text-white rounded-md">
        Passwort-Reset anfordern
      </button>
    </form>
  );
};
export default ForgotPasswordForm;















