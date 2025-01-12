import React from 'react'

export default function Input({renderCondition, setter, setKey, setInnerKey, label, title, type, style, accepts, inputStyle, handler, placeholder}) {
  
  const onChange = (newValue) => {

    if(handler) {
      handler(newValue);
    } else {
      setInnerKey ?
      setter((prev) => ({...prev, [setKey]: {...prev[setKey], [setInnerKey]: newValue}})) : 
      setter((prev) => ({...prev, [setKey]: newValue}))
    }
  }

  return (
    <div className={renderCondition ? "beat-input-div hide-up-anim" : "beat-input-div hide-up-hide"} style={style}>
    <label name="beat file">{label}</label>
    {
        type === 'file' ?
        <div className="beat-input">
        <input name="beat file" type={type} accept={accepts} required onChange={(e) => onChange(e.target.files[0])}/>
        <div className="clip">
            <div className="label">
            <p>{title}</p>
            </div>
        </div>
        </div> :
        <div className="beat-input" style={inputStyle}>
            <input placeholder={placeholder} className="text-input" type={type} accept={accepts} required  onChange={(e) => onChange(e.target.value)} />
        </div>
    }
    </div>
  )
}
