import React from 'react'
import InfoText from '../component/InfoText'
import useGoToHomePage from '../hooks/useGoToHomePage'
import ButtonDescriptive from '../elemet/ButtonDescriptive'

export default function Error({page, handler}) {
  const VisitHome = useGoToHomePage()
  return (
    <div className='error'>
      <InfoText 
      condition={page ? true : false}
      h4={'Error accessing ' + page}
      p={'something went wrong.'} />

      <ButtonDescriptive
        condition={true}
        h4={'Home Page'}
        p={'Visit'}
        handler={VisitHome}
      />
    </div>
  )
}
