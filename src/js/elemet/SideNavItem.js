import React from 'react'

export default function SideNavItem({value, handler}) {
  return (
   <div className="sidenav-item" onClick={handler}>
      <h6>{value}</h6>
   </div>
  )
}
