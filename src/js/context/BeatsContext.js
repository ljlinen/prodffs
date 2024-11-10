import React, { createContext, useReducer } from 'react'

export const BeatsContext = createContext();
export const beatsReducer = (state, action) => {

  switch (action.type) {
    case "SET_BEATS":
      return {
        beats: {...action.payload},
        inventory: state.inventory
      }
    case "SET_INVENTORY":
      return {
        beats: state.beats,
        inventory: action.payload,
      }
    case "ADD_BEAT":
      let newArr
      if(state.beats && typeof action.payload === 'number') {
        const moveItem = state.beats.slice(action.payload, action.payload + 1);
        state.beats.splice(action.payload, 1);
        newArr = [...moveItem, ...state.beats]
      } else {
        newArr = state.beats && [...state.beats, action.payload]
      }
      console.log('debug beats', state.beats ? newArr : [action.payload]);
       
      return { 
        beats: state.beats ? newArr : [action.payload],
        inventory: state.inventory
      }
    case "CLEAR_BEATS":
    return {
        beats: null,
        inventory: null
    }
    default:
      return state
  }
}
    
export default function BeatsContextProvider({children}) {


  const [state, beatsDispatch] = useReducer(beatsReducer, {
    beats: null,
    inventory: null
  })

  return (
    <BeatsContext.Provider value={{...state, beatsDispatch}}>
      {children}
    </BeatsContext.Provider>
  )
}
