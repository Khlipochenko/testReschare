import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
const LoginForm = () => {
  const location=useLocation()
  let from = location.state?.from || ("/");
  const restrictedPaths = ['/logout', '/login','/forgot-password','/password-reset'];

  if (restrictedPaths.some(path => from.startsWith(path))) { 
    from = '/';
  }
  if (from.endsWith('/edit')) { 
    from = '/';
  }
 // console.log('from in login button:',from)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  const antwort=  await login(email, password);
if(antwort){
    navigate(from, { replace: true });}
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
      {/* Unsichtbares Dummy-Input zur Verhinderung der Autovervollständigung */}
      <input type="text" name="hiddenField" autoComplete="off" style={{ display: 'none' }} />
      <div>
        <label className="block text-custom-text-green">E-Mail</label>
        <input
          type="email"
          name="email"
          placeholder="E-Mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          className="w-full p-2 border rounded-md border-gray-300"
        />
      </div>
      <div>
        <label className="block text-custom-text-green">Passwort</label>
        <input
          type="password"
          name="new-password"
          placeholder="Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          autoCorrect="off"
          spellCheck="false"
          className="w-full p-2 border rounded-md border-gray-300"
        />
      </div>
      <button type="submit" className="w-full py-2 px-4 bg-custom-text-green text-white rounded-md">
        Anmelden
      </button>
    </form>
  );
};
export default LoginForm;
