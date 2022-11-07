import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import './Header.css'

function Header() {
  const {user, logoutUser} = useContext(AuthContext)
  return (
    <div className='headerParentDiv'>
      <div className="headerContainer">
        <h1 className='header'><Link to='/'>Home</Link></h1>
        <div className='contentRight'>
          {user && <p className='useLoggedIN'>Logged in as <strong>{user.username}</strong></p> }
          {user && <div className='btn btn-logout' onClick={logoutUser}>Logout</div> }
        </div>
      </div>
    </div>
  )
}

export default Header