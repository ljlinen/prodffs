import { useEffect, useState } from "react";

export default function useSideNavigator(ref, isBuying) {

   const [isSideNavOpen, setIsSideNavOpen] = useState();
   const [sideNavTab, setNavSideTab] = useState();

   useEffect(() => {
      if(isBuying) handleSideNav('Close')
   // eslint-disable-next-line 
   }, [isBuying]);

   useEffect(() => {
      if(!isSideNavOpen) setNavSideTab(null)
   }, [isSideNavOpen]);

   const handleSideNavTabs = (tab) => {

      switch (tab) {
         case 'request':
            // ref.current.classList.add('sidenav-open')
            setNavSideTab('request')
            break;
         case 'contact':
            // ref.current.classList.remove('sidenav-open')
            setNavSideTab('contact')
            break;
         default:
            break;
      }
   }

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

  return {handleSideNav, isSideNavOpen, handleSideNavTabs, sideNavTab}
}
