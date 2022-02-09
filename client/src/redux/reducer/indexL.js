const initialState = {
  perfiles: [],
};

function rootReducerLanding(state = initialState, action) {
  switch (action.type) {
    case "GET_USER_PERFILE":
      return {
        ...state,
        perfiles: action.payload,
      };
    case "PUT_USER_PROFILE":
      return {
        ...state,
        perfiles: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducerLanding;
