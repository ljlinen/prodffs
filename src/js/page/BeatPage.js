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

export default function BeatPage() {
  const params = useParams();

  // eslint-disable-next-line no-unused-vars
  const { selectedBeat, buyingDispatch } = useBuyingContext();

  const [beat, setBeat] = useState();
  const [isLoading, setIsLoading] = useState();
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
        }
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
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


  // eslint-disable-next-line no-unused-vars
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
          <h2 style={{textTransform: 'uppercase', maxHeight: 90}}>
            {isLoading ? 'LOADING' : beat ?  beat?.info?.title || "BEAT NOT FOUND" : null}
          </h2>
        </div>
      </header>

      <div className="beatlist-main" style={{ minHeight: "92vh" }}>
        <AudioPlayer renderCondition={isLoading} />
        <div className="beatlist">
          <Loader load={isLoading} />

          <InfoText 
            condition={!isLoading}
            h4={'download or purchase to this beat'}
            p={'take a listen to ensure you were sent to the right beat'}
          />


          { 
            beat ?
              <Beat
                id={beat.id}
                beatObj={beat}
              /> : 
            null
          }

          <CheckoutPage beatObj={selectedBeat} />
        </div>
      </div>
    </div>
  );
}
