import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'


const AdminRestrictedRoute = ({children}) => {
  const {user} = useContext(AuthContext)

  if (user.admin) {
    return <Navigate to="/admin" />
  }
  return children;
}

export default AdminRestrictedRoute;