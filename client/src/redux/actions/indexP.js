import axios from "axios";
//POSTULANT
export const POST_POSTULANTE = "POST_POSTULANTE";
export const GET_PROFILE = "GET_PROFILE"
export const PUT_EDIT_PROFILE="PUT_EDIT_PROFILE"
//GET 
export const GET_TECHNOLOGY = "GET_TECHNOLOGY";
export const GET_SKILL = "GET_SKILL";
export const GET_LANGUAGE = "GET_LANGUAGE";
export const GET_IDIOMS = "GET_IDIOMS";
export const GET_LOCATION= "GET_LOCATION"
export const GET_SENIORITY = "GET_SENIORITY"
//VACANCIES
export const GET_VACANCY="GET_VACANCY"
export const GET_VACANCY_ID="GET_VACANCY_ID"
export const CLEAR_BUSINESS="CLEAR_BUSINESS"
//FILTERS
export const GET_SEARCH_BAR="GET_SEARCH_BAR"
export const FILTER_BY_LANGUAGE = "FILTER_BY_LANGUAGE"
export const FILTER_BY_SENIORITY = "FILTER_BY_SENIORITY"
export const FILTER_BY_TECHNOLOGY="FILTER_BY_TECHNOLOGY"
export const FILTER_BY_SKILL="FILTER_BY_SKILL"
export const FILTER_COMBINATED = "FILTER_COMBINATED"
//FOLLOW
export const FOLLOW = "FOLLOW"
export const UNFOLLOW = "UNFOLLOW"
export const GET_FOLLOWED = "GET_FOLLOWED"
export const GET_BUSINESS = "GET_BUSINESS"
export const ADD_FAVOURITES = "ADD_FAVOURITES"
//POSTULATION
export const APPLY = "APPLY"
export const GET_MY_POSTULATIONS = "GET_MY_POSTULATIONS"
export const REMOVE_POST = "REMOVE_POST" 
export const TO_PIPELINE = "TO_PIPELINE"
export const REMOVE_PIPELINE = "REMOVE_PIPELINE"
//PENDING
export const REMOVE_SEE_LATER = "REMOVE_SEE_LATER"
export const GET_SEE_LATER = "GET_SEE_LATER"
export const SEE_LATER= "SEE_LATER"
//EDITOR
export const EDIT_LOCATION_ADD_POSTULANT ='EDIT_LOCATION_ADD_POSTULANT'
export const EDIT_LOCATION_DELETE_POSTULANT ='EDIT_LOCATION_DELETE_POSTULANT'
export const EDIT_TECHNOLOGY_ADD_POSTULANT='EDIT_TECHNOLOGY_ADD_POSTULANT'
export const EDIT_TECHNOLOGY_DELETE_POSTULANT='EDIT_TECHNOLOGY_DELETE_POSTULANT'
export const EDIT_LANGUAGE_DELETE_POSTULANT='EDIT_LANGUAGE_DELETE_POSTULANT'
export const EDIT_LANGUAGE_ADD_POSTULANT= 'EDIT_LANGUAGE_ADD_POSTULANT'
export const EDIT_SKILL_DELETE_POSTULANT='EDIT_SKILL_DELETE_POSTULANT'
export const EDIT_SKILL_ADD_POSTULANT=' EDIT_SKILL_ADD_POSTULANT'
export const EDIT_SEÑORITY_DELETE_POSTULANT='EDIT_SEÑORITY_DELETE_POSTULANT'
export const EDIT_SEÑORITY_ADD_POSTULANT='EDIT_SEÑORITY_ADD_POSTULANT'

//ACTIONS
export function createPostulante(payload) {
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
export function getVacancyDetail(id) {
  return async function (dispatch) {
    const res = await axios.get(`http://localhost:3001/vacancy/${id}`);
    return dispatch({
      type: "GET_VACANCY_ID",
      payload: res.data,
    });
  };
}

export function getSearchBar(payload) {
  console.log('search', payload)
  return async function (dispatch) {
      try {
          var json = await axios(`http://localhost:3001/vacancy/search/${payload}`);
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
//FILTROS
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

//FOLLOW
export function getBusiness (){
  console.log("llego pedido a action")
  return async function (dispatch) {
    try{
      const business = await axios.get("http://localhost:3001/business")
      console.log("business", business.data)
      return dispatch( {
        type: GET_BUSINESS,
        payload: business.data
      })
    }
    catch(error){
      alert("Business not found")
    }
  }
}

export function followBusiness (postulanteId, id) {
 console.log("postulanteId", postulanteId, "businessId", id)
  return async function(dispatch){
      try{
          await axios.post(`http://localhost:3001/favorite/post/${postulanteId}`,{ id: id});
          return dispatch({
              type: FOLLOW,
              })
          } 
      catch(error){
            alert("You can't follow")
          }
      } 
} 
export function unfollow(postulanteId, businessId){
  console.log("postulante", postulanteId, "empresa" , businessId)
  return async function (){
    try{
      await axios.put(`http://localhost:3001/favorite/post/${postulanteId}`, {id:businessId});
      return {
          type: UNFOLLOW,
          }
      } 
  catch(error){
        alert("Can't unfollow, try later")
      }
  } 
  }
  export function getFollowed(postulanteId) {
    //console.log("postulante siguiendo", postulanteId)
    return async function (dispatch) {
      try {
        const followed = await axios.get(`http://localhost:3001/favorite/${postulanteId}/business`);
        return dispatch({
          type: GET_FOLLOWED,
          payload:followed.data,
        });
      } catch (error) {
        alert("Try later");
      }
    };
  }
  
  export function clearBusiness(){
return{
  type: CLEAR_BUSINESS
}
  }
  //APPLY POSTULATION

export function apply(id, postulanteId){
  //console.log(id)
  //console.log(postulanteId)
  return async function (){
    try{
      await axios.post(`http://localhost:3001/postulant/postulate/${postulanteId}`, {id:id});
      return {
          type: APPLY,
         
          }
      } 
  catch(error){
        alert("Postulation failed")
      }
  } 
  }
  export function toPipeline(id, postulanteId){
    console.log(id)
  return async function (dispatch) {
    try {
     const newPipe = await axios.put(`http://localhost:3001/pipeline/${id}/addNew`, {idPostulant:postulanteId})
     console.log("newPipe", newPipe)
     return dispatch ({
        type: TO_PIPELINE,
        payload : newPipe.data,       
      })
   
    }
  
    catch(error){
      console.log("Pipeline failed")
    }
  }
}
//por params id empresa, por body de postulante
export function removePipeline(id, postulanteId){
  return async function (dispatch){
    try{
      const edit = await axios.put(`http://localhost:3001/pipeline/${id}/removeAll`, {idPostulant: postulanteId})
      return dispatch({
        type: REMOVE_PIPELINE,
        payload : edit.data
      })
    } catch (e){
      console.log(e)
    }
  }
};


    export function removePost(id, postulanteId){
      console.log(id)
      console.log(postulanteId)
      return async function (){
        try{
          await axios.put(`http://localhost:3001/postulant/postulate/${postulanteId}`, {id:id});
          return {
              type: REMOVE_POST,
              }
          } 
      catch(error){
            alert("Can't remove")
          }
      } 
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

//PENDING     
      export function seeLater(id, postulanteId){
        console.log({id, postulanteId})
        return async function (){
          try{
            await axios.post(`http://localhost:3001/pending/${postulanteId}`, {id:id});
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
              await axios.put(`http://localhost:3001/pending/${postulanteId}`, {id:id});
              return {
                  type: REMOVE_SEE_LATER,
                  }
              } 
          catch(error){
                alert("Can't remove")
              }
          } 
          }
          export function getSeeLater(postulanteId) {
            console.log('getLater', postulanteId)
            return async function (dispatch) {
              try {
                const later = await axios.get(`http://localhost:3001/pending/${postulanteId}/vacancy`);
                return dispatch({
                  type: GET_SEE_LATER,
                  payload:later.data,
                });
              } catch (error) {
                console.log("Try later");
              }
            };
          }
        

          //MODIFY PROFILE
          export function editProfile(id,input){
            console.log("input action que enviamos",input)
            return async function(dispatch){
              try{
                const edit= await axios.put(`http://localhost:3001/postulant/${id}`, input)
                return dispatch({
                  type:PUT_EDIT_PROFILE,
                  payload: edit.data,
                })
              }catch(error){
              }
            };
          }

//EDITOR DE PSTULANTES

export function deleteLocation(id, input){
  console.log('soy id', id)
  console.log('soy input', input)

  return async function (dispatch){
    try{
      const edit = await axios.put(`http://localhost:3001/postulantEdit/${id}/locationDelete`, {input: input})
      return dispatch({
        type: EDIT_LOCATION_DELETE_POSTULANT,
        payload : edit.data
      })
    } catch (e){
      console.log(e)
    }
  }
}

export function addLocation(id, input){
  console.log('soy id', id)
  console.log('soy input', input)
  return async function (dispatch){
    try{
      const edit = await axios.put(`http://localhost:3001/postulantEdit/${id}/locationAdd`, {input: input})
      return dispatch({
        type: EDIT_LOCATION_ADD_POSTULANT,
        payload : edit.data
      })
    } catch (e){
      console.log(e)
    }
  }
}

export function deleteTechnology(id, input){
  console.log('soy id postulante', id)
  console.log('soy input', input)
  return async function (dispatch){
    try{
      const edit = await axios.put(`http://localhost:3001/postulantEdit/${id}/technologyDelete`, {input: input})
      return dispatch({
        type: EDIT_TECHNOLOGY_DELETE_POSTULANT,
        payload : edit.data
      })
    } catch (e){
      console.log(e)
    }
  }
}

export function addTechnology(id, input){
  console.log('soy id', id)
  console.log('input', input)

  return async function (dispatch){
    try{
      const edit = await axios.put(`http://localhost:3001/postulantEdit/${id}/technologyAdd`, {input: input})
      return dispatch({
        type: EDIT_TECHNOLOGY_ADD_POSTULANT,
        payload : edit.data
      })
    } catch (e){
      console.log(e)
    }
  }
}

export function deleteLanguage(id, input){
 
  return async function (dispatch){
    try{
      const edit = await axios.put(`http://localhost:3001/postulantEdit/${id}/languageDelete`, {input: input})
      return dispatch({
        type: EDIT_LANGUAGE_DELETE_POSTULANT,
        payload : edit.data
      })
    } catch (e){
      console.log(e)
    }
  }
}

export function addLanguage(id, input){
  console.log('soy id', id)
  console.log('soy input', input)
  return async function (dispatch){
    try{
      const edit = await axios.put(`http://localhost:3001/postulantEdit/${id}/languageAdd`, {input: input})
      return dispatch({
        type: EDIT_LANGUAGE_ADD_POSTULANT,
        payload : edit.data
      })
    } catch (e){
      console.log(e)
    }
  }
}

export function deleteSkill(id, input){
 
  return async function (dispatch){
    try{
      const edit = await axios.put(`http://localhost:3001/postulantEdit/${id}/skillDelete`, {input: input})
      return dispatch({
        type: EDIT_SKILL_DELETE_POSTULANT,
        payload : edit.data
      })
    } catch (e){
      console.log(e)
    }
  }
}

export function addSkill(id, input){
  return async function (dispatch){
    try{
      const edit = await axios.put(`http://localhost:3001/postulantEdit/${id}/skillAdd`, {input: input})
      return dispatch({
        type: EDIT_SKILL_ADD_POSTULANT,
        payload : edit.data
      })
    } catch (e){
      console.log(e)
    }
  }
}

export function deleteSeñority(id, input){
 
  return async function (dispatch){
    try{
      const edit = await axios.put(`http://localhost:3001/postulantEdit/${id}/seniorityDelete`, {input: input})
      return dispatch({
        type: EDIT_SEÑORITY_DELETE_POSTULANT,
        payload : edit.data
      })
    } catch (e){
      console.log(e)
    }
  }
}

export function addSeñority(id, input){
  return async function (dispatch){
    try{
      const edit = await axios.put(`http://localhost:3001/postulantEdit/${id}/seniorityAdd`, {input: input})
      return dispatch({
        type: EDIT_SEÑORITY_ADD_POSTULANT,
        payload : edit.data
      })
    } catch (e){
      console.log(e)
    }
  }
}


