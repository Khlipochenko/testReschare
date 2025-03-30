import React, { useContext, useState } from 'react';
import { ItemsContext } from '../../context/ItemsContext';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

export const ChangeStatusItemButtons = ({ itemId, itemStatus,fetchOneItem, userId }) => {
  const { url, fetchUserItems  } = useContext(ItemsContext);

  const [status, setStatus] = useState(itemStatus);
  const navigate=useNavigate()
  const location = useLocation()
  async function handleOnClickChangeStatus(newStatus) {
    setStatus(newStatus);
    try {
      const response = await fetch(`${url}/api/items/${itemId}/status`, {
        method: 'PATCH',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });
      // if (!response.ok) {
      //   throw new Error(response.status);
      // }
      const result = await response.json();
      if (!result.success) {
        if(result.message==='No token provided'){
          navigate('/login', {state:{from: location.pathname}})
           toast.dismiss()
         return toast.error('Um einen Artikel zu bearbeiten, melde dich bitte an!')
       }
        toast.dismiss() 
       toast.error(result.message)  
      } else {
        fetchUserItems();
        if(fetchOneItem){
        fetchOneItem()}
  
        toast.success(result.message);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      {status !== 'reserviert' && (
        <button
          onClick={() => handleOnClickChangeStatus('reserviert')}
          className="shadow tracking-wider  p-2 rounded-lg bg-custom-text-brown text-white font-medium sm:hover:bg-custom-text-grey"
        >
          {' '}
          Reservieren
        </button>
      )}
      {status !== 'verschenkt' && (
        <button
          onClick={() => handleOnClickChangeStatus('verschenkt')}
          className="shadow tracking-wider p-2 rounded-lg bg-custom-text-brown text-white font-medium sm:hover:bg-custom-text-grey"
        >
          Verschenken
        </button>
      )}
      {status !== 'aktiv' && (
        <button
          onClick={() => handleOnClickChangeStatus('aktiv')}
          className="shadow p-2 rounded-lg bg-custom-text-brown text-white font-medium sm:hover:bg-custom-text-grey tracking-wider"
        >
          Aktivieren
        </button>
      )}
    </>
  );
};
