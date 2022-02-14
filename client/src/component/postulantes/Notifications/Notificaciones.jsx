import React from 'react';
import Nav from '../NavBar'
import foto from '../../postulantes/Styles/Imagenes/Lunch.jpg'
import s from "../../postulantes/Styles/notificaciones.module.css"


function Notificaciones() {
  return <div>
        <Nav/>
    <div className={s.general}> 
    <img src= {foto} alt="As soon.." className={s.img}/>
 <h1 className={s.texto}> We will continue building this page... <br/>
 as soon as we come back from lunch!</h1>
 </div>

  </div>;
}

export default Notificaciones;
