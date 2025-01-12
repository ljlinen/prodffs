import React, { createContext, useReducer } from 'react'

export const AdminContext = createContext();
export const adminReducer = (state, action) => {
  
  switch (action.type) {
    case "SET_PACKAGES_FILLED":
      return {
        packagesFilled: action.payload,
        uncreatedPackages: state.uncreatedPackages
      }
    case "SET_UNCREATED_PACKAGES":
    return {
        packagesFilled: state.packagesFilled,
        uncreatedPackages: action.payload
    }
    case "CLEAR_ADMIN":
      return {
        packagesFilled: null,
        uncreatedPackages: ['basic', 'premium', 'exclusive']
      }
    default:
      return state
  }
}
    
export default function AdminContextProvider({children}) {


  const [state, adminDispatch] = useReducer(adminReducer, {
    packagesFilled: null,
    uncreatedPackages: ['basic', 'premium', 'exclusive']
  })

  return (
    <AdminContext.Provider value={{...state, adminDispatch}}>
      {children}
    </AdminContext.Provider>
  )
}
