import React from 'react'

export default function ButtonDescriptive({condition, h4, p, handler, style}) {
  return (
   <div className={condition ? 'checkout-due-info' : 'checkout-due-info checkout-due-info-hide'} onClick={handler} style={style}>
   <div className='checkout-button-mask'>
     <p>{p}</p>
     <div className='info'>
       <h4>{h4}</h4>          
     </div>      
   </div>
   </div>
  )
}
