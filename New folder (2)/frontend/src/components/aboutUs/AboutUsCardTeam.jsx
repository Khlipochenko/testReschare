import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
export const AboutUsCardTeam = ({ person }) => {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <div className="relative w-36 mx-auto"
      onMouseLeave={() => setShowInfo(false)}
        onMouseOver={() => {
            if(!showInfo){
            setShowInfo(true)}}}>
      <h2 className="my-2 text-center font-medium tracking-wide text-sm">{person.name}</h2>
      <img
      
        src={person.image}
        alt={person.name}
        className=" rounded-lg shadow-md sm:cursor-pointer cursor-pointer w-36 h-44 overflow-hidden object-cover"
      />
       <div 
        className={`absolute left-0 right-0 mx-auto w-4/6 bg-white text-custom-text-brown gap-2 justify-center items-center rounded-lg py-2 z-10
        transition-all duration-400 ease-in-out bottom-0
        ${showInfo ? " opacity-100 -translate-y-3 " : "translate-y-0 opacity-0"}`}
      >
          <h2 className=" text-center text-xs mb-[3px]">{person.title}</h2>
          <div className="flex gap-2 justify-center">
            <a href={person.github} target="_blank" className="sm:hover:text-custom-highlight-cherryred">
              <FaGithub />
            </a>
            <a href={person.linkedin} target="_blank" className="sm:hover:text-custom-highlight-cherryred">
              <FaLinkedin />
            </a>
          </div>
        </div>
      
    </div>
  );
};
