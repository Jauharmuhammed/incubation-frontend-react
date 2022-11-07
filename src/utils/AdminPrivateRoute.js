import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'


const AdminPrivateRoute = ({children}) => {
  const {user} = useContext(AuthContext)

  if (!user.admin) {
    return <Navigate to="/" />
  }
  return children;
}

export default AdminPrivateRoute;