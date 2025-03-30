
import { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa6";
export const Category = ({subcategory, errors, setSubCategory,categoryActiv, setCategoryActiv, setErrors}) => {
    const [showKategorie, setShowKategorie]=useState(false)
      const [showSubKategorie, setShowSubKategorie]=useState(false)
     const categoriesList = [
        {
          name: "Damen",
          subcategories: [
            "Shirts & Tops",
            "Pullover",
            "Hosen & Jeans",
            "Shorts",
            "Jacken & Mäntel",
            "Kleider & Röcke",
            "Nachtwäsche",
            "Bademode",
            "Anzüge & Blazer",
            "Kleiderpakete",
          ],
        },
        {
          name: "Herren",
          subcategories: [
            "Shirts & Tops",
            "Pullover",
            "Hosen & Jeans",
            "Shorts",
            "Jacken & Mäntel",
            "Nachtwäsche",
            "Bademode",
            "Anzüge & Blazer",
            "Kleiderpakete",
          ],
        },
        {
          name: "Kinder",
          subcategories: [
            "Bodies & Strampler",
            "Shirts & Tops",
            "Pullover",
            "Hosen & Jeans",
            "Shorts",
            "Kleider & Röcke",
            "Jacken & Mäntel",
            "Nachtwäsche",
            "Bademode",
            "Anzüge & Blazer",
            "Kleiderpakete",
          ],
        },
      ];
    
    
      function handleOnClickSubCategory(value){
        
        setSubCategory(value)
        
        setShowKategorie(false)
        setShowSubKategorie(false)
      }
    
  return (
    <>
    <label className='mb-2 mt-6' htmlFor='kategorie'>Kategorie: <span className="text-custom-highlight-cherryred">*</span></label>
      <div className={`flex justify-between cursor-pointer items-center bg-white p-2 rounded shadow border  ${errors.categoryActiv ? "border-custom-highlight-cherryred" : ""}`} onClick={()=>setShowKategorie((prev)=>!prev)}>
   <input className='outline-none cursor-pointer placeholder:text-custom-text-green  ' placeholder={subcategory||'Wähle eine Kategorie'} readOnly/>
   {showKategorie?<IoIosArrowUp />:<IoIosArrowDown />}</div>
   <div>
   {showKategorie &&<div className='relative  border shadow-sm '>
   {categoriesList.map((category)=>(
   <div key={category.name} className='bg-white'>
     <div className='flex justify-between cursor-pointer border-b p-2 items-center sm:hover:bg-custom-text-lightgreen ' 
     onClick={()=>{setShowSubKategorie(true)
      setErrors((prev) => ({ ...prev, categoryActiv: false }))
     setCategoryActiv(category.name)}}> <p className=''>{category.name}</p>  <IoIosArrowForward  /></div>
     {showSubKategorie && category.name===categoryActiv&&<ul className='absolute top-0  right-0 left-0 bg-white border shadow-sm z-10 '>
    <div className='flex items-center p-2  border-b '> <button className='' onClick={()=>{setShowSubKategorie(false)
    setCategoryActiv('')}}><FaArrowLeft /></button>  <h1 className='text-center flex-1 font-medium '> {category.name}</h1></div>
    {category.subcategories.map((subcategory)=>(
      <li className='cursor-pointer border-b  p-2 sm:hover:bg-custom-text-lightgreen' key={subcategory} onClick={()=>handleOnClickSubCategory(subcategory)}>{subcategory}</li>
    ))}
     </ul>}
     </div>))}
     
    </div>}
   </div>
   </>
  )
}
