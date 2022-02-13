import {
  POST_POSTULANTE,
  GET_TECHNOLOGY,
  GET_SKILL,
  GET_LANGUAGE,
  GET_VACANCY,
  GET_VACANCY_ID,
  GET_FAVOURITES,
  GET_SENIORITY,
  GET_SEARCH_BAR,
  GET_PROFILE,
  GET_MY_POSTULATIONS,
  GET_BUSINESS,
  GET_FOLLOWED,
  GET_SEE_LATER,
  FILTER_BY_LANGUAGE,
  FILTER_BY_SENIORITY,
  FILTER_BY_TECHNOLOGY,
  FILTER_BY_SKILL,
  FILTER_COMBINATED,
  ADD_FAVOURITES,
  GET_LOCATION,
  FOLLOW,
  UNFOLLOW,
  SEE_LATER,
  APPLY,
  REMOVE_POST,
  REMOVE_SEE_LATER
} from "../actions/indexP";

import nuevasVacantes from "../../component/pages/JSON/nuevasVacantes.json";

const initialState = {
  profile: [],
  technology: [],
  skill: [],
  language: [],
  seniority: [],
  location: [],
  vacancy: [],
  favourites: [],
  filteredVacancy: [],
  postulations: [],
  later: [],
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
    case GET_FAVOURITES:
      return {
        ...state,
        favourites: action.payload,
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
      later: action.payload,
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
    case ADD_FAVOURITES:
      return {
        ...state,
      };
    case FOLLOW:
      return {
        ...state,
             }
      case UNFOLLOW:
        return{
          ...state
        }
        case GET_FOLLOWED:
          return{
      ...state,
      followedBusiness: action.payload
        }
        
    case SEE_LATER:
      return {
        ...state,
        later: action.payload
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
