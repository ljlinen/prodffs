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

  const handleClick = (e) => {
    if(!(selectedBeat?.id !== id)) return
    setBuying()
  }
  const setBuying = () => {
    buyingDispatch({
      type: "SET_BUYING",
      payload: beatObj
    })
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
    </div>
  )
}
