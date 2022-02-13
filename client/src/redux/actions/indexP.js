import axios from "axios";
export const POST_POSTULANTE = "POST_POSTULANTE";
export const GET_TECHNOLOGY = "GET_TECHNOLOGY";
export const GET_SKILL = "GET_SKILL";
export const GET_LANGUAGE = "GET_LANGUAGE";
export const GET_IDIOMS = "GET_IDIOMS";
export const GET_VACANCY="GET_VACANCY"
export const GET_SENIORITY = "GET_SENIORITY"
export const GET_SEARCH_BAR="GET_SEARCH_BAR"
export const FILTER_BY_LANGUAGE = "FILTER_BY_LANGUAGE"
export const FILTER_BY_SENIORITY = "FILTER_BY_SENIORITY"
export const FILTER_BY_TECHNOLOGY="FILTER_BY_TECHNOLOGY"
export const FILTER_BY_SKILL="FILTER_BY_SKILL"
export const ADD_FAVOURITE = "ADD_FAVOURITE"
export const GET_FAVOURITES = "GET_FAVOURITES"
export const GET_PROFILE = "GET_PROFILE"
export const FILTER_COMBINATED = "FILTER_COMBINATED"

export function createPostulante(payload) {
  console.log(payload)
  
  return async function (dispatch) {
    try {
    const res= await axios.post("/postulant", payload);
      return dispatch({
        type: POST_POSTULANTE,
          payload: res
      });
    } catch (error) {
      alert("Post failed");
    }
  };
}

export function getTechnology() {
  return async function (dispatch) {
    try {
      const tecno = await axios.get("/tech");
      return dispatch({
        type: GET_TECHNOLOGY,
        payload: tecno.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getSkill() {
  return async function (dispatch) {
    try {
      const skill = await axios.get("/skills");
      return dispatch({
        type: GET_SKILL,
        payload: skill.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function getLanguage() {
  return async function (dispatch) {
    try {
      const language = await axios.get("/languages");
      return dispatch({
        type: GET_LANGUAGE,
        payload: language.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function getVacancy() {
  return async function (dispatch) {
    try {
      const vacantes = await axios.get("/vacancy");
      return dispatch({
        type: GET_VACANCY,
        payload:vacantes.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function getSearchBar(payload) {
  return async function (dispatch) {
      try {
          var json = await axios(`/vacancy/${payload}`);
          console.log(json.data)
          return dispatch ({
              type: GET_SEARCH_BAR,
              payload: json.data
          })
      }
      catch(error) {
              alert ("No data available")
      }
  }
}
export function getSeniority() {
  return async function (dispatch) {
    try {
      const seniority = await axios.get("/seniority");
      return dispatch({
        type: GET_SENIORITY,
        payload: seniority.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

}

export function getFavourites() {
  return async function (dispatch) {
    try {
      const fav = await axios.get("/favourites");
      return dispatch({
        type: GET_FAVOURITES,
        payload: fav.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function getProfile(payload) {
  return async function (dispatch) {
    try {
      const profile = await axios.get(`/postulant?id=${payload}`);
      return dispatch({
        type: GET_PROFILE,
        payload: profile.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterByLanguage (info) {
  return async function (dispatch) {
    try {
      const language = await axios.post("/allFiltersVacancy", info);
      return dispatch({
        type: FILTER_BY_LANGUAGE,
        payload: language.data,
      });
    } catch (error) {
      console.log(info);
    }
  };
}
export function filterBySeniority (info) {
  return async function (dispatch) {
    try {
      const seniority = await axios.post(`/allFiltersVacancy`, info)
      console.log( seniority.data)
      return dispatch({
        type: FILTER_BY_SENIORITY,
        payload: seniority.data,
       
      });
      
    } catch (error) {
      console.log(error);
    }
  };
}
export function filterByTechnology(info){
  return async function (dispatch) {
    try {
      const techno = await axios.post("/allFiltersVacancy", info);
      return dispatch({
        type: FILTER_BY_TECHNOLOGY,
        payload: techno.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterBySkill(info){
  return async function (dispatch) {
    try {
      const skill = await axios.post("/allFiltersVacancy", info);
      return dispatch({
        type: FILTER_BY_SKILL,
        payload: skill.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}   
export function filterCombinated (info) {
  return async function (dispatch) {
    try {
      const combinated = await axios.post("/allFiltersVacancy", info);
      console.log(combinated)
      return dispatch({
        type: FILTER_COMBINATED,
        payload: combinated.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function addFavourite (payload) {
  return async function(dispatch){
      try{
          await axios.post('/vacancy', payload);
          return {
              type: ADD_FAVOURITE,
              }
          } 
      catch(error){
            alert("We can't save it as favourite")
          }
      } 
} 
