import React, { useEffect, useState } from 'react'
import '../../css/beat.css'
import BeatOption from '../component/BeatOption'
import Paystack from '@paystack/inline-js';
import { baseUrl } from '../..'
import useBuyingContext from '../hooks/useContext/useBuyingContext'
import InfoText from '../component/InfoText';

export default function CheckoutPage({ id, beatObj }) {

  const { selectedBeat, selectedPackage, buyingDispatch } = useBuyingContext();
  const [isBuying, setIsBuying] = useState()
  const [isSafe, setsafeCheckout] = useState()
  const [checkoutInfo, setCheckoutInfo] = useState({})
  const [downloadLink, setDownloadLink] = useState();

  useEffect(() => {
    setsafeCheckout((selectedBeat && selectedPackage) ? true : false);
    setIsBuying(selectedBeat?.id ? true : false);
    setCheckoutInfo(({
      beatid: selectedBeat?.id,
      packageName: selectedPackage?.package
    }));
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

  const verifyPayment = async(payementData) => {
    console.log(payementData);
    
    const { reference } = payementData 
    try {
      console.log(selectedPackage)
      if(!selectedPackage?.package || !selectedBeat?.id) throw Error('infomation about the beat is missing.')

      const payload = JSON.stringify({
        reference,
        checkoutInfo
    })

    const response = await fetch(baseUrl + '/payment/verify', {
      method: 'POST',
      body: payload,
    })

    const responseObj = await response.json();

    if(responseObj?.success) {
      // setCheckoutInfo(null)
      // alert('sucess! you paid: ', data?.data?.amount)
      setBuying(null)
      setDownloadLink(responseObj?.data?.downloadLink)
      console.log(responseObj?.data?.downloadLink);
      console.log('sucess: ', responseObj);
      console.log('isbuying: ', isBuying);
      
    } else {
      alert('failed! :( why tho?: ', responseObj?.data?.message)
      console.log('error verifying payment', responseObj)
    }
    } catch (error) {
      console.log('error', error)
    }
  }

  const handlePop = async(access_code) => {
    const popup = new Paystack()
    const transaction = popup.resumeTransaction(access_code);
    transaction.callbacks.onSuccess = verifyPayment;
  }

  const handlePaymentInit = async() => {

    try {
        console.log(selectedPackage)
        if(!selectedPackage?.package || !selectedBeat?.id) throw Error('infomation about the beat is missing.')

        const paymentBody = JSON.stringify({
        checkoutInfo,
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

  const downloadBeat = async() => {

    try {
      const response = await fetch(downloadLink);
      if(!response.ok) {
        const resObj = await response.json()
        alert(resObj?.message)
      }
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = selectedBeat?.info?.title; // Set your file name and extension
      link.click();
      URL.revokeObjectURL(link.href); // Clean u
      
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <div>
      <div className={isBuying && !downloadLink ? 'buying-view' : 'buying-view-hide'}>
        <InfoText 
          condition={isBuying && !downloadLink}
          h4={'Choose a package'}
          p={`free package won't require payment`}
          />
        <div className={'beat-options'}>
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
        <InfoText
          condition={isSafe && !downloadLink}
          h4={'Proceed To Payment.'}
          p={'You will pick a payment option on the pop-up screen.'}
          style={{marginTop: 0}}
        />
        <div className={isSafe && !downloadLink ? 'checkout-due-info' : 'checkout-due-info checkout-due-info-hide'} onClick={handlePaymentInit}>
          <div className='checkout-button-mask'>
            <p>Checkout</p>
            <div className='info'>
              <h4>Due: ${selectedPackage?.price}</h4>
            </div>
          </div>
        </div>
      </div>
        <div className={isBuying && downloadLink ? 'checkout-due-info' : 'checkout-due-info checkout-due-info-hide'} onClick={downloadBeat}>
          <div className='checkout-button-mask'>
            <p>File Ready!</p>
            <div className='info'>
              <h4>Download</h4>          
            </div>      
          </div>
        </div>
    </div>
  )
}
