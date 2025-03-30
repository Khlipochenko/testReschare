import { useEffect } from "react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { MdDelete } from "react-icons/md";
export const Fotos = ({ fotos, setFotos, errors, setErrors, fotosUrl='', setFotosUrl }) => {
  function handleOnChangeAddFotos(e) {
 //   console.log('fotos', fotos.length+ fotosUrl.length+e.target.files.length)
    const freePlace=6-fotos.length-fotosUrl.length
  //  console.log('freePlace',freePlace)
    if(freePlace < 0){
    
      toast.error('Mehr als 6')
      return
    }
    const newFotos = Array.from(e.target.files).slice(0, freePlace);
   // console.log("newFotos", e.target.files);
    setFotos((prev) => [...prev, ...newFotos]);
    setErrors((prev) => ({ ...prev, fotos: false }))
  }

  function handleOnClickDeleteFoto(index) {
    const newFotos = fotos.filter((image, i) => i !== index);
   
    setFotos(newFotos);
    if(newFotos.length>0){
      setErrors((prev) => ({ ...prev, fotos: false }))
    }
  
  }
  function handleOnClickDeleteFotoUrl(index){
 //   console.log('index delete', index)
    const newFotosUrl = fotosUrl.filter((image, i) => i !== index);
    setFotosUrl(newFotosUrl);
    if(newFotosUrl.length>0){
      setErrors((prev) => ({ ...prev, fotosUrl: false }))
    }
  }
  

  return (
<div className={`w-full bg-white mt-3 min-h-20 border shadow rounded flex justify-center items-center mb-6 p-4 
  ${(errors.fotos && errors.fotosUrl) ? "border-custom-highlight-cherryred" : ""}`}>

      {(fotosUrl.length+fotos.length) > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 w-full">
        {fotosUrl.length > 0 && fotosUrl.map((image, index) => (
            <div key={index} className="relative h-28 w-full border">
              <img
                alt="foto"
                className="shadow rounded w-full h-28 object-cover "
                src={image}
              />
              <button
                type="button"
                onClick={() => handleOnClickDeleteFotoUrl(index)}
                className="absolute p-1 right-1 z-10 top-1 text-custom-highlight-cherryred shadow rounded-md bg-white sm:hover:text-custom-highlight-orange sm:hover:scale-105"
              >
                <MdDelete />
              </button>
            </div>
          ))}
          {fotos.length > 0&&fotos.map((image, index) => (
            
            <div key={index} className="relative w-full">
              <img
                alt="foto"
                className="shadow rounded  h-28 w-full object-cover"
                src={URL.createObjectURL(image)}
              />
              <button
                type="button"
                onClick={() => handleOnClickDeleteFoto(index)}
                className="absolute p-1 right-1 z-10 top-1 text-custom-highlight-cherryred shadow rounded-md bg-white sm:hover:text-custom-highlight-orange sm:hover:scale-105"
              >
                <MdDelete /> 
              </button>
            </div>
          ))}
        {(fotosUrl.length+fotos.length) <6 && <label className="cursor-pointer w-10 h-10 self-center mx-auto  border p-2 flex gap-2 rounded-md justify-center items-center border-custom-text-lightgreen sm:hover:shadow " htmlFor="file">
    <span className="text-2xl">+</span> 
          <input
            className="hidden"
            type="file"
            id="file"
            name="file"
            multiple
            accept="image/*"
            onChange={(e) => handleOnChangeAddFotos(e)}
            max={7}
          />
        </label>} 
        </div>
      ) : (
        <label className="cursor-pointer  mx-6 mt-4 border p-2 flex gap-2 rounded-md justify-center items-center border-custom-text-lightgreen sm:hover:shadow tracking-wide " htmlFor="file">
   <span className="text-2xl">+</span> <span> Fotos hinzufügen</span>
          <input
            className="hidden"
            type="file"
            id="file"
            name="file"
            multiple
            accept="image/*"
            onChange={(e) => handleOnChangeAddFotos(e)}
            max={10}
          />
        </label>
      )}
    </div>
  );
  
};
