import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

function Business() {
    const { loginWithRedirect } = useAuth0();
  return <div>
       <div className='empresa'>
   <h2>Registrate como empresa </h2> 
   <button  onClick={() => loginWithRedirect()}>Use Google</button>  
</div>

  </div>;
}

export default Business;
