import React, { useEffect, useRef, useState } from 'react'
import useBeatsContext from '../hooks/useContext/useBeatsContext';
import iconPause from "../../asset/img/icon/pause.svg";
import iconPlay from "../../asset/img/icon/play.svg";
import iconPrevious from "../../asset/img/icon/previous.svg";
import iconNext from "../../asset/img/icon/next.svg";
import { baseUrl } from '../..';

export default function AudioPlayer({renderCondition}) {

    const { beats } = useBeatsContext();
    const audioRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false)
    const [currentSongSrc, setCurrentSongSrc] = useState()
    const [currentSongIndex, setCurrentSongIndex] = useState(0)

    useEffect(() => {

        if(beats?.length) {
            setIsPlaying(false)
            const url = beats[currentSongIndex]?.id ? baseUrl + '/beatfile/' + beats[currentSongIndex]?.id : null
            setCurrentSongSrc(url);
            // handleControlClick('play-pause')
        }

    // eslint-disable-next-line
    }, [beats, currentSongIndex])

    useEffect(() => {  
        if(currentSongSrc && audioRef.current) {
            const audio = audioRef.current;
            audio.load();
            audio.onended = () => {
                handleControlClick('next')
            };
            audio.onloadedmetadata = () => {
                if(!isPlaying) handleControlClick('play-pause')
                console.log("song loaded");
            };
        }
        
    // eslint-disable-next-line
    }, [currentSongSrc]);

    const handleControlClick = (type) => {
        const audio = audioRef.current;
        switch (type) {
            case 'play-pause':
                !isPlaying ?
                audio
                .play()
                .then(() => setIsPlaying(true))
                .catch((error) => console.error("Playback error:", error)) :
                audio.pause()
                setIsPlaying(false);
                break;
            case 'next':
                setCurrentSongIndex((beats?.length < currentSongIndex) ? currentSongIndex + 1 : 0)
                break;
            case 'previous':
                setCurrentSongIndex((currentSongIndex > beats?.length) ? currentSongIndex - 1 : currentSongIndex.length - 1)
                break;
            default:
                break;
        }
    }

  return (
    <div className={renderCondition ? "pause-next pause-next-hide" : "pause-next"}>
        <div className="mask">
            <audio ref={audioRef} src={currentSongSrc} />
            <img src={iconPrevious} alt="previous" onClick={() => handleControlClick('previous')} />
            <img src={isPlaying ? iconPause : iconPlay} alt="pause" onClick={() => handleControlClick('play-pause')} />
            <img src={iconNext} alt="next" onClick={() => handleControlClick('next')} />
        </div>
    </div>
  )
}
