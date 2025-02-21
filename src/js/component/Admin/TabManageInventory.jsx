import React, { useEffect, useState } from 'react'
import useBeatsContext from '../../hooks/useContext/useBeatsContext';
import BeatAdmin from './BeatAdmin';
import { baseUrl } from '../../..';

export default function TabManageInventory({activeTab, setActiveTab, setResetCurrentTab, setFullScreen}) {
   const [beatsToRender, setBeatsToRender] = useState();
   const { beats, inventory, beatsDispatch } = useBeatsContext();
 
 
   useEffect(() => {
 
     // Load Inventory
      const home = async () => {
         try {
            const response = await fetch(baseUrl);
            if (response.ok) {
               const responseJson = await response.json();
               beatsDispatch({ type: "SET_INVENTORY", payload: responseJson });
            }
         } catch (error) {
            console.log("error loading homepage", error);
         }
      };

      beatsDispatch({ type: "CLEAR_BEATS" });
      home() 
 
 
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
                     key={beatObj.id}
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
