import { useEffect, useState } from 'react'
import { baseUrl } from '../..'

export default function useCheckOut(isCheckedOut, selectedPackage, selectedBeatId) {

   const [downloadLink, setDownloadLink] = useState()

   useEffect(() => {
      const fetchLink = async() => {
         if(isCheckedOut)  {
            const response = await fetch(baseUrl + '/checkedout', {
               method: 'POST',
               body: JSON.stringify({
                  selectedPackage: selectedPackage,
                  selectedBeat: selectedBeatId
               })
            })

            if(response.ok) {
               const downloadLink = await response.text();
               setDownloadLink(downloadLink);
            }
         }
      }

      if(isCheckedOut) fetchLink()
   }, [isCheckedOut, selectedBeatId, selectedPackage])

  return { downloadLink }
}
