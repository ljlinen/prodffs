import { useContext } from 'react'
import { BuyingContext } from '../../context/BuyingContext'


export default function useBuyingContext() {
    const context = useContext(BuyingContext)

    if(!context) throw Error("You must be inside BuyingContextPRovider")

    return context
}
