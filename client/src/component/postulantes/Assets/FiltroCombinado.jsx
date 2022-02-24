import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLanguage,
  getTechnology,
  getSkill,
  getSeniority,
  filterCombinated,
} from "../../../redux/actions/indexP";

function FiltroCombinado() {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.rootReducerPostulante.language);
  const tecno = useSelector((state) => state.rootReducerPostulante.technology);
  const skill = useSelector((state) => state.rootReducerPostulante.skill);
  const seniority = useSelector(
    (state) => state.rootReducerPostulante.seniority
  );

  useEffect(() => {
    dispatch(getLanguage());
    dispatch(getSeniority());
    dispatch(getTechnology());
    dispatch(getSkill());
    dispatch(filterCombinated(input));
  }, [dispatch]);

  const [input, setInput] = useState({
    technology: [],
    skill: [],
    language: [],
    seniority: [],
  });
  const handleCheck = (e) => {
    if (e.target.checked) {
      setInput({
        ...input,
        languages: input.language.concat(e.target.value),
        skills: input.skill.concat(e.target.value),
        technologies: input.technology.concat(e.target.value),
        seniority: input.seniority.concat(e.target.value),
      });
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(filterCombinated(input));
    setInput({
      technology: [],
      skill: [],
      language: [],
      seniority: [],
    });
  }
  console.log(input);
  return (
    <div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        {/*<div>
    <label>LANGUAGE</label>
              {language?.map((e) => (
                <div  key={e.id}>
                  <div>
                    <label>
                      <h2>{e.name}</h2>
                    </label>
                    <div>
                  <input 
                    value={e.name}
                    onClick={(e) => handleCheck(e)}
                    type="checkbox"
                    name={e.name}>
                    </input>
                    </div>
                  </div>
                </div>
              ))}
            </div>
              <br/>*/}
        <div>
          <div></div>
          <label>TECHNOLOGIES</label>

          {tecno?.map((e) => (
            <div key={e.id}>
              <div>
                <label>
                  <h2>{e.name}</h2>
                </label>
                <div>
                  <input
                    value={e.name}
                    onClick={(e) => handleCheck(e)}
                    type="checkbox"
                    name={e.name}
                  ></input>
                </div>
              </div>
            </div>
          ))}
        </div>
        <br />
        <div>
          <label>SKILL</label>
          {skill?.map((e) => (
            <div key={e.id}>
              <div>
                <label>{e.name}</label>
                <div>
                  <input
                    value={e.name}
                    onClick={(e) => handleCheck(e)}
                    type="checkbox"
                    name={e.name}
                  ></input>
                </div>
              </div>
            </div>
          ))}
        </div>
        <br />
        <div>
          <label>SINIORITIES</label>
          {seniority?.map((e) => (
            <div key={e.id}>
              <div>
                <label>
                  <h2>{e.name}</h2>
                </label>
                <div>
                  <input
                    value={e.name}
                    onClick={(e) => handleCheck(e)}
                    type="checkbox"
                    name={e.name}
                  ></input>
                </div>
              </div>
            </div>
          ))}
        </div>
      </form>
      <button type="submit"> SEARCH </button>
    </div>
  );
}

export default FiltroCombinado;
