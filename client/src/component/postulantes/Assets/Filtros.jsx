import {
  filterBySeniority,
  filterByTechnology,
  filterBySkill,
  filterByLanguage,
  getLanguage,
  getSeniority,
  getSkill,
  getTechnology,
} from "../../../redux/actions/indexP";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { useEffect } from "react";

function Filtros() {
  const dispatch = useDispatch();

  const result = useSelector(
    (state) => state.rootReducerPostulante.filteredVacancy
  );

  //Filter by SINIORITY
  const allSeniority = useSelector(
    (state) => state.rootReducerPostulante.seniority
  );

  const [seniority, setSeniority] = useState("All");

  //Filter by TECHNOLOGY
  const [technology, setTechnology] = useState("All");
  const allTechnology = useSelector(
    (state) => state.rootReducerPostulante.technology
  );

  //Filter by SKILLS
  const [skills, setSkills] = useState("All");
  const allSkills = useSelector((state) => state.rootReducerPostulante.skill);

  //Filter by Language
  const [language, setLanguage] = useState("All");
  const allLanguages = useSelector(
    (state) => state.rootReducerPostulante.language
  );

  function handleSkills(e) {
    e.preventDefault();
    dispatch(filterBySkill(e.target.value));
    setSkills(e.target.value);
  }

  function handleByTechno(e) {
    e.preventDefault();
    dispatch(filterByTechnology({ technology: e.target.value }));
    setTechnology(e.target.value);
  }
  function handleSeniority(e) {
    e.preventDefault();
    dispatch(filterBySeniority({ seniority: e.target.value }));
    setSeniority(e.target.value);
  }

  function handleLanguage(e) {
    e.preventDefault();
    setLanguage(e.target.value);
    dispatch(filterByLanguage({ language: e.target.value }));
  }

  function handleClick(e) {
    e.preventDefault();
    //  dispatch(filterBySiniority(e.target.value));
    // dispatch(filterByTechnology(e.target.value));
    //  dispatch(filterBySkill(e.target.value));
    //  dispatch(filterByLanguage(e.target.value));
  }

  useEffect(() => {
    dispatch(getSeniority());
    dispatch(getLanguage());
    dispatch(getSkill());
    dispatch(getTechnology());
  }, []);

  return (
    <div>
      <div>
        <select onChange={(e) => handleSeniority(e)}>
          <option value="All"> Seniority </option>

          {allSeniority?.map((el, index) => (
            <option onClick={(e) => handleClick(e)} value={el.name} key={index}>
              {el.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <select onChange={(e) => handleByTechno(e)}>
          <option value="All"> Technology</option>
          {allTechnology?.map((el, index) => (
            <option onClick={(e) => handleClick(e)} value={el.name} key={index}>
              {el.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <select onChange={(e) => handleSkills(e)}>
          <option value="All"> Skills</option>
          {allSkills?.map((el, index) => (
            <option onClick={(e) => handleClick(e)} value={el.name} key={index}>
              {el.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <select onChange={(e) => handleLanguage(e)}>
          <option value="All"> Languages</option>
          {allLanguages?.map((el, index) => (
            <option onClick={(e) => handleClick(e)} value={el.name} key={index}>
              {el.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Filtros;
