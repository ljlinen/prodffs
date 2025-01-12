import React from 'react'

export default function AddPackageSelect({ addPackage, uncreatedPackages }) {

  return (
    <div>
        <h4 style={{marginBlock: 15, textWrap: 'nowrap'}}>Add Package</h4>
        <div className='gradient-border'>
        <select className='clip' onChange={(e) => {addPackage(e.target.value)}} defaultChecked='pick a package'>
            {
            uncreatedPackages?.length ?
            uncreatedPackages.map((item, i) => {
                return <option key={i}>{item}</option>
            }) : null
            }
        </select>
        </div>                   
    </div>
  )
}
