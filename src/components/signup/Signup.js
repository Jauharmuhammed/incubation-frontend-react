import React, { useContext, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { MessagesContext } from '../../context/Messages'
import './Signup.css'

function Signup() {
  const navigate = useNavigate()
  const { setSuccessMessage } = useContext(MessagesContext)
  const { errorMessage, setErrorMessage } = useContext(MessagesContext)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  
  let signupUser = async (e) => {
    e.preventDefault()
    if ( username && email && password && confirmPassword){
      let response = await fetch('http://127.0.0.1:8000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'username': username,
          'email': email,
          'password': password,
          'password2': confirmPassword
        })
      })
      let data = await response.json()
      if (data.username === username && data.email === email) {
        setSuccessMessage(`Successfully registered as ${data.username}`)
        navigate('/login')
      }
      else if (data.username?.length > 0) {
        setErrorMessage(data.username[0])
      }
      else if (data.email?.length > 0) {
        setErrorMessage(data.email[0] === 'This field must be unique.' ? 'Email already registered! Try another.' : data.email[0])
      }
      else if (data.password?.length > 0) {
        setErrorMessage(data.password[0])
      }
    }
    else{
      setErrorMessage('Please fill all fields')
    }
    
  }


  return (
    <div id='signup-app'>
      <div className='box'>
        <form className='signup-form' onSubmit={signupUser}>
          <input type="text" value={username} onChange={(e)=> setUsername(e.target.value)}
           tabIndex="1" name='username' placeholder="Username" />
          <input type="text" value={email} onChange={(e)=> setEmail(e.target.value)}
           tabIndex="1" name='email' placeholder="Email" />
          <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)}
           name='password' tabIndex="1" placeholder="Password" />
          <input type="password" value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)}
           name='confirm_password' tabIndex="1" placeholder="Confirm Password" />

          { errorMessage && <p className='error-message'>{errorMessage}</p>}

          <input type="submit" className="btn btn-login" value="Signup" />
          <p className='signupNavigation'>Have an Account? <Link to='/login'>Login</Link> </p>
        </form>
      </div>
    </div>

  )
}

export default Signup