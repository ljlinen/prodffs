import { useEffect, useState } from "react";

export default function useSideNavigator(ref, isBuying) {

   const [isSideNavOpen, setIsSideNavOpen] = useState();

   useEffect(() => {
      console.log('isBuying');
      if(isBuying) handleSideNav('Close')
   // eslint-disable-next-line 
   }, [isBuying]);

   const handleSideNav = (type) => {

      switch (type) {
         case 'Open':
            ref.current.classList.add('sidenav-open')
            setIsSideNavOpen(true)
            break;
         case 'Close':
            ref.current.classList.remove('sidenav-open')
            setIsSideNavOpen(false)
            break;
         default:
            break;
      }
   }

  return {handleSideNav, isSideNavOpen}
}
