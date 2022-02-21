import React, { useState } from 'react'
import { useSelector } from "react-redux"
import QRCode from "react-qr-code";

function Metrics() {

  const metrics = useSelector((state) => state.rootReducerPostulante.metrics)
  //console.log(metrics)


  const [seniority, setSeniority] = useState(false);
  function metricSeniority() {
    setSeniority(!seniority);
  }

  const [language, setLanguage] = useState(false);
  function metricLanguage() {
    setLanguage(!language);
  }

  const [gender, setGender] = useState(false);
  function metricGender() {
    setGender(!gender);
  }


  return (

    <div className="bg-verdeMedio rounded-2xl p-2 text-zinc-400 w-full h-full ">
      <p>Optimized your future</p>
      <div>Metrics & Trends</div>
      {/*SENIORITY*/}
      <div className="flex m-0 justify-center">
        <div>
          {seniority === false ?
            <> <button
              className="h-fit mx-4 px-2  my-2 shadow-lg mt-1 shadow-black rounded-2xl 
         text-verdeHover bg-verdeOscuro hover:bg-verdeClaro"
              onClick={() => metricSeniority()}> Trends by seniority </button>
            </> :
            <><button
              className="h-fit mx-4 px-2  my-2 mt-1 shadow-lg shadow-black rounded-2xl 
       text-verdeHover bg-verdeOscuro hover:bg-verdeClaro"
              onClick={() => metricSeniority()}>see less</button>
              <div>  <p> {metrics ? <p> First place : JavaScript 68% <br /> Second place : React 45% <br /> Tercer place : NodeJs 42 % </p> : <p>No data</p>}  </p></div></>}
        </div>
      </div>
      {/*LANGUAGES*/}
      <div className="flex m-0 justify-center">
        <div>
          {language === false ?
            <> <button
              className="h-fit mx-4 px-2  my-2 shadow-lg mt-1 shadow-black rounded-2xl 
         text-verdeHover bg-verdeOscuro hover:bg-verdeClaro"
              onClick={() => metricLanguage()}> English </button>
            </> :
            <><button
              className="h-fit mx-4 px-2  my-2 mt-1 shadow-lg shadow-black rounded-2xl 
       text-verdeHover bg-verdeOscuro hover:bg-verdeClaro"
              onClick={() => metricLanguage()}>see less</button>
              <div>  <p>Percentage of jobs that require english {metrics ? <p> 70% </p> : <p>No data</p>}  </p></div></>}
        </div>
      </div>
      {/*GENDER*/}
      <div className="flex m-0 justify-center">
        <div>
          {gender === false ?
            <> <button
              className="h-fit mx-4 px-2  my-2 shadow-lg mt-1 shadow-black rounded-2xl 
         text-verdeHover bg-verdeOscuro hover:bg-verdeClaro"
              onClick={() => metricGender()}> Gender </button>
            </> :
            <><button
              className="h-fit mx-4 px-2  my-2 mt-1 shadow-lg shadow-black rounded-2xl 
       text-verdeHover bg-verdeOscuro hover:bg-verdeClaro"
              onClick={() => metricGender()}>see less</button>
              <div>  <p>Percentage of postulants by gender {metrics ? <p> Masc: 60% <br /> Fem : 25% <br /> Non-binary : 10 % <br /> Other : 5%  </p> : <p>No data</p>}  </p></div></>}
        </div>
      </div>
      <div>
        <div className="flex flex-col my-4 m-0 justify-center">
          <h2 className="text-center">Do you want to know more?</h2>
          <QRCode className="flex flex-col my-4 m-0 justify-center" value=" https://sueldos.openqube.io/encuesta-sueldos-2021.02/#Salarios-Segun-Tecnologia" size={160} bgColor="#282c34" fgColor="#fff" level="H" />

          <a className="flex flex-col my-4 m-0 justify-center" href="https://sueldos.openqube.io/encuesta-sueldos-2021.02/#Salarios-Segun-Tecnologia">Open Quebe Base </a>
          <p className=" text-center mt-2">Trends February 20200</p>
        </div>



      </div>

    </div>
  )
}

export default Metrics