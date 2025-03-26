import React, { useState, useEffect, useContext } from 'react'
import { NavLink, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ItemCardUser } from '../components/Item/ItemCardUser';
import { ItemsContext } from '../context/ItemsContext';
import { AuthContext } from '../context/AuthContext';
import { CircularProgress } from '@mui/material';

export const UserItemsPage = () => {

  const {url, userItems, fetchUserItems}=useContext(ItemsContext)
  const {loadingUser}=useContext(AuthContext)
 const {userId}=useParams()

  useEffect(()=>{
  
     fetchUserItems();
    


   
    },[])
  return (
    <>
     {loadingUser && (
            <div className="fixed inset-0 h-screen w-screen backdrop-blur-sm bg-black/30 flex flex-col justify-center items-center z-50 ">
              <CircularProgress />
            </div>
          )}
      {userItems.length>0?
      <div className='py-36'>
{userItems.sort((a, b) => new Date(b.
  createdAt) - new Date(a.
    createdAt)).map((item, i)=>(
  <ItemCardUser key={i} item={item} userId={userId}></ItemCardUser>
))}
      </div>
      :
      <div className='flex justify-center items-center mt-10 md:mt-28 min-h-screen '>
      <div className='flex flex-col items-center gap-4 md:gap-10 '>
    <h1 className='text-xl md:text-3xl font-medium'>Du hast noch keine Produkte zu verschenken.</h1>
    <NavLink to={'/items/new/create'} className="shadow w-3/12 text-center  p-2 rounded-lg bg-custom-text-green text-white font-medium sm:hover:bg-custom-text-brown ">Verschenken</NavLink>
</div>
</div>}
    </>
  )
}