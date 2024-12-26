import React, { useEffect, useState } from "react";
import "../../css/homepage.css";
import "../../css/beatpage.css";
import Beat from "../component/Beat";
import CheckoutPage from "./CheckoutPage";
import { baseUrl } from "../..";
import { useParams } from "react-router-dom";
import Loader from "../elemet/Loader";
import useBuyingContext from "../hooks/useContext/useBuyingContext";
import InfoText from "../component/InfoText";
import AudioPlayer from "../component/AudioPlayer";
import ButtonDescriptive from "../elemet/ButtonDescriptive";
import useBeatsContext from "../hooks/useContext/useBeatsContext";
import Footer from "../component/Footer";
// import Visualizer from "../component/Visualizer";

export default function BeatPage() {
  const params = useParams();

  const { selectedBeat } = useBuyingContext();
  const { beats, beatsDispatch } = useBeatsContext();

  const [beat, setBeat] = useState();
  const [isLoading, setIsLoading] = useState();
  const [requestStatusText, setStatusText] = useState()
  // const [sorter, setSorter] = useState();


  useEffect(() => {

    // Load Inventory
    const beat = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(baseUrl + '/beat/' + params['beatid']);
        if (response.ok) {
          const responseJson = await response.json();
          setBeat(responseJson);
          beatsDispatch({type: 'ADD_BEAT', payload: responseJson})
        } else {
          setStatusText(response.statusText);
        }
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        setStatusText(error.message);
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
    
  }, [beats])


  // eslint-disable-next-line no-unused-vars
  const clearBuying = () => {

    // document.body.scrollIntoView({ scrollBehavior: 'smooth' })
  };

  return (
    <div className="main-div-beatpage">
      <header>
        <nav>
          <p className="logo">ProdFFS</p>
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
      </header>

      <div className="beatlist-main" style={{ minHeight: "92vh" }}>
        <AudioPlayer renderCondition={beat && !isLoading} />
        <div className="beatlist">
          <Loader load={isLoading} />

          <InfoText 
            condition={beat && !isLoading}
            h4={'download or purchase to this beat'}
            p={'take a listen to ensure you were sent to the right beat'}
          />

          { 
            beat ?
              <Beat
                id={beat.id}
                beatObj={beat}
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

          <CheckoutPage beatObj={selectedBeat} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
