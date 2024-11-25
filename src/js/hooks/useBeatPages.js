import { useEffect, useState } from 'react'
import { baseUrl } from '../..';
import { useLocation } from 'react-router-dom';
import useBeatsContext from './useContext/useBeatsContext';

export default function useBeatPages() {
   const location = useLocation();

   const [page, setPage] = useState(1);
   const [cursor, setCursor] = useState();
   const [isAtPageEnd, setIsAtPageEnd] = useState();
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
         body: JSON.stringify({cursor})
       });

       if(response.ok) {
         const responseJson = await response.json();
         const { cursor, beats, list_complete } = responseJson
         setCursor(cursor);
         setIsAtPageEnd(list_complete);

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

   if(!isAtPageEnd){
     home()      
   } 

 // eslint-disable-next-line 
 }, [location.pathname, page]);


   return {isLoading, page, setPage, isAtPageEnd}
}
