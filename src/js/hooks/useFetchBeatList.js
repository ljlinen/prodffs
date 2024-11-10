import { useEffect, useState } from "react";
import useBeatsContext from "./useBeatsContext";
import useFetchBeat from "./useFetchBeatFile";

export default function useFetchBeatList(idList) {
  console.log("idList", idList);

  const { beats, beatsDispatch } = useBeatsContext();
  const [beatToFetch, setBeatToFetch] = useState();
  const fetchedBeat = useFetchBeat(beatToFetch);
  let i = 0;

  useEffect(() => {
    if (fetchedBeat?.id) beatsDispatch({ type: "ADD_BEAT", payload: fetchedBeat });

    idList && setBeatToFetch(idList[i]);
    i < idList?.length && i++;
    console.log("fetching");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beats, fetchedBeat, idList, i]);
}
