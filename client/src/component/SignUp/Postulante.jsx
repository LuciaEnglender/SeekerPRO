import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

function Postulante() {
    const { loginWithRedirect } = useAuth0();
  return <div>
      <div className='postulante'>
 <h2>Registrate como postulante </h2> 
 <button onClick={(e) => loginWithRedirect(e)}>Use Google</button>  
 </div>
  </div>;
}

export default Postulante;
