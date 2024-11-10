import React, { useEffect, useState } from 'react'
import '../../css/beat.css'
import BeatOption from '../component/BeatOption'
import Paystack from '@paystack/inline-js';
import { baseUrl } from '../..'
import useBuyingContext from '../hooks/useContext/useBuyingContext'

export default function CheckoutPage({ id, beatObj }) {
  

  const { selectedBeat, selectedPackage, buyingDispatch } = useBuyingContext();
  const [isBuying, setIsBuying] = useState()
  const [isSafe, setsafeCheckout] = useState()

  useEffect(() => {
    setsafeCheckout((selectedBeat && selectedPackage) ? true : false);
    setIsBuying(selectedBeat?.id ? true : false)
  }, [selectedBeat, selectedPackage])

  const handleClick = (e) => {
    if(!(selectedBeat?.id !== id)) return
    setBuying()
  }
  const setBuying = () => {
    buyingDispatch({
      type: "SET_BUYING",
      payload: beatObj
    })
  }

  const handlePop = (access_code) => {
    const popup = new Paystack()
    const transaction = popup.resumeTransaction(access_code);

    let wait = true 
    while(wait) {
      const status = transaction.getStatus

        setTimeout(() => {
          console.log(status);
        }, 2000)

      if(status) {
        wait = false
      }
    }
  }

  const handlePaymentInit = async() => {

    try {
        console.log(selectedPackage)
        if(!selectedPackage?.package || !selectedBeat?.id) throw Error('infomation about the beat is missing.')

        const paymentBody = JSON.stringify({
        checkoutInfo: {
          beatid: selectedBeat?.id,
          packageName: selectedPackage?.package
        },
        userInfo: {
          'name': 'Sipho',
          'email': 'Sipho@testing.com'
        }
      })

      const response = await fetch(baseUrl + '/payment/init', {
        method: 'POST',
        body: paymentBody,
      })

      if(response.ok) {
        const { access_code } = await response.json();
        if(access_code) handlePop(access_code);
      } else {
        alert('error making payment', response.statusText)
        console.log(response.statusText);
      }
      
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <div className={isBuying ? 'buying-view buying-view-hide' : 'buying-view'}>
      <div className='beat-options'>
        <div className='beat-options-scroll'>
          { 
            (isBuying && beatObj?.packages) ?
            Object.entries(beatObj?.packages).map((item, i) => {
              return (
                <BeatOption 
                  className={'beat beat-option beat-option-hide'}
                  handler={handleClick} 
                  condition={isBuying} 
                  packageObj={item}
                  key={i}
                  index={i}
                />              
              )
            })
            :
            null
          }        
        </div>
      </div>

      <div className={isSafe ? 'checkout-due-info' : 'checkout-due-info checkout-due-info-hide'} onClick={handlePaymentInit}>
        <div className='checkout-button-mask'>
          <p>Checkout</p>
          <div className='info'>
            <h4>Due: ${selectedPackage?.price}</h4>          
          </div>        
        </div>
      </div>
    </div>
  )
}
