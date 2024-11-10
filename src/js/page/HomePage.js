import React, { useEffect, useRef, useState } from "react";
import "../../css/homepage.css";
import Beat from "../component/Beat";
import iconBack from "../../asset/img/icon/chevron-left.svg";
import iconForward from "../../asset/img/icon/chevron-right.svg";
import iconMenu from "../../asset/img/icon/menu.svg";
import IconButton from "../component/IconButton";
import CheckoutPage from "../page/CheckoutPage";
import { baseUrl } from "../..";
import { useLocation } from "react-router-dom";
import AudioPlayer from "../component/AudioPlayer";
import Loader from "../elemet/Loader";
import useBeatsContext from "../hooks/useContext/useBeatsContext";
import useBuyingContext from "../hooks/useContext/useBuyingContext";
import useSideNavigator from "../hooks/useSideNavigator";
import ClickableIcon from "../elemet/ClickableIcon";
import SideNavItem from "../elemet/SideNavItem";

export default function HomePage() {
  const location = useLocation();
  const sideNavReff = useRef(null)

  const [isBuying, setIsBuying] = useState();
  const [isLoading, setIsLoading] = useState();
  const [sorter, setSorter] = useState('newest');

  const { selectedBeat, buyingDispatch } = useBuyingContext();
  const { beats, inventory, beatsDispatch } = useBeatsContext();
  const { handleSideNav, isSideNavOpen } = useSideNavigator(sideNavReff)

  useEffect(() => {

    // Load Inventory
    const home = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(baseUrl);
        if (response.ok) {
          const responseJson = await response.json();
          beatsDispatch({ type: "SET_INVENTORY", payload: responseJson });
          setIsLoading(false)
        }
      } catch (error) {
        setIsLoading(false)
        console.log("error loading homepage", error);
      }
    };

    if(location.pathname === '/'){
      beatsDispatch({ type: "CLEAR_BEATS" });
      home()      
    } 


  // eslint-disable-next-line 
  }, [location.pathname]);

  useEffect(() => {
    const fetchBeat = async(beatid) => {
      try {
          const response = await fetch(baseUrl + '/beat/' + beatid);
          if(response.ok) {
              const beatObj = await response.json();
              beatsDispatch({type: 'ADD_BEAT', payload: beatObj});

              return true;
          } else {
              throw response.statusText
          }
      } catch (error) {
          console.log('error fetching beat', error); 
      }
  }

  if(inventory?.charts?.newest?.length) {
    console.log('trying to fetch beats', inventory?.charts?.newest?.length);
    for(let item of inventory.charts.newest) {
      if(item) {
        fetchBeat(item);
      }
    }
  }

  // eslint-disable-next-line
  }, [inventory]);

  
  useEffect(() => {
    console.log('beats',beats);
  }, [beats]);


  useEffect(() => {
    setIsBuying(selectedBeat?.id ? true : false);
  }, [selectedBeat]);

  // add swiping through tabs by adding
  // an event litener to the body inide this
  // useeffect
  useEffect(() => {
    
  }, [])

  const clearBuying = () => {
    buyingDispatch({
      type: "CLEAR_BUYING",
    });

    // document.body.scrollIntoView({ scrollBehavior: 'smooth' })
  };

  return (
    <div>
      <div className="header-sidenav">
        <header>
          <nav>
            <p className="logo">ProdLinen</p>
            <ClickableIcon 
              condition={isSideNavOpen}
              classes={'menu'}
              src={iconMenu}
              alt={'menu'}
              handler={() => handleSideNav('Open')}
              />
          </nav>
          <div
            className={
              (isBuying && "beatlist-sorter beatlist-sorter-hide") ||
              "beatlist-sorter"
            }
          >
            <h2>{(isBuying && "BUY BEAT") || "SORTED BY"}</h2>
            <p className="by">
              <span>|</span>
              {(selectedBeat?.id && isBuying) || sorter}
            </p>
            <div
              className={
                (isBuying && " sorter-buttons hide") || "sorter-buttons hide-anim"
              }
            >
                            <p className={sorter === 'genre' && 'current-sorter'} onClick={() => setSorter('genre')}>genre</p>
              <p className={sorter === 'newest' && 'current-sorter'} onClick={() => setSorter('newest')}>newest</p>
              <p className={sorter === 'plays' && 'current-sorter'} onClick={() => setSorter('plays')}>plays</p>
            </div>
          </div>

          <div>
            <div className="">

            </div>
          </div>
          <Loader load={isLoading} />
        </header>
        <nav className="sidenav" ref={sideNavReff}>
          <ClickableIcon 
            condition={!isSideNavOpen}
            classes={'menu'}
            src={iconForward}
            alt={'menu'}
            handler={() => handleSideNav('Close')}
            style={{height: 15}}
          />
          <SideNavItem value={'View Cart'} handler={null} />
          <SideNavItem value={'Request'} handler={null} />
          <SideNavItem value={'Contact'} handler={null} />
        </nav>
      </div>

      <div className="beatlist-main" style={{ minHeight: "92vh" }}>
        <div className="beatlist">
          <AudioPlayer renderCondition={isBuying} />
          <div className="pages-indicator">
            <IconButton
              condition={!isBuying}
              handler={clearBuying}
              src={iconBack}
              value="Back"
            />
            <IconButton
              condition={isBuying}
              handler={null}
              src={iconForward}
              value="Next Page"
              reverse={true}
            />
          </div>

          <div className="info-text">
            <h4 style={{ textTransform: "capitalize" }}>
              take a listen to them
            </h4>
            <p style={{opacity: .6, fontWeight: 500}}>click play icon to play any beat</p>
          </div>

          {beats && beats?.length
            ? beats.map((beatObj, i) => {
              
                return (
                  <Beat
                    i={i}
                    id={beatObj.id}
                    key={beatObj.id}
                    beatObj={beatObj}
                  />
                );
              })
            : null}

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
