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
export const FOLLOW = "FOLLOW"
export const GET_FAVOURITES = "GET_FAVOURITES"
export const GET_PROFILE = "GET_PROFILE"
export const FILTER_COMBINATED = "FILTER_COMBINATED"
export const ADD_FAVOURITES = "ADD_FAVOURITES"
export const GET_LOCATION= "GET_LOCATION"
export const APPLY = "APPLY"
export const SEE_LATER= "SEE_LATER"
export const GET_MY_POSTULATIONS = "GET_MY_POSTULATIONS"
export const REMOVE_POST = "REMOVE_POST" 
export const REMOVE_SEE_LATER = "REMOVE_SEE_LATER"
export const GET_BUSINESS = "GET_BUSINESS"

export function createPostulante(payload) {
 // console.log(payload)
  
  return async function (dispatch) {
    try {
    const res= await axios.post("http://localhost:3001/postulant", payload);
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
      const tecno = await axios.get("http://localhost:3001/tech");
      return dispatch({
        type: GET_TECHNOLOGY,
        payload: tecno.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getLocation() {
  return async function (dispatch) {
    try {
      const loc = await axios.get("http://localhost:3001/location");
      return dispatch({
        type: GET_LOCATION,
        payload: loc.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}


export function getSkill() {
  return async function (dispatch) {
    try {
      const skill = await axios.get("http://localhost:3001/skills");
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
      const language = await axios.get("http://localhost:3001/languages");
      return dispatch({
        type: GET_LANGUAGE,
        payload: language.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
//Trae todas las vacantes de todas las empresas
export function getVacancy() {
  return async function (dispatch) {
    try {
      const vacantes = await axios.get("http://localhost:3001/vacancy");
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
          var json = await axios(`http://localhost:3001/vacancy/${payload}`);
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
      const seniority = await axios.get("http://localhost:3001/seniority");
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
      const fav = await axios.get("http://localhost:3001/favourites");
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
      const profile = await axios.get(`http://localhost:3001/postulant?id=${payload}`);
      return dispatch({
        type: GET_PROFILE,
        payload: profile.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function getMyPostulations(payload) {
  return async function (dispatch) {
    try {
      const postulations = await axios.get(`http://localhost:3001/postulant/${payload}/vacancy`);
      return dispatch({
        type: GET_MY_POSTULATIONS,
        payload: postulations.data,
      });
    } catch (error) {
      console.log("Postulations not founded");
    }
  };
}

export function filterByLanguage (info) {
  return async function (dispatch) {
    try {
      const language = await axios.post("http://localhost:3001/allFiltersVacancy", info);
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
      const seniority = await axios.post(`http://localhost:3001/allFiltersVacancy`, info)
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
      const techno = await axios.post("http://localhost:3001/allFiltersVacancy", info);
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
      const skill = await axios.post("http://localhost:3001/allFiltersVacancy", info);
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
      const combinated = await axios.post("http://localhost:3001/allFiltersVacancy", info);
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
//por params el id de la empresa y por body el id de vacante
export function follow ({id, vacancyId}) {
  return async function(dispatch){
      try{
          await axios.post(`http://localhost:3001/favorite/emp/${id}`, {vacancyId});
          return {
              type: FOLLOW,
              }
          } 
      catch(error){
            alert("You can't follow")
          }
      } 
} 


export function apply(id, postulanteId){
  console.log(id)
  console.log(postulanteId)
  return async function (){
    try{
      await axios.post(`http://localhost:3001/postulant/postulate/${postulanteId}`, id);
      return {
          type: APPLY,
          }
      } 
  catch(error){
        alert("Postulation failed")
      }
  } 
  }

    export function removePost(id, postulanteId){
      console.log(id)
      console.log(postulanteId)
      return async function (){
        try{
          await axios.put(`http://localhost:3001/postulant/postulate/${postulanteId}`, id);
          return {
              type: REMOVE_POST,
              }
          } 
      catch(error){
            alert("Can't remove")
          }
      } 
      }

      export function seeLater(id, postulanteId){
        console.log({id, postulanteId})
        return async function (){
          try{
            await axios.post(`http://localhost:3001/postulant/${postulanteId}`, {id});
            return {
                type: SEE_LATER,
                }
            } 
        catch(error){
              alert("Postulation failed")
            }
        } 
        }
    
        export function removeSeeLater(id, postulanteId){
          console.log(id)
          console.log(postulanteId)
          return async function (){
            try{
              await axios.put(`http://localhost:3001/postulant/postulate/${postulanteId}`, id);
              return {
                  type: REMOVE_SEE_LATER,
                  }
              } 
          catch(error){
                alert("Can't remove")
              }
          } 
          }
    export function getBusinees (){
      return async function () {
        try{
          const business = await axios.get("http://localhost:3001/business")
          return {
            type: GET_BUSINESS,
            payload: business.data
          }
        }
        catch(error){
          alert("Busniss not found")
        }
      }
    }