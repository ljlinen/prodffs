import React, { useEffect, useRef, useState } from 'react'
import useBeatsContext from '../hooks/useContext/useBeatsContext';
import iconPause from "../../asset/img/icon/pause.svg";
import iconPlay from "../../asset/img/icon/play.svg";
import iconPrevious from "../../asset/img/icon/previous.svg";
import iconNext from "../../asset/img/icon/next.svg";
import iconHide from "../../asset/img/icon/chevron-right-fff.svg";
import iconShow from "../../asset/img/icon/chevron-left.svg";

export default function AudioPlayer({renderCondition, toPlayQue, queLoaded}) {

    const { beats, playingSongIndex, isPlaying, beatsDispatch } = useBeatsContext();
    const audioRef = useRef(null);

    const [currentSongSrc, setCurrentSongSrc] = useState()
    const [currentSongIndex, setCurrentSongIndex] = useState(0)
    const [isPlayerVisible, setisPlayerVisible] = useState(true)


    useEffect(() => {
        
        beatsDispatch({type:'SET_PLAYING_SONG', payload: currentSongIndex})

        if(queLoaded) {
            setCurrentSongSrc(toPlayQue[currentSongIndex])
        }

    // eslint-disable-next-line
    }, [queLoaded, currentSongIndex])

    useEffect(() => {

        const playClickedSong = async() => {
            if(queLoaded) {
                handleControlClick('play-pause')
                setCurrentSongSrc(toPlayQue[playingSongIndex])
            }
        }

        playClickedSong()

    // eslint-disable-next-line
    }, [playingSongIndex])

    useEffect(() => {
        if(currentSongSrc && audioRef.current) {
            const audio = audioRef.current;
            audio.load();
            audio.onended = () => {
                handleControlClick('next')
            };
            audio.onloadedmetadata = () => {
                handleControlClick('play-pause')
            };
        }
        
    // eslint-disable-next-line
    }, [currentSongSrc]);


    const handleControlClick = async(type) => {
        
        const audio = audioRef.current;
        switch (type) {
            case 'play-pause':
                !isPlaying ?
                audio
                .play()
                .then(() => beatsDispatch({type:'SET_IS_PLAYING', payload: true}))
                .catch((error) => {console.error("Playback error:", error)}) :
                audio.pause()
                beatsDispatch({type:'SET_IS_PLAYING', payload: false})
                break;
            case 'next':
                if(isPlaying) {
                    audio.pause()
                    beatsDispatch({type:'SET_IS_PLAYING', payload: false})
                }
                setCurrentSongIndex((currentSongIndex + 1 > beats?.length - 1) ? 0 : currentSongIndex + 1)
                break;
            case 'previous':
                if(isPlaying) {
                    audio.pause()
                    beatsDispatch({type:'SET_IS_PLAYING', payload: false})
                }
                setCurrentSongIndex((currentSongIndex - 1 < 0) ? beats?.length - 1 : currentSongIndex - 1)
                break;
            default:
                break;
        }
    }

    return (
        <div className={`pause-next ${!renderCondition ? "pause-next-hide" : null } ${!isPlayerVisible ? "pause-next-minimal" : null }`}>
            <div className='player-hide-show' onClick={() => setisPlayerVisible(!isPlayerVisible)}>
                <img src={isPlayerVisible ? iconHide : iconShow} />
            </div>
            <div className="pause-next-controls">
                <audio ref={audioRef} src={currentSongSrc} />
                <img src={iconPrevious} alt="previous" onClick={() => handleControlClick('previous')} />
                <img src={isPlaying ? iconPause : iconPlay} alt="pause" onClick={() => handleControlClick('play-pause')} />
                <img src={iconNext} alt="next" onClick={() => handleControlClick('next')} />
            </div>
        </div>
    )
}
