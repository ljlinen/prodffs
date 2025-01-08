import React, { createContext, useReducer } from 'react'

export const BuyingContext = createContext();
export const buyingReducer = (state, action) => {
  
  switch (action.type) {
    case "SET_BUYING":
      return {
        selectedBeat: {...action.payload},
        selectedPackage: state.selectedPackage
      }
    case "SET_PACKAGE":
      return {
        selectedBeat: state.selectedBeat,
        selectedPackage: {...action.payload},
      }
    case "CLEAR_BUYING":
      return {
        selectedBeat: null,
        selectedPackage: null
      }
    default:
      return state
  }
}
    
export default function BuyingContextProvider({children}) {


  const [state, buyingDispatch] = useReducer(buyingReducer, {
    selectedBeat: null,
    selectedPackage: null
  })

  return (
    <BuyingContext.Provider value={{...state, buyingDispatch}}>
      {children}
    </BuyingContext.Provider>
  )
}
