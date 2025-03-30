import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { toast } from 'react-toastify';
import { OneItem } from '../components/Item/OneItem/OneItem';
import moment from 'moment';
import { CircularProgress, useRadioGroup } from '@mui/material';
import { SimilarItems } from '../components/Item/SimilarItems';
import { ItemsContext } from '../context/ItemsContext';
import { AuthContext } from '../context/AuthContext';

moment.locale('de');
export const ItemDetailsPage = () => {
  const { id } = useParams();
  // const { user, fetchUserData } = useContext(AuthContext);
  const { user, loadingUser } = useContext(AuthContext);

  const { url } = useContext(ItemsContext);
  const [item, setItem] = useState(null);
  const [itemLoading, setItemLoading] = useState('pending');

  const [isMyItem, setIsMyItem] = useState(false);
  // const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0); // Scrollt nach oben
  }, []);

  const fetchOneItem = async () => {
    setItemLoading('pending');
    try {
      const response = await fetch(`${url}/api/items/${id}`, {
        method: 'GET',
        credentials: 'include'
      });
      // console.log(response)
      // if (!response.ok) {
      //   setLoading('loaded');

      //   throw new Error(response.status);
      // }

      const result = await response.json();

      if (result.success) {
        //   console.log("item", result.item);
        const item = {
          title: result.item.title,
          description: result.item.description,
          categoryActiv: result.item.category,
          size: result.item.size,
          fotos: false,
          fotosUrl: result.item.images,
          ort: result.item.location,
          colors: result.item.color,
          shipping: result.item.shipping,
          createdAt: result.item.createdAt,
          subcategory: result.item.subcategory,
          _id: result.item._id,
          status: result.item.status,
          userId: result.item.userId
        };

        setItem(item);

        if (user && result.item.userId === user._id) {
          setIsMyItem(true);
        } else {
          setIsMyItem(false);
        }
        setItemLoading('loaded');
      } else {
        toast.dismiss();
        toast.error(result.message);
        setItemLoading('loaded');
      }
    } catch (e) {
      console.log(e);
      setItemLoading('problem');
    }
  };

  // useEffect(() => {
  //   // const fetchData = async () => {
  //   //   // Benutzerdaten laden
  //   //   await fetchUserData();
  //   //   setUserLoading(false); // Benutzer ist jetzt geladen
  //   // };

  //   fetchData();
  // }, []);

  // Wenn der Benutzer bereits geladen wurde, den Artikel abrufen
  useEffect(() => {
    if (!loadingUser) {
      fetchOneItem();

      // Wenn die Benutzerdaten fertig geladen sind, Artikel laden
    }
  }, [loadingUser, id]);

  return (
    <>
      <div className="flex justify-center items-center pt-36 pb-11">
        <div className="w-full min-h-40 flex justify-center items-center flex-col  rounded-md mt-6 xl:w-5/6 ">
          {itemLoading === 'problem' && (
            <p
              className=" sm:text-2xl text-center  text-custom-highlight-cherryred 
        "
            >
              Fehler beim Laden des Artikels.
              <br /> Server möglicherweise nicht erreichbar.
            </p>
          )}

          {itemLoading === 'loaded' && !item && <p>Der Artikel wurde nicht gefunden</p>}
          {itemLoading === 'loaded' && item && (
            <>
              <div className="w-full border rounded-md p-4 shadow relative pt-9 mx-auto bg-white">
                <span className="top-2 absolute right-10 text-xs sm:text-sm text-custom-text-grey">
                  Geposted {moment(item.createdAt).fromNow()}
                </span>

                <OneItem item={item} showButton={true} isMyItem={isMyItem} fetchOneItem={fetchOneItem} />
              </div>

              <SimilarItems
                size={item.size}
                category={item.categoryActiv}
                subcategory={item.subcategory}
                id={item._id}
              />
            </>
          )}
          {itemLoading === 'pending' && (
            <div className="fixed inset-0 h-screen w-screen backdrop-blur-sm bg-black/30 flex flex-col justify-center items-center z-50">
              <CircularProgress />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
