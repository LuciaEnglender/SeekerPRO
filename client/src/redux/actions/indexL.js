import axios from "axios";

export function postEmail(payload) {
  return async function (dispatch) {
    try {
      const email = await axios.post(`/users/register`, payload);
      return email;
    } catch (e) {
      console.log(e);
    }
  };
}

export function getUsers(email) {
  return async function (dispatch) {
    try {
      const res = await axios.get(`/users/${email}`);
      return dispatch({
        type: "GET_USER_PERFILE",
        payload: res.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function putUsers(email) {
  return async function (dispatch) {
    try {
      const res = await axios.put(`/users/${email}`);
      return dispatch({
        type: "PUT_USER_PERFILE",
        payload: res.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}
