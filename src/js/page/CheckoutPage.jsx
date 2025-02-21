<<<<<<< HEAD
import React, { useEffect, useState } from 'react'
import '../../css/beat.css'
import BeatOption from '../component/BeatOption'
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

=======
import React, { useEffect, useRef, useState } from 'react'
import '../../css/beat.css'
import BeatOption from '../component/BeatOption'
import useBuyingContext from '../hooks/useContext/useBuyingContext'
import InfoText from '../component/InfoText';
import ButtonDescriptive from '../elemet/ButtonDescriptive';
import PaymentProcessor from '../component/PaymentProcessor';
import PaymentSummary from '../component/PaymentSummary'
import useDownloadFile from '../hooks/useDownloadFile';

export default function CheckoutPage({ id, beatObj, setResetChechoutInfo, setIsLoading }) {


  const [isBuying, setIsBuying] = useState()
  const [isSafe, setsafeCheckout] = useState()
  // eslint-disable-next-line no-unused-vars
  const [checkoutInfo, setCheckoutInfo] = useState({})
  const [paymentData, setData] = useState()


  const { selectedBeat, selectedPackage, buyingDispatch } = useBuyingContext();
  // eslint-disable-next-line no-unused-vars
  const { downloadFile, isDownloading, downloadProgress, downloadError, downloadLink, setDownloadLink } = useDownloadFile(paymentData)

  const checkoutBtnRef = useRef(null)

  useEffect(() => {
    setsafeCheckout((selectedBeat?.id && selectedPackage?.package && selectedPackage?.price) ? true : false);
    setIsBuying(selectedBeat?.id ? true : false);
    setCheckoutInfo(({
      beatid: selectedBeat?.id,
      packageName: selectedPackage?.package
    }));
  }, [selectedBeat, selectedPackage])

  useEffect(() => {
    if(setResetChechoutInfo) {
      setResetChechoutInfo(() => resetChechoutInfoCheckout)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const resetChechoutInfoCheckout = () => {
    setDownloadLink(null)
  }

>>>>>>> client
  const handleClick = (e) => {
    if(!(selectedBeat?.id !== id)) return
    setBuying()
  }
  const setBuying = () => {
<<<<<<< HEAD
=======

>>>>>>> client
    buyingDispatch({
      type: "SET_BUYING",
      payload: beatObj
    })
<<<<<<< HEAD
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
=======
    checkoutBtnRef.current.scrollIntoView({scrollBehavior: 'smooth'});
  }


  return (
    <div className='buying'>
      <div className={isBuying && !downloadLink ? 'buying-view' : 'buying-view-hide'}>
        <div>
          <InfoText 
            condition={isBuying && !downloadLink}
            h4={'Choose a package'}
            p={`free package won't require payment`}
            style={{marginTop: 0, color: "rgba(var(--clr-60))"}}
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
        </div>

        <PaymentProcessor condition={isSafe && !downloadLink}
          beatid={selectedBeat?.id} 
          packageName={selectedPackage?.package} 
          price={selectedPackage?.price} 
          setPaymentData={setData}
          checkoutBtnRef={checkoutBtnRef}
          setIsLoading={setIsLoading}
          />
      </div>

      <PaymentSummary
        condition={isBuying && downloadLink}
        data={paymentData}
        price={selectedPackage?.price}
      />

      <ButtonDescriptive 
        condition={isBuying && downloadLink}
        handler={downloadFile}
        h4={'Download'}
        p={'File Ready!'}
        style={{marginTop: 20}}
      />
>>>>>>> client
    </div>
  )
}
