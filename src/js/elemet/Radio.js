import React from 'react'

export default function Radio({setter, setKey, setInnerKey, onchange, positiveTitle, negativeTitle}) {

      const onChange = (newValue) => {
        newValue = newValue === "true" ? true : false
        if(onchange) {   
          onchange(newValue);
        } else {
          setInnerKey ?
          setter((prev) => ({...prev, [setKey]: {...prev[setKey], [setInnerKey]: newValue}})) : 
          setter((prev) => ({...prev, [setKey]: newValue}))
        }
      }

  return (
    <div className='radios'>
        <div className='r'>
            <label>{negativeTitle || 'no'}</label>
            <input type='radio' value={false} name={setInnerKey ? setInnerKey : setKey} required onChange={(e) => onChange(e.target.value)} defaultChecked />
        </div>
        <div className='r'>
            <label>{positiveTitle || 'yes'}</label>
            <input type='radio' value={true} name={setInnerKey ? setInnerKey : setKey} required onChange={(e) => onChange(e.target.value)} />                                
        </div>
    </div>
  )
}
