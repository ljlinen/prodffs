import React, { useEffect, useState } from 'react'
import useBeatsContext from '../../hooks/useContext/useBeatsContext';
import BeatAdmin from './BeatAdmin';
import { baseUrl } from '../../..';
import useBeatsSorter from '../../hooks/useBeatsSorter';
import useBeatPages from '../../hooks/useBeatPages';

export default function TabManageInventory({activeTab, setActiveTab, setResetCurrentTab, setFullScreen}) {

  const [currentPage, setCurrentPage] = useState(1);
  const [resetChechoutInfoCheckout, setResetChechoutInfo] = useState(null)
   const [sorter, setSorter] = useState('newest');
   const [toPlayQue, setToPlayQue] = useState()
   const [queLoaded, setQueLoaded] = useState()

  // eslint-disable-next-line no-unused-vars
  const { setIsLoading, isLoading, isAtPageEnd, isAtDataEnd } = useBeatPages(currentPage);
  const { beatsToRender } = useBeatsSorter(currentPage, setToPlayQue, setQueLoaded, sorter)


   useEffect(() => {
      if(setResetCurrentTab && activeTab === 2) {
         setResetCurrentTab(() => resetTabTwo)
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab])
  
    const resetTabTwo = () => {
      setActiveTab(1)
      setFullScreen(false)
    }

   return (
      <div className={activeTab === 2 ? "t2 show-tab" : "hide-tab"}>
         <div className="beatlist-main" style={{ minHeight: "92vh" }}>
         <div className="beatlist">
            <div className="info-text">
               <h4 style={{ textTransform: "capitalize" }}>
               take a listen to them
               </h4>
               <p style={{opacity: .6, fontWeight: 500}}>click play icon to play any beat</p>
            </div>

            {
               beatsToRender && beatsToRender?.length ? 
               beatsToRender.map((beatObj, i) => {
                  return (
                     <BeatAdmin
                     i={i}
                     id={beatObj.id}
                     key={beatObj.id + i}
                     beatObj={beatObj}
                     />
                  );
               }) :
               null
            }
         </div>
         </div>
      </div>
   )
}
