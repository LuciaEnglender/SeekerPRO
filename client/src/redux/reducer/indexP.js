import {
  //POSTULANT
  POST_POSTULANTE,
  GET_PROFILE,
  //GET
  GET_TECHNOLOGY,
  GET_SKILL,
  GET_LANGUAGE,
  GET_VACANCY,
  GET_VACANCY_ID,
  GET_SENIORITY,
  GET_LOCATION,
  GET_SEARCH_BAR,
  //POSTULATION
  GET_MY_POSTULATIONS,
  REMOVE_POST,
  APPLY,
  //FOLLOW
  GET_BUSINESS,
  GET_FOLLOWED,
  UNFOLLOW,
  FOLLOW,
  //PENDING
  GET_SEE_LATER,
  SEE_LATER,
  REMOVE_SEE_LATER,
  //FILTERS
  FILTER_BY_LANGUAGE,
  FILTER_BY_SENIORITY,
  FILTER_BY_TECHNOLOGY,
  FILTER_BY_SKILL,
  FILTER_COMBINATED,
} from "../actions/indexP";

import nuevasVacantes from "../../component/pages/JSON/nuevasVacantes.json";

const initialState = {
  profile: [
    { id: 1 }
  ],
  technology: [],
  skill: [],
  language: [],
  seniority: [],
  location: [],
  vacancy: [],
  filteredVacancy: [],
  postulations: [],
  pending: [],
  business: [],
  followedBusiness: []
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
        filteredVacancy: action.payload,
      };
      case GET_VACANCY_ID:
        return {
          ...state,
          filteredVacancy: action.payload,
        };   
    case GET_SENIORITY:
      return {
        ...state,
        seniority: action.payload,
      };
    case GET_LOCATION:
      return {
        ...state,
        location: action.payload,
      };
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
      case GET_BUSINESS:
        return {
          ...state,
         business: action.payload,
        };
  case  GET_SEE_LATER:
    return{
      ...state,
      pending: action.payload,
    }

    case FILTER_BY_SENIORITY:
      return {
        ...state,
        filteredVacancy: action.payload,
      };

    case FILTER_BY_TECHNOLOGY:
      return {
        ...state,
        filteredVacancy: action.payload,
      };

    case FILTER_BY_SKILL:
      return {
        ...state,
        filteredVacancy: action.payload,
      };

    case FILTER_BY_LANGUAGE: 
      return {
        ...state,
        filteredVacancy: action.payload,
      };
    
    case FILTER_COMBINATED:
      return {
        ...state,
        filteredVacancy: action.payload,
      };
    case FOLLOW:
      return {
        ...state,
              }
      case UNFOLLOW:
        return{
          ...state,          
        }
        case GET_FOLLOWED:
          return{
      ...state,
      followedBusiness: action.payload
        }
        
    case SEE_LATER:
      return {
        ...state,
        pending: action.payload
      }
    case GET_MY_POSTULATIONS:
      return {
        ...state,
        postulations: action.payload
      }
    case APPLY:
      return {
        ...state
      }
    case REMOVE_POST:
      return {
        ...state,
      }
      case REMOVE_SEE_LATER:
        return {
          ...state
        }
    default:
      return state;
  }
}
