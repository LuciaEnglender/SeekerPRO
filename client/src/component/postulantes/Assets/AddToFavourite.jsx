import React from 'react';
import {useDispatch} from "react-redux"
import {addFavourite} from '../../../redux/actions/indexP'

/*recibo por destructuring id de la vacante y dispatcho un post?*/

function AddToFavourite() {
 
const  dispatch = useDispatch()

function handleClick () {
    dispatch(addFavourite());
}

  return <div>
       <button onClick ={() => handleClick()}> LIKE </button>
  </div>;
}

export default AddToFavourite;
