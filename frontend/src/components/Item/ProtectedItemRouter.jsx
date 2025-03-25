import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
import { toast } from 'react-toastify';


export const ProtectedItemRouter = ({children}) => {
    const { user,loadingUser } = useContext(AuthContext)         
    const location =useLocation()
    const navigate=useNavigate()

 
    
  // Falls die Benutzerprüfung noch läuft, lade einen Spinner
  if (loadingUser) {
     return (
       <div className="flex justify-center items-center h-screen">
         <CircularProgress></CircularProgress>
       </div>
     );
  }

  // Falls kein Benutzer eingeloggt ist → zur Login-Seite weiterleiten
  if (!user) {
   
     toast.dismiss();
     toast.error('Um fortzufahren, melde dich bitte an.')
   
    return <Navigate to={'/login' } replace={true}/> 
  }

  return children;
};
