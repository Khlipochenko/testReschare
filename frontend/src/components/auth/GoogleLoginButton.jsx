
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { FcGoogle } from 'react-icons/fc'; // Google-Icon von react-icons
const GoogleLoginButton = () => {
  const { googleLogin } = useContext(AuthContext); // useContext sichern
  const handleGoogleLogin = async () => {
    try {
      console.log('Starte Google-Login...'); // Debug-Log
      window.location.href = `https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?response_type=code&redirect_uri=https://testreschare-backend.onrender.com/api/users/google/callback&scope=profile email&client_id=708261018005-qd6f9ej3a5b36emggpaouumnfbsaidq3.apps.googleusercontent.com`;
    } catch (error) {
      console.error('Fehler beim Google-Login:', error);
    }
  };
  return (
    <button
      onClick={handleGoogleLogin}
      className="flex items-center justify-center w-full px-4 py-2 text-white bg-gray-700 hover:bg-gray-800 rounded-md"
    >
      <FcGoogle className="mr-2 text-2xl" />
      Mit Google anmelden
    </button>
  );
};

export default GoogleLoginButton;




































