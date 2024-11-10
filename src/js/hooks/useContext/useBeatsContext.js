import { useContext } from 'react'
import { BeatsContext } from '../../context/BeatsContext'


export default function useBeatsContext() {
    const context = useContext(BeatsContext)

    if(!context) throw Error("You must be inside BeatsContextPRovider")

    return context
}
