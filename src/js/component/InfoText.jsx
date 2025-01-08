import React from 'react'

export default function InfoText({condition, h4, p, style}) {
  return (
   <div className={condition ? 'info-text hide-anim-height-trans' : 'info-text hide-height'} style={style}>
      <h4>{h4}</h4>
      <p>{p}</p>
   </div>
  )
}
