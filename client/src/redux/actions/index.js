import axios from "axios";

//Get BUSINESS DETAIL DE PROFILE
export function getProfile(payload) {
  return async function (dispatch) {
    const profile = await axios.get(
      `/business?name=${payload}`
    );
    return dispatch({
      type: "GET_BISSNESS_DETAIL",
      payload: profile.data,
    });
  };
}

//POST PARA CREAR VACANTES
export function postVacancy(payload) {
  return async function () {
    const res = await axios.post("/vacancy", payload);
    return res;
  };
}
//GET PARA VER TODAS MIS VACANTES COMO EMPRESAs
export function getVacancy() {
  return async function (dispatch) {
    const res = await axios.get("/vacancy");
    return dispatch({
      type: "GET_VACANCY",
      payload: res.data,
    });
  };
}
//GET PARA VER LOS DETTALLES DE UNA DE MIS VACANTESs
export function getVacancyDetail(id) {
  return async function (dispatch) {
    const res = await axios.get(`/vacancy?id=${id}`);
    return dispatch({
      type: "GET_VACANCY_ID",
      payload: res.data,
    });
  };
}

// ESTA AREA ES PARA BUSCAR A LOS USUARIOS QUE NO SON VACANTES O SEA DEL TODA LA BASE DE DATOS
//get para traer a todos los usuario
export function getProfiles() {
  return async function (dispatch) {
    const res = await axios.get("/postulant");
    return dispatch({
      type: "GET_PROFILES",
      payload: res.data,
    });
  };
}
//get para buscar por nombre "searchBar"
export function getSearchName(name) {
  return async function (dispatch) {
    var res = await axios.get(`/postulant?name=${name}`);

    return dispatch({
      type: "GET_NAME_PROFILE",
      payload: res.data,
    });
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
//(http falso...)
export function getPostulados() {
  return async function (dispatch) {
    const res = await axios.get(`/vacancy//postulantes`);
    return dispatch({
      type: "GET_POSTULADOS",
      payload: res.data,
    });
  };
}

// ESTA AREA ES PARA EL FORM DE CREACION DE VACANTES
//treaer las tecnologias para el form
export function getTech() {
  return async function (dispatch) {
    const res = await axios.get("/tech");
    return dispatch({
      type: "GET_TECH",
      payload: res.data,
    });
  };
}
//treaer las seniority para el form
export function getSeniority() {
  return async function (dispatch) {
    const res = await axios.get("/seniority");
    return dispatch({
      type: "GET_SENIORITY",
      payload: res.data,
    });
  };
}
//treaer las Lenguaje de programacion para el form
export function getSkills() {
  return async function (dispatch) {
    const res = await axios.get("/skills");
    return dispatch({
      type: "GET_SKILLS",
      payload: res.data,
    });
  };
}
//get para trert los idiomas para el form
export function getLanguage() {
  return async function (dispatch) {
    const res = await axios.get("/languages");
    return dispatch({
      type: "GET_LANGUAGE",
      payload: res.data,
    });
  };
}

//get para traerme un postulante particular y PARA LA SEARCHBAR ES EL MISMO
export function postulanteDetail(name) {
  return async function (dispatch) {
    try {
      let det = await axios.get(`/business/${name}`);
      return dispatch({
        type: "GET_DETAIL_POSTULANTE",
        payload: det.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}
//fn para filtrar segun estado de la pipeline
export function filterStatusPipeline(estado) {
  return async function (dispatch) {
    try {
      let det = await axios.get(
        `/postulant?name=${estado}`
      );
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
    const res = await axios.post("/business", payload);
    return dispatch({
      type: "POST_EMPRESA",
      payload: res.data,
    });
  };
}
