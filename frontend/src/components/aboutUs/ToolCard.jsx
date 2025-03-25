import React from 'react'

export const ToolCard = ({tool}) => {
  return (
    <div className='w-36 h-44  mx-auto'>
        <h1 className='text-center  text-custom-highlight-cherryred mt-6'>{tool.name}</h1>
        <img src={tool.img} alt={tool.name} className='w-full h-full object-contain'></img>
    </div>
  )
}
 