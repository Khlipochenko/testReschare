import { useState } from "react"
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { HiCheck } from "react-icons/hi";
export const Color=({colors, setColors, errors, setErrors})=>{
    const colorsPalette=[
        {colorcode:'#000000', name:'Schwarz'},
        {colorcode:'#663300', name:'Braun'},
        {colorcode:'#919191', name:'Grau'},
        {colorcode:'#F7E9D8', name:'Beige'},
        {colorcode:'#FF0080', name:'Pink'},
        {colorcode:'#800080', name:'Lila'},
        {colorcode:'#CC3300', name:'Rot'},
        {colorcode:'#FFF200', name:'Gelb' },
        {colorcode:'#007BC4', name:'Blau'},
        {colorcode:'#369A3D', name:'Grün' },
        {colorcode:'#FFA500', name:'Orange'},
        {colorcode:'#FFFFFF', name:'Weiß'},
        {colorcode:'conic-gradient(red, yellow, lime, aqua, blue, magenta, red)', name:'Bunt'},
    ]


    const [showColors, setShowColors]=useState(false)

   
function handleOnClickChooseColor(color){
  setErrors((prev) => ({ ...prev, colors: false }))
    setColors((prev) => { 
       
    const exists= prev.some((element)=>element.name===color.name)
    if(exists){
        return prev.filter((element)=>element.name!=color.name)
    }
        
       
        if (!prev || prev.length < 2) {
          return [...prev, { colorcode: color.colorcode, name: color.name }];
        }
        return [prev[0], { colorcode: color.colorcode, name: color.name }];
      
});
}
function colorsHolder(colors){
  if( colors.length==1){
    return colors[0].name
  }
  else{
    return colors[0].name + ', '+ colors[1].name
  }
}

return(
    <>
<div className="mt-6" >

<label htmlFor="color" className="">Farbe: <span className="text-custom-highlight-cherryred">*</span></label>
<div onClick={()=>setShowColors(prev=>!prev)} className={`flex justify-between cursor-pointer items-center bg-white p-2 rounded shadow border mt-2 ${errors.colors ? "border-custom-highlight-cherryred" : ""}`}>
<input className="outline-none cursor-pointer placeholder:text-custom-text-green " id="color" name="color" placeholder={colors.length>0? colorsHolder(colors):'Wähle bis zu 2 Farben'} readOnly></input>
{showColors?<IoIosArrowUp />:<IoIosArrowDown />}
</div>
{showColors && (
          <div className="menu  border shadow-sm bg-white">
            {colorsPalette.map((color) => (
              <div
                key={color.name} 
                className="flex justify-between border-b p-2 items-center  "
                
              >
              <div className="flex items-center justify-between w-100  flex-1">
                <div className="flex  items-center gap-2">
                  <div
                    className="w-5 h-5 rounded-full border border-custom-text-lightgreen"
                    style={{ background: color.colorcode }}
                  ></div>
                  <span>{color.name}</span>
                </div>
                <span className={`w-5 h-5 rounded border cursor-pointer ${colors.some((c) => c.name === color.name) ? ' bg-custom-text-lightgreen' : ''}`}> 
                <HiCheck  fill="white" onClick={ (e)=>handleOnClickChooseColor(color,e)}/>
                </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};