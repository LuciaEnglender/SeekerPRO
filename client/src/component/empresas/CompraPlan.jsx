import React from "react";
import { Link } from "react-router-dom";
import NavHomeE from "./modules/NavHomeE";
import { useDispatch, useSelector } from "react-redux";
import {createOrder, getProfile} from '../../redux/actions/index'
import { useAuth0 } from "@auth0/auth0-react";


const CompraPlan = () => {
    const { user } = useAuth0();

    const email = JSON.stringify(user.email);
    const email2 = email.substring(1, email.length - 1);
    
  const dispatch = useDispatch()

    function handleClick(e) {
        dispatch(createOrder(email2))
    }

    return (
      <div>
          {/* <div>
        <NavHomeE titulo={"Mensajes"} />
        </div> */}
        <div>
            <h1>
            Suscribite a nuestro plan premium!
            </h1>
               {/* <button onClick={(e) => handleClick(e)}> */}
                    <Link to='/homee/mercado'>
                    Hacé click acá!
                    </Link>
                {/* </button> */}
        </div>
        <Link to="/homee">
          <button>Volver</button>
        </Link>
      </div>
    );
  };

  export default CompraPlan;
