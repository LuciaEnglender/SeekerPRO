import axios from "axios";

export function postEmail(payload) {
  return async function (dispatch) {
    const email = await axios.post(
      `http://localhost:3001/users/register`,
      payload
    );
    return email;
  };
}

export function getUsers(email) {
  return async function (dispatch) {
    const res = await axios.get(`http://localhost:3001/users/${email}`);
    return dispatch({
      type: "GET_USER_PERFILE",
      payload: res.data,
    });
  };
}
