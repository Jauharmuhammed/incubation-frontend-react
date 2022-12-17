import React, { useContext, useEffect } from 'react'
import {Link} from 'react-router-dom'
import {AuthContext} from '../../context/AuthContext'
import { MessagesContext } from '../../context/Messages'
import './Login.css'

function Login() {
  const { successMessage } = useContext(MessagesContext)
  const { errorMessage, setErrorMessage } = useContext(MessagesContext)
  let {loginUser} = useContext(AuthContext)

  useEffect(() => {
    setErrorMessage('')
  },)
  

  return (
      <div id='login-app'>
        <div className='box login'>
          <form className='form' onSubmit={loginUser}>
            <input type="text" tabIndex="1" name='username' placeholder="Username" />
            <input type="password" name='password' tabIndex="1" placeholder="Password"/>
            {errorMessage && <p className='error-message'>{errorMessage}</p>}
            {successMessage && <p className='success-message'>{successMessage}</p>}
            <input type="submit" className="btn btn-login" value="Login" />
            <p className='signupNavigation'>Don't have an account? <Link to='/signup'>Signup</Link> </p>
          </form>
        </div>
      </div>
  )
}

export default Login