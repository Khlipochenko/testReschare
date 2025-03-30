import moment from "moment"
import 'moment/dist/locale/de'
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DeleteItemButton } from "./DeleteItemButton";
import {ChangeStatusItemButtons } from "./ChangeStatusItemButtons";
moment.locale("de");
import { FaFontAwesomeFlag } from "react-icons/fa";
export const ItemCardUser=({item, userId})=>{
  //  console.log("itemCard User", userId)
const navigate=useNavigate()

    return(
        <div className="flex justify-center text-sm md:text-sm xl:text-md   ">
      <div className="flex  relative border mt-7 p-5  shadow rounded-md bg-white flex-col w-4/5 md:w-3/5 xl:w-3/6 items-center justify-center  ">
      <span className="top-2 absolute right-2 text-xs sm:text-sm text-custom-highlight-cherryred"> Geposted {moment(item.
        createdAt).fromNow()}</span>
        <div className="flex justify-start gap-5 w-full flex-wrap md:flex-nowrap cursor-pointer  " onClick={()=>{
         window.scrollTo(0, 0) 
          navigate(`/items/${item._id}`)}}>
        <div className="mt-2 mx-auto md:mx-0  self-center overflow-hidden rounded-lg relative">       <img className=" w-full min-w-36 md:w-52 h-48  object-cover hover:scale-110 transition-transform duration-500 ease-in-out transform" src={item.images[0]} ></img>
        {item.status!=='aktiv'&&<div className="absolute top-0 right-0 left-0 w-full h-full z-10 bg-white/60
         flex justify-center items-center gap-2">  <FaFontAwesomeFlag className=" text-2xl font-bold z-50" fill="#333333" /> <span className="font-bold z-50 text-custom-text-brown tracking-wider">{item.status}</span></div>}    
        </div>
            
            
            <div className=" flex gap-2 flex-col text-sm md:text-sm xl:text-md self-start w-full">
            <div className="flex gap-4 mt-2 justify-between md:justify-start">
                <h1 className="font-bold tracking-wide"> Title: </h1>
                <span>{item.title[0].toUpperCase()+item.title.slice(1)}</span>
                </div>
                <div className="flex gap-4 justify-between md:justify-start">
                <h1 className="font-bold tracking-wide"> Kategorie: </h1>
                <span>{item.category}</span>
                </div>
                <div className="flex gap-4 justify-between md:justify-start">
                <h1 className="font-bold tracking-wide"> Subkategorie: </h1>
                <span>{item.subcategory}</span>
                </div>
                <div className="flex gap-4 justify-between md:justify-start">
                <h1 className="font-bold tracking-wide "> Größe: </h1>
                <span>{item.size}</span>
                </div>
                <div className="flex gap-4 justify-between md:justify-start">
                <h1 className="font-bold tracking-wide"> Versand: </h1>
                <span>{item.shipping}</span>
                </div>
                <div className="flex gap-4 justify-between md:justify-start">
                <h1 className="font-bold tracking-wide"> Status: </h1>
                <span>{item.status}</span>
                </div>
            
               
               
            </div>
        </div>
        <div className="mt-2 grid grid-cols-1 lg:grid-cols-[repeat(4,1fr)] md:grid-cols-2 gap-4  w-full ">
        <div className="w-full">
            <NavLink to={`/items/${item._id}/edit`} onClick={()=>window.scrollTo(0, 0)} className="shadow w-full flex justify-center items-center p-2 rounded-lg bg-custom-text-brown text-white font-medium sm:hover:bg-custom-text-grey">Bearbeiten</NavLink>
            </div> 
            <ChangeStatusItemButtons userId={userId}   itemId={item._id} itemStatus={item.status}/>
           
           <DeleteItemButton itemId={item._id} userId={userId}></DeleteItemButton>
        </div>
      </div>  </div>
    )
}
