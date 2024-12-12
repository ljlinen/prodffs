import React, { useEffect, useState } from "react";
import "../../css/homepage.css";
import Beat from "../component/Beat";
import iconForward from "../../asset/img/icon/chevron-right.svg";
import iconBackwards from "../../asset/img/icon/chevron-left.svg";

import IconButton from "../component/IconButton";
import CheckoutPage from "../page/CheckoutPage";
import AudioPlayer from "../component/AudioPlayer";
import useBeatsContext from "../hooks/useContext/useBeatsContext";
import useBuyingContext from "../hooks/useContext/useBuyingContext";
import HeaderHome from "../component/HeaderHome";
import useBeatPages from "../hooks/useBeatPages";
import InfoText from "../component/InfoText";

export default function HomePage() {

  const [isBuying, setIsBuying] = useState();
  const [genre, setGenre] = useState();
  const [sorter, setSorter] = useState('newest');
  const [beatsToRender, setBeatsToRender] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [resetChechoutInfoCheckout, setResetChechoutInfo] = useState(null)

  const { selectedBeat } = useBuyingContext();
  const { beats } = useBeatsContext();
  // eslint-disable-next-line no-unused-vars
  const { isLoading, isAtPageEnd, isAtDataEnd, fetchedPages } = useBeatPages(currentPage);

  useEffect(() => {
    console.log(beats);
  }, [beats])

  useEffect(() => {
    if(beats) {
      const start = (currentPage - 1) * 4
      // conditional assignment to ensure end is never greater than it should be
      // to prevent slice() from using negative items
      const end = (start + 4) < beats.length ? (start + 4) : beats.length

      let updated = [...beats]
      updated = updated.slice(start, end);
      switch (sorter) {
        case 'newest':
          updated.sort((a, b) => new Date(b.info.released) - new Date(a.info.released));
          break;
        case 'plays':
          updated.sort((a, b) => Number(b.info.plays) - Number(a.info.plays));
          break;
        case 'genre':
          updated.sort((a, b) => {
            if(a.info.genre === genre) return -1
            if(b.info.genre === genre) return 1
            return 0
          });
          break;
        default:
          updated.sort((a, b) => new Date(b.info.released) - new Date(a.info.released));
          break;
        }
      setBeatsToRender(updated)
    }
  // eslint-disable-next-line
  }, [currentPage, beats])


  useEffect(() => {
    if(beats?.length) {
      let updated = [...beatsToRender]
      switch (sorter) {
        case 'newest':
          updated.sort((a, b) => new Date(b.info.released) - new Date(a.info.released));
          break;
        case 'plays':
          updated.sort((a, b) => Number(b.info.plays) - Number(a.info.plays));
          break;
        case 'genre':
          updated.sort((a, b) => {
            if(a.info.genre === genre) return -1
            if(b.info.genre === genre) return 1
            return 0
          });
          break;
        default:
          break;
      }
      setBeatsToRender(updated);
    }
  // eslint-disable-next-line
  }, [sorter]);


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
      <div className="beatlist-main" /*style={{ minHeight: "92vh" }} */>
      <AudioPlayer renderCondition={beatsToRender && !isBuying} />
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

        <div className={beatsToRender && (!isLoading || !isBuying) ? "pages-indicator hide-anim-height-trans" : "pages-indicator hide-height"}>
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
              value="next"
              reverse={true}
            />
          </div>

          <div className={beatsToRender && (!isLoading && !isBuying) ? "page-indicator-bottom hide-anim-height-trans" : "page-indicator-bottom hide-height"}>
            <span className={(!isAtPageEnd && currentPage === 1) ? "circle-current" : "hide"}></span>
            <span className={(!isAtPageEnd && currentPage > 1) ? "circle-current" : "hide"}></span>
            <span className={(isAtPageEnd) && "circle-current"}></span>
          </div>
          
          <CheckoutPage beatObj={selectedBeat} setResetChechoutInfo={setResetChechoutInfo} />
      </div>
    </div>
  );
}
