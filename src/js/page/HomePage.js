import React, { useEffect, useState } from "react";
import "../../css/homepage.css";
import Beat from "../component/Beat";
import iconForward from "../../asset/img/icon/chevron-right.svg";

import IconButton from "../component/IconButton";
import CheckoutPage from "../page/CheckoutPage";
import AudioPlayer from "../component/AudioPlayer";
import useBeatsContext from "../hooks/useContext/useBeatsContext";
import useBuyingContext from "../hooks/useContext/useBuyingContext";
import HeaderHome from "../component/HeaderHome";
import useBeatPages from "../hooks/useBeatPages";

export default function HomePage() {

  const [isBuying, setIsBuying] = useState();
  const [genre, setGenre] = useState();
  const [sorter, setSorter] = useState('newest');
  const [beatsToRender, setBeatsToRender] = useState();

  const { selectedBeat } = useBuyingContext();
  const { beats } = useBeatsContext();
  // eslint-disable-next-line no-unused-vars
  const { isLoading, isAtPageEnd, page, setPage } = useBeatPages()


  useEffect(() => {
    if(beats?.length) {
      const updated = [...beats]
      console.log(beats);
      
      updated.sort((a, b) => new Date(b.info.released) - new Date(a.info.released));
      setBeatsToRender(updated)
    }
  }, [beats]);


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

  return (
    <div>
      <HeaderHome isBuying={isBuying} isLoading={isLoading} sorter={sorter} setSorter={setSorter} setGenre={setGenre} />
      <div className="beatlist-main" /*style={{ minHeight: "92vh" }} */>
        <div className="beatlist">
          <AudioPlayer renderCondition={isBuying} />
          <div className="pages-indicator">
            <IconButton
              condition={isBuying}
              handler={null}
              src={iconForward}
              value="Next Page"
              reverse={true}
            />
          </div>

          {
            beatsToRender && beatsToRender?.length ? 
            beatsToRender.map((beatObj, i) => {
              
                return (
                  <>
                    {
                      (i === 0) &&
                      <div className="info-text" key={i}>
                        <h4 style={{ textTransform: "capitalize" }}>
                          take a listen to them
                        </h4>
                        <p style={{opacity: .6, fontWeight: 500}}>click play icon to play any beat</p>
                      </div>
                    }
                    <Beat
                      i={i}
                      id={beatObj.id}
                      key={beatObj.id}
                      beatObj={beatObj}
                    />
                  </>
                );
            })
            :
            <div className="info-text">
              <h4 style={{ textTransform: "capitalize" }}>
                no beats found
              </h4>
              <p style={{opacity: .6, fontWeight: 500}}>The admin seems to have not uploaded any beats yet.</p>
            </div>
          }

          <div className={!isBuying ? "page-indicator-bottom hide-anim" : "page-indicator-bottom hide"}>
            <span className={(!isAtPageEnd && page === 1) ? "circle-current" : "hide"}></span>
            <span className={(!isAtPageEnd && page > 1) ? "circle-current" : "hide"}></span>
            <span className={(isAtPageEnd) && "circle-current"}></span>
          </div>

          <CheckoutPage beatObj={selectedBeat} />
        </div>
      </div>
    </div>
  );
}
