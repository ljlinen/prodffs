import React, { useEffect, useState } from 'react'
import BooleanIcon from '../elemet/BooleanIcon';
import useBuyingContext from '../hooks/useContext/useBuyingContext';

export default function BeatOption({ condition, handler, packageObj, index, style, className}) {
  packageObj = packageObj[1];

  const { selectedPackage, buyingDispatch} = useBuyingContext();
  const [loaded, setLoaded] = useState(false)

  const handleOptionPick = () => {
    buyingDispatch({type: "SET_PACKAGE", payload: packageObj })
  }

  useEffect(() => {
    setLoaded(true)
    return () => {
      setLoaded(false)
    }
  }, [])

  return (
    <div className={loaded ? 'beat-option' : className}
      onClick={handler} 
      style={{transform: !loaded && `translateY(${10 * (index + 1)}%)`}}>
      
      <div className="title-body">
        <h4>
        {packageObj['package']}
        </h4>
        <div className='body' onClick={handleOptionPick}>
          {
            Object.entries(packageObj).map(([key, value], i) => {
              const excludedKeys = ['price', 'package']
              if(excludedKeys.includes(key)) return null
              return <div className='property-wrap' key={i}>
                <div className='key'>
                  <p>{key}</p>
                </div>
                <div className='value'>
                  {
                    typeof value === 'object' ?
                    Object.entries(value).map(([key, value], i) => {
                      return <div className='value-key-value' key={i}>
                        <div className='bolean-string'>
                          <p>{key}:</p>
                          {
                            typeof value === 'boolean' ? <BooleanIcon boolean={value} />
                            :
                            <p>{value}</p>
                          }
                        </div>
                      </div>
                    }) :
                    (typeof value === 'boolean') ? <BooleanIcon boolean={value} /> : <p>value</p>
                  }
                </div>
              </div>
            })
          }
        </div>
      </div>

        <div className='option-seletor' onClick={handleOptionPick}>
          <h4>${packageObj['price']}</h4>
          <div className={selectedPackage && selectedPackage.package === packageObj?.package ? 'checkbox checkbox-checked' : 'checkbox'} />
        </div>
    </div>
  )
}
