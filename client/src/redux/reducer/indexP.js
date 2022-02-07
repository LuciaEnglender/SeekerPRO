import {
  POST_POSTULANTE,GET_TECHNOLOGY, GET_SKILL,GET_LANGUAGE,GET_VACANCY,GET_FAVOURITES, GET_SEARCH_BAR, GET_PROFILE,
  FILTER_BY_LANGUAGE,FILTER_BY_SENIORITY,
  FILTER_BY_TECHNOLOGY,
  FILTER_BY_SKILL,
  FILTER_COMBINATED,
  ADD_FAVOURITE,
  GET_SENIORITY,
} from "../actions/indexP";

import nuevasVacantes from "../../component/pages/JSON/nuevasVacantes.json"

const initialState = {
  profile: [],
  technology: [],
  skill: [],
  language: [],
  seniority: [],
  location:[],
  vacancy: nuevasVacantes,
  favourites:[],
  filteredVacancy:[],

};


export default function rootReducerPostulante(state = initialState, action) {
  switch (action.type) {
    case POST_POSTULANTE:
      return {
        ...state,
      };
    case GET_TECHNOLOGY:
      return {
        ...state,
        technology: action.payload,
      };
    case GET_SKILL:
      return {
        ...state,
        skill: action.payload,
      };
    case GET_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };

    case GET_VACANCY:
    return {
      ...state,
      filteredVacancy: action.payload
    }
    case GET_FAVOURITES:
      return {
        ...state,
        favourites: action.payload,
      };
    case GET_SENIORITY:
      return {
        ...state,
        seniority: action.payload,
      }
      case GET_SEARCH_BAR:
        return {
          ...state,
          filteredVacancy: action.payload,
        };
      case GET_PROFILE:
         return {
         ...state,
          profile: action.payload,
        };

    case FILTER_BY_SENIORITY:
             return ({
          ...state,
        filteredVacancy: action.payload
        
       });
              
    case FILTER_BY_TECHNOLOGY:
                return {
            ...state,
          filteredVacancy: action.payload,
                }

    case FILTER_BY_SKILL:
                  return {
              ...state,
              filteredVacancy: action.payload,
                  }
  
     case FILTER_BY_LANGUAGE:{
                return {
            ...state,
            filteredVacancy: action.payload,
                }     
              }
              case FILTER_COMBINATED:
                return {
                   ...state,
                 filteredVacancy: action.payload,
                       };
         case ADD_FAVOURITE:
           return {
             ...state
           }

       default:
      return state;
  }
}
