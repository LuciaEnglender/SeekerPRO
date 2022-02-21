import axios from "axios";

//Get BUSINESS DETAIL DE PROFILE
export function getProfile(email2) {
  return async function (dispatch) {
    try {
      const profile = await axios.get(
        `/business/find/${email2}`
      );
      return dispatch({
        type: "GET_BISSNESS_DETAIL",
        payload: profile.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//POST PARA CREAR VACANTES
export function postVacancy(payload) {
  return async function () {
    const res = await axios.post("/vacancy", payload);
    return res;
  };
}

//POST PARA CREAR VACANTES (pipeline)
export function postVacancyPipeline(id) {
  return async function (dispatch) {
    try {
      const res = await axios.post(`/pipeline/${id}`);
      return dispatch({
        type: 'POST_PIPELINE',
        payload: res
      })
    } catch (error) {
      console.log(error);
    }
  };
}

//GET PARA VER TODAS MIS VACANTES COMO EMPRESAS
export function getVacancy(business) {
  return async function (dispatch) {
    try {
      const res = await axios.get(
        `/vacancy?business=${business}`
      );
      return dispatch({
        type: "GET_VACANCY",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//GET PARA VER LOS DETALLES DE UNA DE MIS VACANTES
export function getVacancyDetail(id) {
  return async function (dispatch) {
    try {
      const res = await axios.get(`/vacancy/${id}`);
      return dispatch({
        type: "GET_VACANCY_ID",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//DELETE PARA BORRAR MI VACANTE
export function deleteVacancy(id) {
  return async function (dispatch) {
    try {
      const res = await axios.delete(`/vacancy/${id}`);
      return dispatch({
        type: "DELETE_VACANCY_ID",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//PUT PARA EDITAR MI VACANTE
export function editVacancy(id, input) {
  return async function (dispatch) {
    try {
      const res = await axios.put(
        `/vacancy/edit/${id}`,
        input
      );
      return dispatch({
        type: "EDIT_VACANCY_ID",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

// ESTA AREA ES PARA BUSCAR A LOS USUARIOS QUE NO SON VACANTES O SEA DE TODA LA BASE DE DATOS
//get para traer a todos los usuarios
export function getProfiles() {
  return async function (dispatch) {
    try {
      const res = await axios.get("/postulant");
      return dispatch({
        type: "GET_PROFILES",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//get para buscar por nombre "searchBar"
export function getSearchName(name) {
  return async function (dispatch) {
    try {
      var res = await axios.get(`/postulant/search/${name}`);
      return dispatch({
        type: "GET_NAME_PROFILE",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//filtros para el searchbar////////////////////////////////
export function byTech(payload) {
  return {
    type: "BY_TECH",
    payload,
  };
}

export function bySenior(payload) {
  return {
    type: "BY_SENIOR",
    payload,
  };
}

export function bySkills(payload) {
  return {
    type: "BY_SKILLS",
    payload,
  };
}

export function byLengua(payload) {
  return {
    type: "BY_LENGUAGE",
    payload,
  };
}

export function clearDetail() {
  return {
    type: "CLEAR_DETAIL",
  };
}

//GET PARA TRAER A LOS POSTULADOS DE UNA DE MIS VACANTES
export function getPostulados(id) {
  return async function (dispatch) {
    try {
      const res = await axios.get(`/vacancy/vacs/${id}`);
      return dispatch({
        type: "GET_POSTULADOS",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export function postulanteDetail(id) {
  return async function (dispatch) {
    try {
      const res = await axios.get(`/postulant?id=${id}`);
      return dispatch({
        type: "GET_POSTULADOS",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

// ESTA AREA ES PARA EL FORM DE CREACION DE VACANTES
//traer las tecnologias para el form
export function getTech() {
  return async function (dispatch) {
    try {
      const res = await axios.get("/tech");
      return dispatch({
        type: "GET_TECH",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//traer las seniority para el form
export function getSeniority() {
  return async function (dispatch) {
    try {
      const res = await axios.get("/seniority");
      return dispatch({
        type: "GET_SENIORITY",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//traer las Lenguajes de programacion para el form
export function getSkills() {
  return async function (dispatch) {
    try {
      const res = await axios.get("/skills");
      return dispatch({
        type: "GET_SKILLS",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//get para traer los idiomas para el form
export function getLanguage() {
  return async function (dispatch) {
    try {
      const res = await axios.get("/languages");
      return dispatch({
        type: "GET_LANGUAGE",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//get para traerme un postulante particular y PARA LA SEARCHBAR ES EL MISMO
/*export function postulanteDetail(name) {
  return async function (dispatch) {
    try {
      let det = await axios.get(
        `/business/search/${name}`
      );
      return dispatch({
        type: "GET_DETAIL_POSTULANTE",
        payload: det.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
};*/

export function postulantDetail(id) {
  console.log(id)
  return async function (dispatch) {
    try {
      const res = await axios.get(`/postulant?id=${id}`);
      return dispatch({
        type: "GET_POSTULADOS",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//fn para filtrar segun estado de la pipeline
export function filterStatusPipeline(estado) {
  return async function (dispatch) {
    try {
      let det = await axios.get(`/postulant/${estado}`);
      return dispatch({
        type: "GET_STATUS_PIPELINE",
        payload: det.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

//POST DEL FORM PARA COMPLETAR INFO DE EMPRESA
export function postEmpresa(payload) {
  return async function (dispatch) {
    try {
      const res = await axios.post("/business", payload);
      return dispatch({
        type: "POST_EMPRESA",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//FILTRO DE HOME EMPRESA PARA LOS SELECT
export function filterVacancies(info) {
  return async function (dispatch) {
    try {
      const combinated = await axios.post(
        "/allFiltersVacancy",
        info
      );
      return dispatch({
        type: "FILTER_VACANCIES",
        payload: combinated.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//SEARCH DE HOME FUNCIONANDO OK
export function getSearchBar(name) {
  return async function (dispatch) {
    try {
      let det = await axios.get(`/vacancy/search/${name}`);
      return dispatch({
        type: "GET_VACANCY_NAME",
        payload: det.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

//FILTRO DE HOME EMPRESA PARA LOS SELECT
export function filterSelects(info) {
  return async function (dispatch) {
    try {
      const combinated = await axios.post(
        "/allFiltersBusiness",
        info
      );
      return dispatch({
        type: "FILTER_POSTULANT",
        payload: combinated.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

// export function filterVacancies(info) {
//   return async function (dispatch) {
//     try {
//       const combinated = await axios.post(
//         "/allFiltersVacancy",
//         info
//       );
//       console.log(combinated);
//       return dispatch({
//         type: "FILTER_VACANCIES",
//         payload: combinated.data,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
// }

/////////////ACÁ ARRANCA EL EDIT

export function deleteTechnology(id, input) {
  return async function (dispatch) {
    try {
      const edit = await axios.put(`/vacancyEdit/${id}/technologyDelete`, { input: input })
      return dispatch({
        type: 'EDIT_TECHNOLOGY_DELETE_VACANCY',
        payload: edit.data
      })
    } catch (e) {
      console.log(e)
    }
  }
}

export function addTechnology(id, input) {
  return async function (dispatch) {
    try {
      const edit = await axios.put(`/vacancyEdit/${id}/technologyAdd`, { input: input })
      return dispatch({
        type: 'EDIT_TECHNOLOGY_ADD_VACANCY',
        payload: edit.data
      })
    } catch (e) {
      console.log(e)
    }
  }
}

export function deleteLanguage(id, input) {
  return async function (dispatch) {
    try {
      const edit = await axios.put(`/vacancyEdit/${id}/languageDelete`, { input: input })
      return dispatch({
        type: 'EDIT_LANGUAGE_DELETE_VACANCY',
        payload: edit.data
      })
    } catch (e) {
      console.log(e)
    }
  }
}

export function addLanguage(id, input) {
  return async function (dispatch) {
    try {
      const edit = await axios.put(`/vacancyEdit/${id}/languageAdd`, { input: input })
      return dispatch({
        type: 'EDIT_LANGUAGE_ADD_VACANCY',
        payload: edit.data
      })
    } catch (e) {
      console.log(e)
    }
  }
}

export function deleteSkill(id, input) {
  return async function (dispatch) {
    try {
      const edit = await axios.put(`/vacancyEdit/${id}/skillDelete`, { input: input })
      return dispatch({
        type: 'EDIT_SKILL_DELETE_VACANCY',
        payload: edit.data
      })
    } catch (e) {
      console.log(e)
    }
  }
}

export function addSkill(id, input) {
  return async function (dispatch) {
    try {
      const edit = await axios.put(`/vacancyEdit/${id}/skillAdd`, { input: input })
      return dispatch({
        type: 'EDIT_SKILL_ADD_VACANCY',
        payload: edit.data
      })
    } catch (e) {
      console.log(e)
    }
  }
}

export function deleteSeñority(id, input) {
  return async function (dispatch) {
    try {
      const edit = await axios.put(`/vacancyEdit/${id}/seniorityDelete`, { input: input })
      return dispatch({
        type: 'EDIT_SEÑORITY_DELETE_VACANCY',
        payload: edit.data
      })
    } catch (e) {
      console.log(e)
    }
  }
}

export function addSeñority(id, input) {
  return async function (dispatch) {
    try {
      const edit = await axios.put(`/vacancyEdit/${id}/seniorityAdd`, { input: input })
      return dispatch({
        type: 'EDIT_SEÑORITY_ADD_VACANCY',
        payload: edit.data
      })
    } catch (e) {
      console.log(e)
    }
  }
}

///ACA EMPIEZAN ACTIONS PARA LA PIPELINE////
export function removeAll(id, input) {
  return async function (dispatch) {
    try {
      const edit = await axios.put(`/pipeline/${id}/removeAll`, { input: input })
      return dispatch({
        type: 'EDIT_SEÑORITY_ADD_VACANCY',
        payload: edit.data
      })
    } catch (e) {
      console.log(e)
    }
  }
};

export function addNew(id, input) {
  return async function (dispatch) {
    try {
      const edit = await axios.put(`/pipeline/${id}/addNew`, { input: input })
      return dispatch({
        type: 'EDIT_LANGUAGE_DELETE_VACANCY',
        payload: edit.data
      })
    } catch (e) {
      console.log(e)
    }
  }
};

export function removeNew(id, input) {
  return async function (dispatch) {
    try {
      const edit = await axios.put(`/pipeline/${id}/removeNew`, { input: input })
      return dispatch({
        type: 'EDIT_SEÑORITY_ADD_VACANCY',
        payload: edit.data
      })
    } catch (e) {
      console.log(e)
    }
  }
};

export function addReview(id, input) {
  return async function (dispatch) {
    try {
      const edit = await axios.put(`/pipeline/${id}/addReview`, { input: input })
      return dispatch({
        type: 'EDIT_LANGUAGE_DELETE_VACANCY',
        payload: edit.data
      })
    } catch (e) {
      console.log(e)
    }
  }
};

export function removeReview(id, input) {
  return async function (dispatch) {
    try {
      const edit = await axios.put(`/pipeline/${id}/removeReview`, { input: input })
      return dispatch({
        type: 'EDIT_SEÑORITY_ADD_VACANCY',
        payload: edit.data
      })
    } catch (e) {
      console.log(e)
    }
  }
};

export function addContact(id, input) {
  return async function (dispatch) {
    try {
      const edit = await axios.put(`/pipeline/${id}/addContact`, { input: input })
      return dispatch({
        type: 'EDIT_LANGUAGE_DELETE_VACANCY',
        payload: edit.data
      })
    } catch (e) {
      console.log(e)
    }
  }
};

export function removeContact(id, input) {
  return async function (dispatch) {
    try {
      const edit = await axios.put(`/pipeline/${id}/removeContact`, { input: input })
      return dispatch({
        type: 'EDIT_SEÑORITY_ADD_VACANCY',
        payload: edit.data
      })
    } catch (e) {
      console.log(e)
    }
  }
};

export function addInterviewRRHH(id, input) {
  return async function (dispatch) {
    try {
      const edit = await axios.put(`/pipeline/${id}/addInterviewRRHH`, { input: input })
      return dispatch({
        type: 'EDIT_LANGUAGE_DELETE_VACANCY',
        payload: edit.data
      })
    } catch (e) {
      console.log(e)
    }
  }
};

export function removeInterviewRRHH(id, input) {
  return async function (dispatch) {
    try {
      const edit = await axios.put(`/pipeline/${id}/removeInterviewRRHH`, { input: input })
      return dispatch({
        type: 'EDIT_SEÑORITY_ADD_VACANCY',
        payload: edit.data
      })
    } catch (e) {
      console.log(e)
    }
  }
};

export function addInterviewTech(id, input) {
  return async function (dispatch) {
    try {
      const edit = await axios.put(`/pipeline/${id}/addInterviewTech`, { input: input })
      return dispatch({
        type: 'EDIT_LANGUAGE_DELETE_VACANCY',
        payload: edit.data
      })
    } catch (e) {
      console.log(e)
    }
  }
};

export function removeInterviewTech(id, input) {
  return async function (dispatch) {
    try {
      const edit = await axios.put(`/pipeline/${id}/removeInterviewTech`, { input: input })
      return dispatch({
        type: 'EDIT_SEÑORITY_ADD_VACANCY',
        payload: edit.data
      })
    } catch (e) {
      console.log(e)
    }
  }
};

export function addOffered(id, input) {
  return async function (dispatch) {
    try {
      const edit = await axios.put(`/pipeline/${id}/addOffered`, { input: input })
      return dispatch({
        type: 'EDIT_LANGUAGE_DELETE_VACANCY',
        payload: edit.data
      })
    } catch (e) {
      console.log(e)
    }
  }
};

export function removeOffered(id, input) {
  return async function (dispatch) {
    try {
      const edit = await axios.put(`/pipeline/${id}/removeOffered`, { input: input })
      return dispatch({
        type: 'EDIT_SEÑORITY_ADD_VACANCY',
        payload: edit.data
      })
    } catch (e) {
      console.log(e)
    }
  }
};

export function addHired(id, input) {
  return async function (dispatch) {
    try {
      const edit = await axios.put(`/pipeline/${id}/addHired`, { input: input })
      return dispatch({
        type: 'EDIT_LANGUAGE_DELETE_VACANCY',
        payload: edit.data
      })
    } catch (e) {
      console.log(e)
    }
  }
};

export function removeHired(id, input) {
  return async function (dispatch) {
    try {
      const edit = await axios.put(`/pipeline/${id}/removeHired`, { input: input })
      return dispatch({
        type: 'EDIT_SEÑORITY_ADD_VACANCY',
        payload: edit.data
      })
    } catch (e) {
      console.log(e)
    }
  }
};

export function addRejected(id, input) {
  return async function (dispatch) {
    try {
      const edit = await axios.put(`/pipeline/${id}/addRejected`, { input: input })
      return dispatch({
        type: 'EDIT_LANGUAGE_DELETE_VACANCY',
        payload: edit.data
      })
    } catch (e) {
      console.log(e)
    }
  }
};

export function removeRejected(id, input) {
  return async function (dispatch) {
    try {
      const edit = await axios.put(`/pipeline/${id}/removeRejected`, { input: input })
      return dispatch({
        type: 'EDIT_SEÑORITY_ADD_VACANCY',
        payload: edit.data
      })
    } catch (e) {
      console.log(e)
    }
  }
};


export function createOrder(userId){
  console.log(userId)
  return async function(dispatch){
    const order = await axios.post(`/order`, {userId: userId});
    return dispatch({
      type: 'CREATE_ORDER',
      payload : order.data
    })
  }
}

