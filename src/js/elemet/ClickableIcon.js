import React from 'react'

export default function ClickableIcon({condition, classes, src, alt, handler, style}) {
   return (
      <div onClick={handler} >
         <img className={condition ? classes + ' icon-big hide' : classes + ' icon-big hide-anim'}
            src={src} 
            alt={alt}
            style={style}
         />
      </div>
   )
}
