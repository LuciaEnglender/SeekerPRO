import React, {useState} from 'react';
import Postulante from './Postulante';
import Business from './Business';



export default function SignUp() {
    
  
  return <div >

<Postulante/>
<br/>
<Business/>

  </div>;
}

/*

import React, { useState } from "react";
import {useNavigate} from "react-router-dom"
import { useAuth0, User } from "@auth0/auth0-react";
import { useEffect } from "react";

export default function Login({onLogin}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const  navigate= useNavigate()
  const {isLoginLoading, hasLoginError, login, isLogged} = User

  useEffect(() => {
    if (isLogged) {
      navigate('/')
      onLogin && onLogin()
    }
  }, [isLogged, navigate, onLogin])

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ username, password })
  };

  return (
    <>
      {isLoginLoading && <strong>Checking credentials...</strong>}
      {!isLoginLoading &&
        <form className='form' onSubmit={handleSubmit}>
          <label>
            username
            <input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          </label>

          <label>
            password
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </label>

          <button className='btn'>Login</button>
        </form>
      }
      {
        hasLoginError && <strong>Credentials are invalid</strong>
      }
    </>
  );
}
*/

