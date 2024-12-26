import React from 'react'
import InfoText from './InfoText';
import Input from '../elemet/Input'

export default function SideNavTabs({ sideNavTab }) {

  return (
    <div className='contact-request'>
      <InfoText 
        condition={sideNavTab ? true : false}
        h4={
            sideNavTab === 'contact' ? 
            'Contact us if you need anything.' : 
            sideNavTab === 'request' ? 
            'Make a beat/sound idea request' :
            null
          }
        p={
            sideNavTab === 'contact' ? 
            'Be sure to leave any form of contact so we can get back to you as soon as possible.' : 
            sideNavTab === 'request' ? 
            'Make us an offer, we will send you back an email if we approve or have need to negotiate.' :
            null
        }
        style={{paddingInline: 0, marginTop: 0, marginBottom: 0}}
      />

      <Input 
        renderCondition={sideNavTab ? true : false}
        title={'form of contact'}
        label={'form of contact'}
        type={'text'}
      />

      <textarea>

      </textarea>
    </div>
  )
}
