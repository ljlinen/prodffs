import React from 'react'

export default function Footer() {
   const year = new Date().getFullYear()

  return ( 
      <footer  style={{display: 'none'}}>
      <h6>ProdFFS Copyright</h6>
      <p>built by linen</p>
      <p>{year}</p>
      </footer>
  )
}
