import React, { useEffect, useState } from 'react'
import closeIcon from '../../asset/img/icon/close.svg';
import BooleanIcon from '../elemet/BooleanIcon';

export default function BeatPackage({ condition, removeHanlder, packageObj, index, style, className}) {
  packageObj = packageObj[1]; 

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true)
    return () => {
      setLoaded(false)
    }
  }, [])

  return (
    <form className={loaded ? 'beat-option' : className}
      style={{transform: !loaded && `translateY(${10 * (index + 1)}%)`}}>
      
      <div className="title-body">
        <div className='title'>
          <h4
            // backgroundColor: `rgba(240, 248, 255, ${index ? (index + 1) / 10 : .2})`}}
            >
          {packageObj['package']}
          </h4>
          <img className='icon' alt='delete package' src={closeIcon} onClick={() => removeHanlder(packageObj['package'])} />
        </div>

        <div className='body'>
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
                    Object.entries(value).map(([innerKey, value], i) => {
                      
                      return <div className='value-key-value' key={i}>
                        <div className='bolean-string'>
                          <p>{innerKey}:</p>
                          {
                            typeof value === 'boolean' ? <BooleanIcon boolean={value} />
                            :
                            <p>{value ? value : 'not set'}</p>
                          }
                        </div>
                      </div>
                    }) :
                    (typeof value === 'boolean') ? 
                    <BooleanIcon boolean={value} /> :
                    <p>{value ? value : 'not set'}</p>
                  }
                </div>
              </div>
            })
          }
        </div>
      </div>
        <div className='option-seletor'>
          <h4>${packageObj['price']}</h4>
        </div>
    </form>
  )
}
