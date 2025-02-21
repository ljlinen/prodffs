import React from 'react'
import '../../css/loader.css'

export default function Loader({ isLoading, style }) {
    return (
      <span className="loader" style={{height: isLoading ? '1.5px' : 0, ...style}}>
      </span>
    )
}
