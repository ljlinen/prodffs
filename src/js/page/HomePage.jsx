import React, { useEffect, useState } from "react";
import '../../css/media-queries.css'
import "../../css/homepage.css";
import Beat from "../component/Beat";
import iconForward from "../../asset/img/icon/chevron-right.svg";
import iconBackwards from "../../asset/img/icon/chevron-left-black.svg";
import IconButton from "../component/IconButton";
import CheckoutPage from "./CheckoutPage";
import AudioPlayer from "../component/AudioPlayer";
import useBuyingContext from "../hooks/useContext/useBuyingContext";
import HeaderHome from "../component/HeaderHome";
import useBeatPages from "../hooks/useBeatPages";
import InfoText from "../component/InfoText";
import Footer from "../component/Footer";
import useBeatsSorter from "../hooks/useBeatsSorter";

export default function HomePage() {

  const [isBuying, setIsBuying] = useState();


  const [currentPage, setCurrentPage] = useState(1);
  const [resetChechoutInfoCheckout, setResetChechoutInfo] = useState(null)
  const [genre, setGenre] = useState();
  const [sorter, setSorter] = useState('newest');
  const [toPlayQue, setToPlayQue] = useState()
  const [queLoaded, setQueLoaded] = useState()

  const { selectedBeat } = useBuyingContext();
  // eslint-disable-next-line no-unused-vars
  const { setIsLoading, isLoading, isAtPageEnd, isAtDataEnd } = useBeatPages(currentPage);
  const { beatsToRender } = useBeatsSorter(currentPage, setToPlayQue, setQueLoaded, sorter)





  useEffect(() => {
    setIsBuying(selectedBeat?.id ? true : false);
  }, [selectedBeat]);

  // add swiping through tabs by adding
  // an event litener to the body inide this
  // useeffect
  useEffect(() => {
    
  }, []);

  const navigatePage = (prevOrNext) => {
    switch (prevOrNext) {
      case 'next':
        if(!isAtDataEnd || !isAtPageEnd) setCurrentPage(currentPage + 1)
        break;
      case 'previous':
        if(currentPage > 1) setCurrentPage(currentPage - 1);
        break;
      default:
        break;
    }
  }


  return (
    <div className="homepage">
      <HeaderHome resetChechoutInfoCheckout={resetChechoutInfoCheckout} isBuying={isBuying} isLoading={isLoading} sorter={sorter} setSorter={setSorter} setGenre={setGenre} />
      <div className="beatlist-main">
      <AudioPlayer renderCondition={beatsToRender && !isBuying} queLoaded={queLoaded} toPlayQue={toPlayQue} />
          <InfoText
            condition={beatsToRender && !isBuying && !isLoading}
            h4={'Lets find you a beat you might like.'}
            p={`use the play icon or audio controls to take a listen.`}
            style={{bottomMargin: 15}}
          />

          <InfoText
            condition={isBuying}
            h4={'Download or Purchase Instrumental.'}
            p={'You can also play it to make sure.'}
            style={{marginBottom: 27}}
          />

        <div className={!isBuying ? "beatlist" : "beatlist beatlist-hide"}>

          {
            beatsToRender && beatsToRender?.length ? 
            beatsToRender.map((beatObj, i) => {
              
                return (
                    <Beat
                      i={i}
                      id={beatObj.id}
                      key={beatObj.id}
                      beatObj={beatObj}
                    />
                );
            })
            :
            <InfoText
              condition={!isLoading && !isBuying}
              h4={'No Beats Found'}
              p={`The admin seems to have not uploaded any beats yet.`}
            />
          }
        </div>

        <div className={beatsToRender && (!isLoading && !isBuying) ? "pages-indicator hide-anim-height-trans" : "pages-indicator hide-height"}>
            <IconButton
              condition={!isBuying && currentPage > 1}
              handler={() => navigatePage('previous')}
              src={iconBackwards}
              value="previous"
              reverse={false}
            />
            <IconButton
              condition={!isBuying && (!isAtDataEnd || !isAtPageEnd)}
              handler={() => navigatePage('next')}
              src={iconForward}
              value="more"
              reverse={true}
            />
        </div>

        {/* <div className={beatsToRender ? (!isLoading && !isBuying) ? "page-indicator-bottom hide-anim-height-trans" : "page-indicator-bottom hide-height" : null}>
          <span className={(!isAtPageEnd && currentPage === 1) ? "circle-current" : "hide"}></span>
          <span className={(!isAtPageEnd && currentPage > 1) ? "circle-current" : "hide"}></span>
          <span className={(isAtPageEnd) ? "circle-current" : null}></span>
        </div> */}
        
        <CheckoutPage beatObj={selectedBeat} setResetChechoutInfo={setResetChechoutInfo} setIsLoading={setIsLoading} />
      </div>
      <Footer />
    </div>
  );
}
