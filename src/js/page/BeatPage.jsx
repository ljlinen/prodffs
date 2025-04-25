import React, { useEffect, useState } from "react";
import "../../css/homepage.css";
import "../../css/beatpage.css";
import Beat from "../component/Beat";
import CheckoutPage from "./CheckoutPage";
import { baseUrl } from "../..";
import { useParams } from "react-router-dom";
import Loader from "../elemet/Loader";
import useBuyingContext from "../hooks/useContext/useBuyingContext";
import AudioPlayer from "../component/AudioPlayer";
import InfoText from "../component/InfoText";
import ButtonDescriptive from "../elemet/ButtonDescriptive";
import Footer from "../component/Footer";
import useGoToHomePage from "../hooks/useGoToHomePage";
import useBeatsContext from "../hooks/useContext/useBeatsContext";

export default function BeatPage() {
  const params = useParams();

  const { selectedBeat, buyingDispatch } = useBuyingContext();
  const { beatsDispatch, beats } =  useBeatsContext()
  const VisitHome = useGoToHomePage()

  const [beat, setBeat] = useState();
  const [isLoading, setIsLoading] = useState();
  const [requestStatusText, setRequestStatusText] = useState()
  const [songLoaded, setSongLoaded] = useState()
  const [sorter, setSorter] = useState();


  useEffect(() => {

    // Load Inventory
    const beat = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(baseUrl + '/beat/' + params['beatid']);
        if (response.ok) {
          const responseJson = await response.json();
          console.log('responseJson looks like ', responseJson);
          
          beatsDispatch({ type: 'ADD_BEAT', payload: responseJson})
          setBeat(baseUrl + '/beatfile/' + responseJson?.id);
          setSongLoaded(true)
        }
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        setRequestStatusText(error.message)
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
    
  }, [])


  const clearBuying = () => {

    // document.body.scrollIntoView({ scrollBehavior: 'smooth' })
  };

  return (
    <div className="main-div-beatpage">
      <header>
        <nav>
          <p className="logo">ProdLinen</p>
          <ul>
            <li>Request beat</li>
            <li>Donate</li>
            <li>Contact</li>
          </ul>
        </nav>

        <div className="beatlist-sorter">
          <h2>
            {isLoading ? 'LOADING' : beat ?  beat?.info?.title : requestStatusText}
          </h2>
          {/* <Visualizer /> */}
        </div>
        <Loader load={isLoading} />
      </header>

      <div className="beatlist-main" style={{ minHeight: "92vh" }}>
        <AudioPlayer renderCondition={beat && !isLoading} toPlayQue={[beat]} queLoaded={songLoaded} />
        <div className="beatlist">

          <InfoText 
            condition={beats && !isLoading}
            h4={'click download icon to download or purchase this beat.'}
            p={'take a listen to ensure you were sent to the right beat'}
          />

          { 
            beats ?
              <Beat
                id={beats[0]?.id}
                beatObj={beats[0]}
                key={beats[0]?.id}
                i={0}
              /> :
              <>
                <InfoText
                  condition={!beats && !isLoading}
                  h4={'That beat was not found or link is broken'}
                  p={'You may return to the homepage to checkout other beats'}
                  style={{marginBottom: 25}}
                />
                <ButtonDescriptive
                  condition={!beats && !isLoading}
                  h4={'Home Page'}
                  p={'Visit'}
                  handler={VisitHome}
                />
              </>
          }

          <CheckoutPage beatObj={selectedBeat} setIsLoading={setIsLoading} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
