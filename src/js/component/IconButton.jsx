import React from 'react'

export default function IconButton({ condition, src, handler, value, reverse, style }) {
  
  return (
    <div className={condition ? 'back-btn hide-up-anim' : 'back-btn hide-up '} 
      onClick={handler} 
      style={{flexDirection: reverse ? 'row-reverse' : 'row', ...style}}>
        {
          src ? 
          <img className="icon" src={src} alt={value} /> :
          null
        }
        <h6>{value}</h6>
    </div>
  )
}
