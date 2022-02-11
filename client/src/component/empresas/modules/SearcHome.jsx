import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getVacancy,
    getTech,
    getSeniority,
    getLanguage,
  } from "../../../redux/actions/index";
  import { GrFormClose } from "react-icons/gr";

function SearcHome() {
    const dispatch = useDispatch();
    const technology = useSelector((state) => state.rootReducer.technology);
    const seniority = useSelector((state) => state.rootReducer.seniority);
    const language = useSelector((state) => state.rootReducer.language);

    const [input, setInput] = useState({
        name: "",
        description: "",
        technology: [],
        seniority: [],
        language: []
      })
      useEffect(() => {
        dispatch(getVacancy());
        dispatch(getTech());
        dispatch(getSeniority());
        dispatch(getLanguage());
      }, [dispatch]);

      function handleSelectTechno(e) {
        console.log(input.technology);
        if (input.technology.includes(e.target.value)) {
          alert("Already in the list");
        } else {
          setInput({
            ...input,
            technology: [...input.technology, e.target.value],
          });
        }
      }
    ///////////delete///////
  const handleDeleteSeniority = (e) => {
    setInput({
      ...input,
      seniority: input.seniority.filter((el) => el !== e),
    });
  };

  const handleDeleteLanguage = (e) => {
    setInput({
      ...input,
      language: input.language.filter((el) => el !== e),
    });
  };

  const handleDeleteTechnology = (e) => {
    setInput({
      ...input,
      technology: input.technology.filter((el) => el !== e),
    });
  };
    return (
        <div>
            <div className="bg-verdeOscuro p-2">
                <div className="bg-verdeMedio rounded-2xl p-2 w-full h-full">
                    <h1 className=" font-bold  text-center mb-3">Filtros:</h1>
                    <h1 className=" font-bold  text-center mb-3">(in work)</h1>
                    <div>
                        <div className="w-full flex flex-col m-0 justify-center">
                            <label> Buscar:</label>
                            <input
                                className="w-full xl:w-60 m-0 border-verdeMuyClaro rounded-2xl bg-verdeClaro"
                                type="text"
                            />
                        </div>
                        <div className="w-full my-3 flex flex-col m-0 justify-center">
                            <label> Tecnologias:</label>
                            <select 
                            className="w-full xl:w-52 rounded-2xl bg-verdeClaro"
                            name="technology"
                            onChange={(e) => handleSelectTechno(e)}
                            >
                                <option
                                    className="rounded-2xl bg-verdeClaro"
                                    selected="false"
                                >
                                </option>
                                {technology.map((e) => (
              <option className="rounded-2xl bg-verdeClaro">{e.name}</option>
            ))}
                            </select>
                            <div>
            {input.technology.map((el, i) => (
              <li
                className="flex flex-row w-fit list-none m-1 rounded-2xl bg-verdeHover"
                key={i}
              >
                {el}
                <button
                  className="rounded-2xl hover:bg-verdeClaro"
                  type="reset"
                  onClick={() => handleDeleteTechnology(el)}
                >
                  <GrFormClose />
                </button>
              </li>
            ))}
          </div>
          {/* <ul><li>{input.technology.map(el => el + " ,")}</li></ul> */}
        </div>
                        <div className="w-full my-3 flex flex-col m-0 justify-center">
                            <label> Lenguaje:</label>
                            <select className="w-full xl:w-52 rounded-2xl bg-verdeClaro">
                                <option selected="false">-</option>
                            </select>
                        </div>
                        <div className="w-full my-3 flex flex-col m-0 justify-center">
                            <label> Seniority:</label>
                            <select className="w-full xl:w-52 rounded-2xl bg-verdeClaro">
                                <option selected="false">-</option>
                            </select>
                        </div>
                        <div className="w-full  my-3 flex m-0 justify-center">
                            <button className=" w-32 shadow-lg shadow-black rounded-2xl text-verdeHover bg-verdeOscuro hover:bg-verdeClaro">
                                -
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearcHome