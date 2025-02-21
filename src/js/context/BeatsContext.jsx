import React, { createContext, useReducer } from 'react'

export const BeatsContext = createContext();

export const beatsReducer = (state, action) => {

  switch (action.type) {
    case "SET_BEATS":
      return {
        beats: {...action.payload},
        inventory: state.inventory,
        playingSongIndex: state.playingSongIndex,
        isPlaying: state.isPlaying
      }
    case "SET_INVENTORY":
      return {
        beats: state.beats,
        inventory: action.payload,
        playingSongIndex: state.playingSongIndex,
        isPlaying: state.isPlaying
      }
    case "ADD_BEAT":
      return { 
        beats: state.beats ? [...state.beats, action.payload] : [action.payload],
        inventory: state.inventory,
        playingSongIndex: state.playingSongIndex,
        isPlaying: state.isPlaying
      }
    case "SET_PLAYING_SONG":
      return { 
        beats: state.beats,
        inventory: state.inventory,
        playingSongIndex: action.payload,
        isPlaying: state.isPlaying
      }
    case "SET_IS_PLAYING":
      return { 
        beats: state.beats,
        inventory: state.inventory,
        playingSongIndex: state.playingSongIndex,
        isPlaying: action.payload,
      }
    case "CLEAR_BEATS":
    return {
        beats: null,
        inventory: null,
        playingSongIndex: null,
        isPlaying: null
    }
    default:
      return state
  }
}
    
export default function BeatsContextProvider({children}) {

  const [state, beatsDispatch] = useReducer(beatsReducer, {
    beats: null,
    inventory: null,
    playingSongIndex: null,
    isPlaying: null
  })

  return (
    <BeatsContext.Provider value={{...state, beatsDispatch}}>
      {children}
    </BeatsContext.Provider>
  )
}
