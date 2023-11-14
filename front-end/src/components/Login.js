import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/');
    }
  })

  const handleLogin = async () => {
    // console.log(email,password)
    let result = await fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'content-type': 'application/json'
      }
    });
    result = await result.json();
    console.log(result)
    if (result.auth) {
      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('token', JSON.stringify(result.auth));
      navigate('/');
    }
    else {
      alert("Email or password is incorrect");
    }
  }

  return (
    <div>
      <h1 className='registerHeading'>Login</h1>

      <input
        className='inputBox'
        type="text"
        placeholder='Enter Email'
        value={email}
        name={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className='inputBox'
        type="password"
        placeholder='Enter password'
        value={password}
        name={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className='signupbtn' type='button' onClick={handleLogin}>Login</button>
    </div>
  )
}

export default Login
