import  { useState } from "react";
import { useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
export const Size = ({ category, size, setSize, errors, setErrors, new:isNew}) => {
const [showSize,setShowSize]=useState(false)
const kinderSizes = [
  "50-56 (Neugeborene)",
  "62-68 (3-6 Monate)",
  "74-80 (6-12 Monate)",
  "86-92 (1-2 Jahre)",
  "98-104 (2-4 Jahre)",
  "110-116 (4-6 Jahre)",
  "122-128 (6-8 Jahre)",
  "134-140 (8-10 Jahre)",
  "146-152 (10-12 Jahre)",
  "158-164 (12-14 Jahre)"
];

const damesSizes = [
  "32 (XS)",
  "34 (XS)",
  "36 (S)",
  "38 (M)",
  "40 (M)",
  "42 (L)",
  "44 (XL)",
  "46 (XL)",
  "48 (XXL)"
];

const herenSizes = [
  "44 (XS)",
  "46 (S)",
  "48 (M)",
  "50 (M)",
  "52 (L)",
  "54 (XL)",
  "56 (XL)",
  "58 (XXL)",
  "60 (XXL)"
];




    useEffect(() => {
      
      if(isNew){
        setSize("")}
        else if(category=='Kinder'&& !kinderSizes.includes(size)){
          setSize('')
        }
        else if(category=='Damen'&& !damesSizes.includes(size)){
          setSize('')
        }
        else if(category=='Herren'&& !herenSizes.includes(size)){
          setSize('')
        }
    }, [category]);
  return (
    <>
<label htmlFor="size" className="mt-6 mb-2">Größe wählen: <span className="text-red-500">*</span></label>
     <div className={`flex justify-between cursor-pointer items-center bg-white p-2 rounded shadow border ${errors.size ? "border-custom-highlight-cherryred" : ""}`} onClick={()=>setShowSize((prev)=>!prev)}>
   <input className='outline-none cursor-pointer placeholder:text-custom-text-green ' placeholder={size||'Wähle eine Große'} readOnly/>
   {showSize?<IoIosArrowUp />:<IoIosArrowDown />}</div>
   {showSize&&<div className='relative  border shadow-sm '>
      {category==='Damen'&&damesSizes.map((size)=>(
      <div key={size} className='bg-white'>
        <div className='flex justify-between cursor-pointer border-b p-2 items-center sm:hover:bg-custom-text-lightgreen ' onClick={()=>{setSize(size)
         setErrors((prev) => ({ ...prev, size: false }))
         setShowSize(false)}}>{size}</div></div>

   )) }
   
   {category==='Kinder'&&kinderSizes.map((size)=>(
      <div key={size} className='bg-white'>
        <div className='flex justify-between cursor-pointer border-b p-2 items-center sm:hover:bg-custom-text-lightgreen ' onClick={()=>{setSize(size)
        setErrors((prev) => ({ ...prev, size: false }))
         setShowSize(false)}}>{size}</div></div>

   )) }
   
   
   {category==='Herren'&&herenSizes.map((size)=>(
      <div key={size} className='bg-white'>
        <div className='flex justify-between cursor-pointer border-b p-2 items-center sm:hover:bg-custom-text-lightgreen ' onClick={()=>{setSize(size)
         setErrors((prev) => ({ ...prev, size: false }))
         setShowSize(false)}}>{size}</div></div>

   )) }
   
   </div>}

       {/* <label htmlFor="size" className="mt-6 mb-2">Größe wählen:</label>
      <select className="border p-2 rounded shadow outline-none "  id="size" name="size" onChange={(e) => setSize(e.target.value)}
        value={size}>
      <option value="" disabled>Wähle eine Große:</option>
        {category === "Kinder" && (
          <>
          <option value="50-56">50-56 (Neugeborene)</option>
<option value="62-68">62-68 (3-6 Monate)</option>
<option value="74-80">74-80 (6-12 Monate)</option>
<option value="86-92">86-92 (1-2 Jahre)</option>
<option value="98-104">98-104 (2-4 Jahre)</option>
<option value="110-116">110-116 (4-6 Jahre)</option>
<option value="122-128">122-128 (6-8 Jahre)</option>
<option value="134-140">134-140 (8-10 Jahre)</option>
<option value="146-152">146-152 (10-12 Jahre)</option>
<option value="158-164">158-164 (12-14 Jahre)</option>
          </>
        )}
        :
        {category === "Damen" && (
          <>
            <option value="32">32 (XS)</option>
            <option value="34">34 (XS)</option>
            <option value="36">36 (S)</option>
            <option value="38">38 (M)</option>
            <option value="40">40 (M)</option>
            <option value="42">42 (L)</option>
            <option value="44">44 (XL)</option>
            <option value="46">46 (XL)</option>
            <option value="48">48 (XXL)</option>
          </>
        )}
        {category === "Herren" && (
          <>
            <option value="44">44 (XS)</option>
            <option value="46">46 (S)</option>
            <option value="48">48 (M)</option>
            <option value="50">50 (M)</option>
            <option value="52">52 (L)</option>
            <option value="54">54 (XL)</option>
            <option value="56">56 (XL)</option>
            <option value="58">58 (XXL)</option>
            <option value="60">60 (XXL)</option>
          </>
        )} 
      </select> */}
    </>
  );
};
