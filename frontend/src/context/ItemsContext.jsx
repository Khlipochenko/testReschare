import { createContext, useState, useEffect } from 'react';

export const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
  const url = import.meta.env.VITE_API_URL;

  const [items, setItems] = useState([]);
  const [userItems, setUserItems] = useState([]); // ist hier userItems oder items gemeint?
const [loadingUserItems, setLoadingUserItems]=useState(true)
  const fetchUserItems = async () => {
    setLoadingUserItems(true);
    try {
      const response = await fetch(`${url}/api/items/user/items/meine-artikel`, {
        method: 'GET',
        credentials: 'include'
      });
      // if (!response.ok) {
      //   setUserItems([]);
      //   throw new Error(response.status);
      // }
      const result = await response.json();
      //  console.log(result);
      if (result) {
        setUserItems(result.items);
      } else {
        setUserItems([]);
      }
     
    } catch (e) {
      console.log(e);
      
    }finally {
      setLoadingUserItems(false); // <-- Устанавливаем false после загрузки
    }
  };

  // Ming: API call für die Kategorieseiten
  // useEffect(() => {
  //   const fetchItems = async () => {
  //     try {
  //       const response = await fetch(`${url}/api/items`);
  //       if (!response.ok) {
  //         throw new Error('Fehler beim Laden der Daten.');
  //       }
  //       const data = await response.json();
  //       // console.log('Geladene Daten:', data);
  //       setItems(data);
  //       console.log(data);
  //     } catch (error) {
  //       console.error('Fehler beim Laden der Items:', error);
  //     }
  //   };
  //   fetchItems();
  // }, []);

  return (
    <ItemsContext.Provider
      value={{
        items,
        setItems,
        userItems,
        setUserItems,
        fetchUserItems,
        url,
        loadingUserItems
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};
