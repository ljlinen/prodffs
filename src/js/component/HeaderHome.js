import React, { useRef } from 'react'
import Loader from '../elemet/Loader'
import ClickableIcon from '../elemet/ClickableIcon'
import SideNavItem from '../elemet/SideNavItem'
import iconMenu from "../../asset/img/icon/menu.svg";
import iconForward from "../../asset/img/icon/chevron-right.svg";
import iconBack from "../../asset/img/icon/chevron-left.svg";
import useSideNavigator from '../hooks/useSideNavigator';
import useBuyingContext from '../hooks/useContext/useBuyingContext';
import IconButton from './IconButton';

export default function HeaderHome({sorter, setSorter, isBuying, isLoading, setGenre}) {
   
   const sideNavReff = useRef(null)

   const { handleSideNav, isSideNavOpen } = useSideNavigator(sideNavReff);
   const { selectedBeat, buyingDispatch } = useBuyingContext();


   const clearBuying = () => {
      buyingDispatch({
        type: "CLEAR_BUYING",
      });
  
      // document.body.scrollIntoView({ scrollBehavior: 'smooth' })
   };


   return (
      <div className="header-sidenav">
         <header>
            <nav>
            <IconButton
              condition={!true}
              handler={isBuying ? clearBuying : null}
              src={isBuying ? iconBack : null}
              value={isBuying ? "Back" : "ProdFFS"}
              style={{display: 'flex'}}
            />
               <ClickableIcon 
                  condition={isSideNavOpen}
                  classes={'menu'}
                  src={iconMenu}
                  alt={'menu'}
                  handler={() => handleSideNav('Open')}
               />
            </nav>
            <div className={(isBuying && "beatlist-sorter beatlist-sorter-hide") || "beatlist-sorter"}>
               <h2>{(isBuying && "BUY BEAT") || "SORTED BY"}</h2>
               <p className="by">
                  <span>|</span>
                  {(selectedBeat?.id && isBuying) || sorter}
               </p>
               <div className={(isBuying && " sorter-buttons hide") || "sorter-buttons hide-anim"}>
                  <p className={sorter === 'newest' && 'current-sorter'} onClick={() => setSorter('newest')}>newest</p>
                  <p className={sorter === 'plays' && 'current-sorter'} onClick={() => setSorter('plays')}>plays</p>
                  <div style={{position: 'relative'}}>
                     <p className={sorter === 'genre' && 'current-sorter'} style={{position: 'absolute'}}>Genre</p>
                     <select onChange={(e) => setGenre(e.target.value)}  onClick={() => setSorter('genre')} style={{position: 'relative', opacity: 0, width: '100%', height: '100%'}}>
                        <p>Genre</p>
                        <option>rap</option>
                        <option>trap</option>
                        <option>trap soul</option>
                     </select>                  
                  </div>

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
   )
}
