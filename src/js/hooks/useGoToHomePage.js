import { useNavigate } from 'react-router-dom'

export default function useGoToHomePage() {
  const navigate = useNavigate()
   return () => navigate('/')
}
