import { useEffect, useState } from 'react'
import { baseUrl } from '../..';
import { useLocation } from 'react-router-dom';
import useBeatsContext from './useContext/useBeatsContext';

export default function useBeatPages(fetchPage) {
   const location = useLocation();

   const [fetchedPages, setFetchedPage] = useState([0]);

   const [savedCursor, setCursor] = useState();
   const [isAtPageEnd, setIsAtPageEnd] = useState();
   const [isAtDataEnd, setIsAtDataEnd] = useState();
   const [isLoading, setIsLoading] = useState();

   const { beatsDispatch } = useBeatsContext();
   

   // Responsible for fetching page beats on the home page
  useEffect(() => {

   // Load Inventory
   const home = async () => {
     setIsLoading(true);

     try {
       const response = await fetch(baseUrl, {
         method: 'POST',
         body: JSON.stringify({cursor: savedCursor})
       });

       if(response.ok) {
      
         const responseJson = await response.json();
         const { cursor, beats, list_complete } = responseJson

         setCursor(cursor);
         setIsAtDataEnd(list_complete);
         fetchedPages.sort()
         setFetchedPage([...fetchedPages, fetchedPages[fetchedPages.length - 1] + 1]);

         if(beats && beats.length) {
            for(let beat of beats) {
               beat = JSON.parse(beat)
               beatsDispatch({type: 'ADD_BEAT', payload: beat});
            }
         }

         setIsLoading(false)
       }
     } catch (error) {
       setIsLoading(false)
       console.log("error loading homepage", error);
     }
   };

   if(!fetchedPages.includes(fetchPage) && !isAtDataEnd){
     home()      
   } 

 // eslint-disable-next-line 
 }, [location.pathname, fetchPage]);

 useEffect(() => {
  setIsAtPageEnd(fetchedPages[fetchedPages.length - 1] === fetchPage ? true : false);
 }, [fetchPage, fetchedPages, isAtDataEnd])


   return {isLoading, fetchedPages, isAtPageEnd, isAtDataEnd}
}
