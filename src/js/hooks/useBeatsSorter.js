import { useEffect, useState } from "react";
import useBeatsContext from "./useContext/useBeatsContext";
import { baseUrl } from "../..";

export default function useBeatsSorter(currentPage, setToPlayQue, setQueLoaded, sorter, genre) {

  const [beatsToRender, setBeatsToRender] = useState(false);

  const { beats } = useBeatsContext();

  useEffect(() => {
    if(beats?.length) {
      let updated = [...beatsToRender]
      switch (sorter) {
        case 'newest':
          updated.sort((a, b) => new Date(b.info.released) - new Date(a.info.released));
          break;
        case 'plays':
          updated.sort((a, b) => Number(b.info.plays) - Number(a.info.plays));
          break;
        case 'genre':
          updated.sort((a, b) => {
            if(a.info?.genre === genre) return -1
            if(b.info?.genre === genre) return 1
            return 0
          });
          break;
        default:
          break;
      }
      setBeatsToRender(updated);
    }
  // eslint-disable-next-line
  }, [sorter]);

  useEffect(() => {
    if(beats?.length) {
      const start = (currentPage - 1) * 4
      // conditional assignment to ensure end is never greater than it should be
      // to prevent slice() from using negative items
      const end = (start + 4) < beats.length ? (start + 4) : beats.length

      let updated = [...beats]
      updated = updated.slice(start, end);
      switch (sorter) {
        case 'newest':
          updated.sort((a, b) => new Date(b.info.released) - new Date(a.info.released));
          break;
        case 'plays':
          updated.sort((a, b) => Number(b.info.plays) - Number(a.info.plays));
          break;
        case 'genre':
          updated.sort((a, b) => {
            if(a.info.genre === genre) return -1
            if(b.info.genre === genre) return 1
            return 0
          });
          break;
        default:
          updated.sort((a, b) => new Date(b.info.released) - new Date(a.info.released));
          break;
        }

      const que = updated.map((beat, i) => {
          return baseUrl + '/beatfile/' + beat.id
      })
      setToPlayQue(que)
      setQueLoaded(true)
      setBeatsToRender(updated)
    }
  // eslint-disable-next-line
  }, [currentPage, beats])


  return { beatsToRender }
}
