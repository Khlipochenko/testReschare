import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const ItemCard = ({ item }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div
      className="text-custom-text-grey cursor-pointer rounded-lg "
      onClick={() =>{ 
        window.scrollTo(0, 0)
        navigate(`/items/${item._id}`, { state: { from: location.pathname } })}}
    >
      <div className="overflow-hidden rounded-lg">
        <div className="overflow-hidden rounded-lg">
          <img
            className="w-full h-full object-cover rounded-lg hover:scale-110 transition ease-out"
            src={item.images[0]}
            alt=""
            style={{ aspectRatio: '3/4' }}
          />
        </div>
        <h3 className="pt-2 pb-3 text-lg text-center">{item.title[0].toUpperCase() + item.title.slice(1)}</h3>
      </div>
    </div>
  );
};
