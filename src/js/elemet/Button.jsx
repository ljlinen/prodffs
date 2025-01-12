import React from 'react'
import '../../css/button.css'

export default function Button({condition, children, style, onclick, type}) {
  return (
    <div className={condition ? 'button' : 'button checkout-due-info-hide'}  style={style} onClick={onclick}>
    <div className='button-mask'>
      {children}
    </div>
    </div>
  )
}
