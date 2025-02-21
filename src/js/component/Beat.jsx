import React, { useEffect, useState } from "react";
import buy from "../../asset/img/icon/download.svg";
import play from "../../asset/img/icon/circle-play.svg";
import useBeatsContext from "../hooks/useContext/useBeatsContext";
import useBuyingContext from "../hooks/useContext/useBuyingContext";

export default function Beat({ beatObj, id, i }) {

  const { beatsDispatch, isPlaying, playingSongIndex } = useBeatsContext();
  const { info } = beatObj;
  const { selectedBeat, buyingDispatch } = useBuyingContext();

  const [isSafe, setIsTransitionSafe] = useState();
  const [isSafeInitial, setIsInitialTransitionSafe] = useState();

  useEffect(() => {
    setIsInitialTransitionSafe(beatObj ? true : false);
  }, [beatObj]);
   
  useEffect(() => {
    setIsTransitionSafe(selectedBeat?.id ? true : false);
  }, [selectedBeat]);

  const handler = () => {
    if (selectedBeat?.id !== id) {
      buyingDispatch({ type: "SET_BUYING", payload: beatObj });
    }
  }

  const handlePlay = () => {
    beatsDispatch({ type: "SET_PLAYING_SONG", payload: i });
  }

  // style below depends on the component height: 50 and gap between sibling elements: 12
  // implement a way to dinamically get these or change them manually below
  return (
<div className={`beat ${isSafe && selectedBeat?.id !== id && 'beat-hide'} ${!isSafeInitial && 'beathide'} `}
      style={{
        marginTop: isSafe ? i > 0 && `-${50}px` : 12,
        marginInline: selectedBeat && 25,
      }}
    >
      <div className="price">
        <div className="price-mask">
          <h4>
            {
              Object.values(beatObj?.packages)[0].price === '0' ?
              'free' :
              '$' + Object.values(beatObj?.packages)[0].price
            }
          </h4>
        </div>
      </div>
      <div className="title-bpm">
        <h4>{info?.title}</h4>
        <p>bpm: {info?.bpm} </p>
      </div>
        <div className="isplaying-n-playicon" style={{left: selectedBeat?.id === id ? 30 : 0}}>
          <div className={i === playingSongIndex && isPlaying ? "bg  isplaying-anim" : "bg hide"}>
            <div className="one">
            </div>
            <div className="two">
            </div>
            <div className="three">
            </div>
          </div>
          <img className={(i !== playingSongIndex) ? "hide-anim play" :  "hide play" }
            src={play}
            alt="background-image"
            onClick={handlePlay}
          />
        </div>
      <img className={isSafe ? "hide buy" : "hide-anim buy"} alt="buy" src={buy} onClick={handler} />
    </div>
  );
}