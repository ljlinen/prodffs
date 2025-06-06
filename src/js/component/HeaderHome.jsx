import React, { useEffect, useRef, useState } from 'react'
import Loader from '../elemet/Loader'
import ClickableIcon from '../elemet/ClickableIcon'
import SideNavItem from '../elemet/SideNavItem'
// import iconMenu from "../../asset/img/icon/menu.svg";
import iconForward from "../../asset/img/icon/chevron-right.svg";
import iconBack from "../../asset/img/icon/chevron-left.svg";
import headerImage from "../../asset/img/photo/FFSComp.png";
import useSideNavigator from '../hooks/useSideNavigator';
import useBuyingContext from '../hooks/useContext/useBuyingContext';
import IconButton from './IconButton';
// import SideNavTabs from './SideNavTabs';

export default function HeaderHome({sorter, setSorter, resetChechoutInfoCheckout, isBuying, isLoading, setGenre}) {
   
   const sideNavReff = useRef(null)

   const { handleSideNav, isSideNavOpen, handleSideNavTabs, sideNavTab } = useSideNavigator(sideNavReff);
   const { buyingDispatch } = useBuyingContext();
   // eslint-disable-next-line no-unused-vars
   const [showNav, setShowNav] = useState();


  useEffect(() => {

    const handleScroll = () => {
      window.scrollY > 5 ? setShowNav(true) : setShowNav(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


   const resetChechoutInfoHeader = () => {
      if(resetChechoutInfoCheckout) resetChechoutInfoCheckout()
      if(!resetChechoutInfoCheckout) console.log('resetcheckout is falsy', resetChechoutInfoCheckout);
      buyingDispatch({type: "CLEAR_BUYING"});
      // document.body.scrollIntoView({ scrollBehavior: 'smooth' })
   };


   return (
      <div className="header-sidenav">
         <header>
            <img className='background-img' alt='background' src={headerImage} />
            <nav>
            <IconButton
              condition={true}
              handler={isBuying ? resetChechoutInfoHeader : null}
              src={isBuying ? iconBack : null}
              value={isBuying ? "Back" : "ProdFFS"}
              style={{display: 'flex'}}
            />
               {/* <ClickableIcon 
                  condition={isSideNavOpen}
                  classes={'menu'}
                  src={iconMenu}
                  alt={'menu'}
                  handler={() => handleSideNav('Open')}
               /> */}
            </nav>
            <div className={`beatlist-sorter ${isBuying ? 'beatlist-sorter-hide' : null} ${sideNavTab ? 'beatlist-sorter-sidenav' : null }`}>
               <div className={!sideNavTab ? "intro hide-width-anim" : 'intro hide-width'}>
                  <h2>{isLoading ? "LOADING" : "BUY BEATS. ELEVATE YOUR SOUND."}</h2>
                  <p>{!isLoading && 'got a sound idea? we also take beat requests.'}</p>
               </div>
               <div className={isLoading || isSideNavOpen ? "sorter hide-width" : "sorter hide-width-anim"}>
                  <p className="by">
                     SORT BY
                  </p>
                  <div className={isBuying ? "sorter-buttons hide" : "sorter-buttons hide-anim"}>
                     <p className={sorter === 'newest' ? 'current-sorter' : null} onClick={() => setSorter('newest')}>newest</p>
                     <p className={sorter === 'plays' ? 'current-sorter' : null} onClick={() => setSorter('plays')}>plays</p>
                     <div>
                        <p className={sorter === 'genre' ? 'current-sorter' : null} style={{position: 'absolute'}}>Genre</p>
                        <select onChange={(e) => setGenre(e.target.value)}  onClick={() => setSorter('genre')} style={{position: 'relative', opacity: 0, width: '100%', height: '100%'}}>
                           <option>rap</option>
                           <option>trap</option>
                           <option>trap soul</option>
                        </select>
                     </div>
                  </div>
               </div>
               {/* <SideNavTabs sideNavTab={sideNavTab} /> */}
            </div>
            <div>
               <div className="">

               </div>
            </div>
            <Loader isLoading={isLoading} />
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
            <SideNavItem value={'Request'} handler={() => handleSideNavTabs('request')} />
            <SideNavItem value={'Contact'} handler={() => handleSideNavTabs('contact')} />
         </nav>
      </div>
   )
}
