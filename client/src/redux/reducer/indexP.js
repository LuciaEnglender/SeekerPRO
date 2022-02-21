import {
  //POSTULANT
  POST_POSTULANTE,
  GET_PROFILE,
  PUT_EDIT_PROFILE,
  //GET
  GET_TECHNOLOGY,
  GET_SKILL,
  GET_LANGUAGE,
  GET_SENIORITY,
  GET_LOCATION,
  GET_SEARCH_BAR,
  //VACANCY
  GET_VACANCY,
  GET_VACANCY_ID,
  SORT,
  //POSTULATION
  GET_MY_POSTULATIONS,
  REMOVE_POST,
  APPLY,
  TO_PIPELINE,
  REMOVE_PIPELINE,
  //FOLLOW
  GET_BUSINESS,
  GET_FOLLOWED,
  UNFOLLOW,
  FOLLOW,
  CLEAR_BUSINESS,
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
  //EDITOR POSTULANTE
  EDIT_LOCATION_DELETE_POSTULANT,
  EDIT_LOCATION_ADD_POSTULANT,
  EDIT_TECHNOLOGY_DELETE_POSTULANT,
  EDIT_TECHNOLOGY_ADD_POSTULANT,
  EDIT_LANGUAGE_ADD_POSTULANT,
  EDIT_LANGUAGE_DELETE_POSTULANT,
  EDIT_SKILL_DELETE_POSTULANT,
  EDIT_SKILL_ADD_POSTULANT,
  EDIT_SEÑORITY_DELETE_POSTULANT,
  EDIT_SEÑORITY_ADD_POSTULANT,
  //METRICS


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
  filteredVacancy: [],
  postulations: [],
  pending: [],
  business: [],
  followedBusiness: [],
  pipeline: [],
  metrics: [{ } ]
};


export default function rootReducerPostulante(state = initialState, action) {
  switch (action.type) {
    case POST_POSTULANTE:
      return {
        ...state,
      };
      case PUT_EDIT_PROFILE:
        return{
          ...state
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
        case CLEAR_BUSINESS:
          return {
              ...state,
              business : []
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
      case REMOVE_PIPELINE:
      return {
        ...state,
      }
      case REMOVE_SEE_LATER:
        return {
          ...state
        }
    case EDIT_LOCATION_DELETE_POSTULANT:
      return {
        ...state
      }
    case EDIT_LOCATION_ADD_POSTULANT :
      return {
        ...state
      }
      case EDIT_TECHNOLOGY_DELETE_POSTULANT:
      return {
        ...state
      }
    case EDIT_TECHNOLOGY_ADD_POSTULANT :
      return {
        ...state
      }
      case EDIT_LANGUAGE_DELETE_POSTULANT:
      return {
        ...state
      }
      case TO_PIPELINE :
        return {
          ...state,
          pipeline: action.payload
        }
    case EDIT_LANGUAGE_ADD_POSTULANT:
      return {
        ...state
      }
    case EDIT_SKILL_ADD_POSTULANT:
      return {
      ...state
     }
    case EDIT_SKILL_DELETE_POSTULANT:
      return {
        ...state
      }
      case EDIT_SEÑORITY_DELETE_POSTULANT:
      return {
      ...state
     }
    case EDIT_SEÑORITY_ADD_POSTULANT:
      return {
        ...state
      }
    
case SORT:
        if (action.payload === "default"){
            return {
                ...state,
                filteredVacancy: state.filteredVacancy
            }
        }
    if (action.payload === "az") {
        return {
            ...state,
            filteredVacancy: state.filteredVacancy.sort(function (a, b) {
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return 1;
                }
                if (b.name.toLowerCase() > a.name.toLowerCase()) {
                    return -1;
                }
                return 0
             }) 
        }
    } 
    if (action.payload === "za"){
        return{
            ...state,
            filteredVacancy: state.filteredVacancy.sort (function (a, b) {
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return -1;
                }
                if (b.name.toLowerCase() > a.name.toLowerCase()) {
                    return 1
                }
                return 0;
            }) 

        }
    }
   if(action.payload === "old" ){
       return {
           ...state,
           filteredVacancy: state.filteredVacancy.sort (function (a, b) {
            if (a.createdAt > b.createdAt) {
                return 1;
            }
            if (b.createdAt > a.createdAt) {
                return -1;
            }
            return 0                        
        }) 
       }
   }
   if(action.payload === "new"){
       return {
           ...state,
           filteredVacancy: state.filteredVacancy.sort (function (a, b) {
            if (a.createdAt > b.createdAt) {
                return -1;
            }
            if (b.createdAt> a.createdAt) {
                return 1
            }
            return 0;
        }) 
      }
   }
   else{
       return {
           ...state,
       }
   }

    default:
      return state;
  }
}
