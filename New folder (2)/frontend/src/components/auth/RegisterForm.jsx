import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import für Navigation
import { AuthContext } from '../../context/AuthContext'; // AuthContext importieren
import { toast } from 'react-toastify';
const RegisterForm = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate(); // Navigation-Function
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     const antwort= await register(formData.username, formData.email, formData.password);
   // console.log(antwort)
     if(antwort){
     toast.success('Registrierung erfolgreich!');
      navigate('/login');} // Weiterleitung zur Login-Seite nach erfolgreicher Registrierung
    } catch (error) {
      console.error('Registrierung fehlgeschlagen:', error);
       toast.dismiss()
      toast.error('Registrierung fehlgeschlagen');
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block text-custom-text-green">Benutzername</label>
      <input
        type="text"
        name="username"
        className="w-full p-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-green-700"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <label className="block text-custom-text-green">E-Mail</label>
      <input
        type="email"
        name="email"
        className="w-full p-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-green-700"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <label className="block text-custom-text-green">Passwort</label>
      <input
        type="password"
        name="password"
        className="w-full p-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-green-700"
        value={formData.password}
        onChange={handleChange}
        autoComplete="new-password"
        required
      />
      <button type="submit" className="w-full py-2 px-4 bg-custom-text-green text-white rounded-md">
        Registrieren
      </button>
    </form>
  );
};
export default RegisterForm;