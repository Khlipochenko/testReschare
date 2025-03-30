import { useEffect, useState } from "react";
import {
  HiOutlineArrowSmRight,

} from "react-icons/hi";
import ImageGallery from "react-image-gallery";
import "./OneItem.css";
import "react-image-gallery/styles/css/image-gallery.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaFontAwesomeFlag } from "react-icons/fa";
import { ChangeStatusItemButtons } from "../ChangeStatusItemButtons";
import { DeleteItemButton } from "../DeleteItemButton";
import { ChatStartButton } from "../../chat/ChatStartButton";
// const item = {
//     title,
//     description,
//     categoryActiv,
//     subcategory,
//     size,
//     fotos,
//     ort,
//     colors,
// shipping
//   };
export const OneItem = ({ item, showButton=false , isMyItem=false, fetchOneItem=false }) => {

  const [imageUrls, setImageUrls] = useState([]);
 const navigate = useNavigate();
  const location=useLocation()
  const from = location.state?.from || "/";
  useEffect(() => {
    const urls = [];
    if (item.fotosUrl) {
      item.fotosUrl.forEach((foto) => {
        const url = foto;
        urls.push({ original: url, thumbnail: url });
      });
    }
    if(item.fotos){
    item.fotos.forEach((foto) => {
      const url = URL.createObjectURL(foto);
      urls.push({ original: url, thumbnail: url })
    })};

    setImageUrls(urls);
  //  console.log(urls);
    return () => {
      // Cleanup the object URLs when component unmounts
      urls.forEach((url) => URL.revokeObjectURL(url.original));
    };
  }, [item.fotos, item._id]);
  return (
    <div className="xl:flex   gap-10 justify-between items-center mx-6 text-xs md:text-sm   "> 
     {item.status==='aktiv'?
     <div className="w-full flex justify-center">
     <div className="flex justify-center w-2/3 ">
   <ImageGallery
       
        items={imageUrls}
        showPlayButton={false}
        showFullscreenButton={true}
        
      /></div> </div>:
    imageUrls.length > 0 &&<div className="relative flex justify-center  "> <img className=" w-96 rounded-md" src={imageUrls[0].original} ></img>
    {item.status!=='aktiv'&&<div className="absolute top-0 right-0 left-0 w-full h-full z-10 bg-white/60
         flex justify-center items-center gap-2">  <FaFontAwesomeFlag className=" text-2xl font-bold z-50" fill="#333333" /> <span className="font-bold z-50 text-custom-text-brown tracking-wider ">{item.status}</span></div>} 
    </div>}
  
      <div className="self-start  sm:w-2/3  mx-auto">
      <div className="flex justify-between items-center  pt-2">
        <p className=" font-medium text-sm md:text-sm xl:text-xl">
          {item.title[0].toUpperCase() + item.title.slice(1)}
        
        </p>  { item.status!='aktiv'&& <span className="text-sm md:text-sm xl:text-xl  text-custom-highlight-cherryred"> { item.status}</span>}</div>
        <hr className="mt-2 border-t-2 border-custom-text-lightgreen"></hr>
        <div className="flex justify-between mt-4  ">
          <span>Kategorie:</span>
          <p className="flex items-center">
            {item.categoryActiv} <HiOutlineArrowSmRight /> {item.subcategory}
          </p>
        </div>
        {/*Große*/}
        <div className="flex justify-between mt-2 md:mt-4 ">
          <span>Größe:</span>
          <p>{item.size}</p>
        </div>
        {/*Farbe*/}
        <div className="flex justify-between mt-2 md:mt-4 ">
          <span>Farbe:</span>
          <div className="flex gap-4">
            {item.colors.map((color, i) => (
              <div
                className="border
                 w-5 h-5 rounded "
                style={{ background: color.colorcode }}
                key={i}
              ></div>
            ))}
          </div>
        </div>
        {/* Versand */}
        <div className="flex justify-between mt-2 md:mt-4 ">
          <span>Versand:</span>
          <p>{item.shipping}</p>
        </div>
       {/* Ort */}
      <div className="flex justify-between mt-2 md:mt-4 ">
          <span>Ort:</span>
        <p> {item.ort.city&&<span>{item.ort.city}, </span>}
          <span>{item.ort.country}</span></p> 
        </div>
        {/* Beschreibung */}
        <div className="flex gap-4 mt-2 md:mt-4 justify-between flex-wrap ">
          <span>Beschreibung:</span>
          <p className="text-end">{item.description}</p>
        </div>

       
        {showButton?
       !isMyItem?
        <div className="flex flex-col sm:flex-row gap-4  " >
       
       { item.status=='aktiv'?
     
      <ChatStartButton  itemId={item._id}></ChatStartButton> 
    
       : null}
        <button onClick={()=>{ navigate(-1)
        window.scrollTo(0, 0)}} className=" sm:mt-4 px-4 py-2 bg-custom-text-brown text-white rounded-md inline-block sm:hover:bg-custom-text-grey tracking-wider">Zurück</button>
        </div>
        :
        <div className=" grid mt-8 grid-cols-1 lg:grid-cols-[repeat(5,1fr)] md:grid-cols-2 gap-2   ">
        <div className=" ">
            <NavLink to={`/items/${item._id}/edit`} className="shadow w-full flex justify-center items-center p-2 rounded-lg bg-custom-text-brown text-white font-medium sm:hover:bg-custom-text-grey">Bearbeiten</NavLink>
            </div> 
            <ChangeStatusItemButtons fetchOneItem={fetchOneItem}   itemId={item._id} itemStatus={item.status} />
           
           <DeleteItemButton itemId={item._id} fetchOneItem={fetchOneItem}   ></DeleteItemButton>
           <button onClick={()=>{
            window.scrollTo(0, 0)
            navigate(-1)
        //  navigate(from, { replace: true } )
        }} className="px-4 py-2 bg-custom-text-brown text-white rounded-md inline-block sm:hover:bg-custom-text-grey tracking-wider">Zurück</button>
        </div>
        
        : null}
      
      </div>
  
    </div>
  );
};
