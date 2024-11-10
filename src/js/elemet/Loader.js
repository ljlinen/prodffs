import React from 'react'
import '../../css/loader.css'

export default function Loader({ load, style }) {
    return (
      <span className="loader" style={{width: load ? '100%' : 0, ...style}}>
      </span>
    )
}
