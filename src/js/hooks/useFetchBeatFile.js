import { useEffect, useState } from 'react'
import { baseUrl } from '../..'

export default function useFetchBeatFile(beatid) {
    const [beatFile, setBeatFile] = useState();

    useEffect(() => {
        const fetchBeatFile = () => {
                const url = baseUrl + '/beatfile/' + (beatid && beatid)
                setBeatFile(url)
        }

        if(beatid) fetchBeatFile()
    }, [beatid])

  return beatFile;
}
