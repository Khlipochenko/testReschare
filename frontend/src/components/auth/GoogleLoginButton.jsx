
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { FcGoogle } from 'react-icons/fc'; // Google-Icon von react-icons
const GoogleLoginButton = () => {
  const { googleLogin } = useContext(AuthContext); // useContext sichern
  const handleGoogleLogin = async () => {
    try {
      console.log('Starte Google-Login...'); // Debug-Log
      window.location.href = `${import.meta.env.VITE_API_URL}/api/users/google`;
    } catch (error) {
      console.error('Fehler beim Google-Login:', error);
    }
  };
  return (<></>
  //  <button
 //     onClick={handleGoogleLogin}
  //    className="flex items-center justify-center w-full px-4 py-2 text-white bg-gray-700 hover:bg-gray-800 rounded-md"
 //   >
 //     <FcGoogle className="mr-2 text-2xl" />
  //    Mit Google anmelden
 //   </button>
  );
};
export default GoogleLoginButton;



































