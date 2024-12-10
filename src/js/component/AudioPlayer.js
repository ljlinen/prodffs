import React, { useEffect, useRef, useState } from 'react'
import useBeatsContext from '../hooks/useContext/useBeatsContext';
import iconPause from "../../asset/img/icon/pause.svg";
import iconPlay from "../../asset/img/icon/play.svg";
import iconPrevious from "../../asset/img/icon/previous.svg";
import iconNext from "../../asset/img/icon/next.svg";
import { baseUrl } from '../..';

export default function AudioPlayer({renderCondition}) {

    const { beats, playingSongIndex, isPlaying, beatsDispatch } = useBeatsContext();
    const audioRef = useRef(null);

    const [currentSongSrc, setCurrentSongSrc] = useState()
    const [currentSongIndex, setCurrentSongIndex] = useState(0)
    const [toPlayQue, setToPlayQue] = useState()
    const [queLoaded, setQueLoaded] = useState()

    useEffect(() => {

        if(beats?.length) {
            const que = beats.map((beat, i) => {
                return baseUrl + '/beatfile/' + beat.id
            })
            setToPlayQue(que)
            setQueLoaded(true)
        }

    // eslint-disable-next-line
    }, [beats])

    useEffect(() => {
        
        beatsDispatch({type:'SET_PLAYING_SONG', payload: currentSongIndex})

        if(queLoaded) {
            console.log(currentSongIndex);
            setCurrentSongSrc(toPlayQue[currentSongIndex])
        }
        console.log('song playing', currentSongIndex);

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
                console.log("song loaded");
                handleControlClick('play-pause')
            };
        }
        
    // eslint-disable-next-line
    }, [currentSongSrc]);


    const handleControlClick = async(type) => {
        console.log('pause play, isPlaying: ', isPlaying);
        
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
        <div className={renderCondition ? "pause-next" : "pause-next pause-next-hide"}>
            <div className="mask">
                <audio ref={audioRef} src={currentSongSrc} />
                <img src={iconPrevious} alt="previous" onClick={() => handleControlClick('previous')} />
                <img src={isPlaying ? iconPause : iconPlay} alt="pause" onClick={() => handleControlClick('play-pause')} />
                <img src={iconNext} alt="next" onClick={() => handleControlClick('next')} />
            </div>
        </div>
    )
}
