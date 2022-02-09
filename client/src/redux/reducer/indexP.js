import {
  POST_POSTULANTE,
  GET_TECHNOLOGY, 
  GET_SKILL,
  GET_LANGUAGE,
  GET_VACANCY,
  GET_FAVOURITES, 
  GET_SENIORITY,
  GET_SEARCH_BAR, 
  GET_PROFILE,
  GET_MY_POSTULATIONS,
  FILTER_BY_LANGUAGE,
  FILTER_BY_SENIORITY,
  FILTER_BY_TECHNOLOGY,
  FILTER_BY_SKILL,
  FILTER_COMBINATED,
  FOLLOW,
  SEE_LATER,
  APPLY, 
  REMOVE_POST 
} from "../actions/indexP";

import nuevasVacantes from "../../component/pages/JSON/nuevasVacantes.json"

const initialState = {
  profile: [
    {id: 2}
  ] ,
  technology: [],
  skill: [],
  language: [],
  seniority: [],
  location:[],
  vacancy: nuevasVacantes,
  favourites:[],
  filteredVacancy:[],
  postulations: nuevasVacantes,
  later: []
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
         case FOLLOW:
           return {
             ...state
           }
           case SEE_LATER:
             return{
               ...state,
              later: action.payload
             }
             case GET_MY_POSTULATIONS:
              return{
                ...state,
               postulations: action.payload
              } 
              case APPLY:
                return{
                  ...state
                }
      case REMOVE_POST :
        return{
          ...state,
        }
       default:
      return state;
  }
}
