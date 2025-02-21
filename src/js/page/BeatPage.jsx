import React, { useEffect, useState } from "react";
import "../../css/homepage.css";
import "../../css/beatpage.css";
import Beat from "../component/Beat";
import CheckoutPage from "./CheckoutPage";
import { baseUrl } from "../..";
import { useParams } from "react-router-dom";
import Loader from "../elemet/Loader";
import useBuyingContext from "../hooks/useContext/useBuyingContext";
<<<<<<< HEAD
=======
import InfoText from "../component/InfoText";
import AudioPlayer from "../component/AudioPlayer";
import ButtonDescriptive from "../elemet/ButtonDescriptive";
import useBeatsContext from "../hooks/useContext/useBeatsContext";
import Footer from "../component/Footer";
// import Visualizer from "../component/Visualizer";
>>>>>>> client

export default function BeatPage() {
  const params = useParams();

<<<<<<< HEAD
  const { selectedBeat, buyingDispatch } = useBuyingContext();

  const [beat, setBeat] = useState();
  const [isLoading, setIsLoading] = useState();
  const [sorter, setSorter] = useState();
=======
  const { selectedBeat } = useBuyingContext();
  const { beats, beatsDispatch } = useBeatsContext();

  const [beat, setBeat] = useState();
  const [isLoading, setIsLoading] = useState();
  const [requestStatusText, setStatusText] = useState()
  // const [sorter, setSorter] = useState();
>>>>>>> client


  useEffect(() => {

    // Load Inventory
    const beat = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(baseUrl + '/beat/' + params['beatid']);
        if (response.ok) {
          const responseJson = await response.json();
          setBeat(responseJson);
<<<<<<< HEAD
=======
          beatsDispatch({type: 'ADD_BEAT', payload: responseJson})
        } else {
          setStatusText(response.statusText);
>>>>>>> client
        }
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
<<<<<<< HEAD
=======
        setStatusText(error.message);
>>>>>>> client
        console.log("error loading beatpage", error);
      }
    };

    if(params?.beatid){
      beat()      
    } 

  // eslint-disable-next-line 
  }, [params]);


  // add swiping through tabs by adding
  // an event litener to the body inide this
  // useeffect
  useEffect(() => {
    
<<<<<<< HEAD
  }, [])


=======
  }, [beats])


  // eslint-disable-next-line no-unused-vars
>>>>>>> client
  const clearBuying = () => {

    // document.body.scrollIntoView({ scrollBehavior: 'smooth' })
  };

  return (
    <div className="main-div-beatpage">
      <header>
        <nav>
<<<<<<< HEAD
          <p className="logo">ProdLinen</p>
=======
          <p className="logo">ProdFFS</p>
>>>>>>> client
          <ul>
            <li>Request beat</li>
            <li>Donate</li>
            <li>Contact</li>
          </ul>
        </nav>

        <div className="beatlist-sorter">
<<<<<<< HEAD
          <h2 style={{textTransform: 'uppercase'}}>
            {isLoading ? 'LOADING' : beat ?  beat?.info?.title || "BEAT NOT FOUND" : null}
            </h2>
          <p className="by">
            <span>|</span>
            { !sorter ? 'select a package below' : sorter + ' package' }
          </p>
          <div className="sorter-buttons hide-anim">
            {
              beat?.packages ? 
              Object.values(beat?.packages).map((packageItem, i) => {
                // if(i === 8) setSorter(packageItem?.package)    11
                return (
                  <p className={sorter === packageItem?.package && 'current-sorter'} 
                    onClick={() => setSorter(packageItem?.package)}
                    key={i + packageItem?.package}>
                    {packageItem?.package}
                  </p>
                )
              }) :
              null
            }
          </div>
        </div>
      </header>

      <div className="beatlist-main" style={{ minHeight: "92vh" }}>
        <div className="beatlist">
          <Loader load={isLoading} />

          <div className="info-text">
            <h4 style={{ textTransform: "capitalize" }}>
              take a listen to this beat
            </h4>
            <p>if you like it you can proceed to download/buy it.</p>
          </div>

=======
          <h2>
            {isLoading ? 'LOADING' : beat ?  beat?.info?.title : requestStatusText}
          </h2>
          {/* <Visualizer /> */}
        </div>
        <Loader load={isLoading} />
      </header>

      <div className="beatlist-main" style={{ minHeight: "92vh" }}>
        <AudioPlayer renderCondition={beat && !isLoading} />
        <div className="beatlist">

          <InfoText 
            condition={beat && !isLoading}
            h4={'download or purchase to this beat'}
            p={'take a listen to ensure you were sent to the right beat'}
          />
>>>>>>> client

          { 
            beat ?
              <Beat
                id={beat.id}
                beatObj={beat}
<<<<<<< HEAD
              /> : 
            null
          }
          

          <div className="page-indicator-bottom">
            <span className={(sorter === 'newest') && "circle-current"}></span>
            <span className={(sorter === 'plays') && "circle-current"}></span>
            <span className={(sorter === 'genre') && "circle-current"}></span>
          </div>

          <CheckoutPage beatObj={selectedBeat} />
        </div>
      </div>
=======
                key={beat.id}
                i={0}
              /> :
              <>
                <InfoText
                  condition={!beat && !isLoading}
                  h4={'That beat was not found or link is broken'}
                  p={'You may return to the homepage to checkout other beats'}
                  style={{marginBottom: 25}}
                />
                <ButtonDescriptive 
                  condition={!beat && !isLoading}
                  h4={'Home Page'}
                  p={'Visit'}
                  handler={() => console.log('home')}
                />
              </>
          }

          <CheckoutPage beatObj={selectedBeat} setIsLoading={setIsLoading} />
        </div>
      </div>
      <Footer />
>>>>>>> client
    </div>
  );
}
