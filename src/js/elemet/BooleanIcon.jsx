import React from 'react'

import wrong from '../../asset/img/icon/checklist-false.svg'
import right from '../../asset/img/icon/checklist-true.svg'


export default function BooleanIcon({ boolean, onclick }) {
  return (
    <div className='bolean-string'>
    {
        <img className='icon' onClick={onclick}
            // style={{height: !bolean && 20, width: !bolean && 20}} 
            alt='available-or-not' src={boolean ? right : wrong } />
    }
  </div>
  )
}
