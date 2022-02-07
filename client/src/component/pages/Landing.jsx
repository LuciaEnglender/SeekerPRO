import React from "react";
import NavBar from "../ui ux/NavBar";
import {Link} from "react-router-dom"
import s from '../postulantes/Styles/landing.module.css'
import foto from '../postulantes/Styles/Imagenes/landing.png'
import ButtonLogin from "../ui ux/ButtonLogin";
import { useAuth0 } from "@auth0/auth0-react";

const Landing = () => {

  return (
    <div className={s.general}>
      <div> 
     
      <img src= {foto} alt="As soon.." className={s.img}/>
      
<div className={s.texto}>   
<ButtonLogin/>
  <Link to= "/homep" className={s.log}> SOY UN POSTULANTE </Link>
  <Link to= "/homee" className={s.log}> SOY UNA EMPRESA </Link> 
  </div>
      </div>
    </div>
  );
};

export default Landing;


/*import React from 'react'
import {useRoute, Link} from 'wouter'

import useUser from 'hooks/useUser'

import './Header.css'

export default function Header () {
  const {isLogged, logout} = useUser()
  const [match] = useRoute("/login");

  const handleClick = e => {
    e.preventDefault()
    logout()
  }

  const renderLoginButtons = ({isLogged}) => {
    return isLogged
      ? <Link to='#' onClick={handleClick}>
      Logout
      </Link>
      : <>
        <Link to='/login'>
          Login
        </Link>
        <Link to='/register'>
          Register
        </Link>
        </>
  }

  const content = match
    ? null
    : renderLoginButtons({isLogged})

  return (
    <header className='gf-header'>
      {content}
    </header>
  )
}*/