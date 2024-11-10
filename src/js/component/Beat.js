import React, { useEffect, useState } from "react";
import buy from "../../asset/img/icon/download.svg";
import play from "../../asset/img/icon/circle-play.svg";
import useFetchBeatFile from "../hooks/useFetchBeatFile";
import useBeatsContext from "../hooks/useContext/useBeatsContext";
import useBuyingContext from "../hooks/useContext/useBuyingContext";

export default function Beat({ beatObj, id, i }) {

  // const beattt = {"info":{"title":"Puss Ass.mp3","tags":["Puss2024","PussFree","PussTypeBeat"]},"packages":{"free":{"package":"free","price":"230","untagged":true,"mp3":{"mp3":false,"bitrate":"320"},"wav":false,"project-files":false}},"id":"b-1730249927493"}
  
  const { beatsDispatch } = useBeatsContext()
  const { info } = beatObj;
  const { selectedBeat, buyingDispatch } = useBuyingContext();

  const beatFile = useFetchBeatFile(id);
  const [isSafe, setIsTransitionSafe] = useState();

  useEffect(() => {
    setIsTransitionSafe(selectedBeat?.id ? true : false);
  }, [selectedBeat]);

  const handler = () => {
    if (selectedBeat?.id !== id) {
      buyingDispatch({ type: "SET_BUYING", payload: beatObj });
    }
  }

  const handlePlay = () => {
    beatsDispatch({type:'ADD_BEAT', payload: i });
  }

  // style below depends on the component height: 50 and gap between sibling elements: 12
  // implement a way to dinamically get these or change them manually below
  return (
    <div className={isSafe && selectedBeat?.id !== id ? "beat beat-hide" : "beat"}
      style={{
        marginTop: isSafe ? i > 0 && `-${50}px` : 12,
        marginInline: selectedBeat && 40,
      }}
    >
      <div className={i === 0 ? "bg  isplaying-anim" : "bg"}>
        <div className="one">
        </div>
        <div className="two">
        </div>
        <div className="three">
        </div>
      </div>
      <div className="price"
        style={{ background: `linear-gradient(to right, rgba(var(--clr-primary)) 10%, rgba(var(--clr-60)) ${
            beatObj?.packages?.basic?.price * 3 || 60
        }%)`}}
      >
        <div className="price-mask">
          <h4>${Object.values(beatObj?.packages)[0].price}</h4>
        </div>
      </div>
      <div className="title-bpm">
        <h4>{info?.title}</h4>
        <p>bpm: {info?.bpm}</p>
      </div>
      <img className={isSafe ? "hide play" : "hide-anim play"}
        src={play}
        alt="background-image"
        onClick={handlePlay}
      />
      <img className={isSafe ? "hide buy" : "hide-anim buy"} alt="buy" src={buy} onClick={handler} />
    </div>
  );
}
