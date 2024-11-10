import React, { useEffect, useState } from "react";
import "../../css/homepage.css";
import "../../css/beatpage.css";
import Beat from "../component/Beat";
import CheckoutPage from "./CheckoutPage";
import { baseUrl } from "../..";
import { useParams } from "react-router-dom";
import Loader from "../elemet/Loader";
import useBuyingContext from "../hooks/useContext/useBuyingContext";

export default function BeatPage() {
  const params = useParams();

  const { selectedBeat, buyingDispatch } = useBuyingContext();

  const [beat, setBeat] = useState();
  const [isLoading, setIsLoading] = useState();
  const [sorter, setSorter] = useState();

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


          { 
            beat ?
              <Beat
                id={beat.id}
                beatObj={beat}
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
    </div>
  );
}
