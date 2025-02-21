import React from 'react'
import '../../css/loader.css'

<<<<<<< HEAD
export default function Loader({ load, style }) {
    return (
      <span className="loader" style={{width: load ? '100%' : 0, ...style}}>
=======
export default function Loader({ isLoading, style }) {
    return (
      <span className="loader" style={{height: isLoading ? '1.5px' : 0, ...style}}>
>>>>>>> client
      </span>
    )
}
