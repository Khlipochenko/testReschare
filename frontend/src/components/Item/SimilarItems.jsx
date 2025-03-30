import React, { useContext, useEffect, useState } from 'react';
import { ItemsContext } from '../../context/ItemsContext';
import { useLocation, useNavigate } from 'react-router-dom';

export const SimilarItems = ({ size, category, subcategory, id }) => {
  const [similarItems, setSimilarItems] = useState([]);
  const { url } = useContext(ItemsContext);
  const navigate = useNavigate();
  const location=useLocation()
  async function fetchSimilarItems() {
  

    const searchUrl = new URL(`${url}/api/items/${id}/search/`);
    searchUrl.searchParams.append('size', size);
    searchUrl.searchParams.append('category', category);
    searchUrl.searchParams.append('subcategory', subcategory);
    try {
 
      const response = await fetch(searchUrl, {
        method: 'GET'
        //  credentials: "include",)
      });
      if (!response.ok) {
        throw new Error(response.status);
      }
      const result = await response.json();

      if (result.success) {
    
        setSimilarItems(result.items);
      }
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    fetchSimilarItems();
  }, [size, category, subcategory, id]);
  return (
    similarItems &&
    similarItems.length > 0 && (
      <div className=" w-full pl-4 md:pl-0">
        <h1 className="mt-10 mb-4 sm:text-2xl font-medium text-center md:text-start ">Ähnliche Artikel</h1>
        <div className="flex flex-wrap gap-6 justify-center md:justify-start">
          {similarItems.map((item, i) => (
            <div
              className="flex flex-col gap-2    cursor-pointer "
              key={i}
              onClick={() => {
    
              navigate(`/items/${item._id}`,{state:{from: location.pathname}});
                window.scrollTo(0, 0);
                
              }}
            >
              <div className="mt-2 items-center self-center overflow-hidden rounded-lg">
                <img
                  className=" w-36 h-48 object-cover hover:scale-110 transition-transform duration-500 ease-in-out transform"
                  src={item.images[0]}
                ></img>
              </div>
              <span className="font-medium text-center">{item.title[0].toUpperCase() + item.title.slice(1)}</span>

              
            </div>
          ))}
        </div>
      </div>
    )
  );
};
