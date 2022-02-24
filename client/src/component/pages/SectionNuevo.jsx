import React, { useState } from "react";
import { postEmail } from "../../redux/actions/indexL";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { ButtonLogOutLanding } from "../../private/ButtonLogIn";
import swal from "sweetalert";

const SectionNuevo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useAuth0();

  const datae = JSON.stringify(user.email);
  const email = datae.substring(1, datae.length - 1);
  // const [toggle, setToggle] = useState(true)
  const [inputp, setInputp] = useState({
    email: email,
    profile: "DEVELOPER",
  });

  const [inpute, setInpute] = useState({
    email: email,
    profile: "BUSINESS",
  });

  function handleSubmitP(e) {
    e.preventDefault();
    console.log(inputp);
    dispatch(postEmail(inputp));
    setInputp({
      email: "",
      profile: "",
    });
    navigate("/homep/create");
  }

  function handleSubmitE(e) {
    e.preventDefault();
    dispatch(postEmail(inpute));

    setInpute({
      email: "",
      profile: "",
    });
    navigate("/homee/create");
  }

  return (
    <div className="bg-nuevoFondo   h-screen">
      <nav className="p-4 px-10 md:px-16 grid grid-cols-2">
        <h3 className="font-bold md:text-5xl text-2xl">JSeekers</h3>
        <div>
          <div className="float-right">
            <div className="float-right">
              <ButtonLogOutLanding />
            </div>
          </div>
        </div>
      </nav>
      <section>
        <div className=" pt-35% px-10  bg-nuevoFondo">
          <div className="flex flex-col  md:flex-row ">
            <div className="my-7">
              <div className="md:mb-10">
                <h2 className="text-3xl md:text-5xl text-center font-bold pb-4">
                  Applicants
                </h2>
              </div>
              <div className="md:px-14 ">
                <p className="text-center md:text-center text-base">
                  We will help you to get in contact with recruiters all over
                  the world, from the most relevant IT companies.
                </p>
              </div>
              <div>
                <div className="flex mt-1 md:mt-10 justify-center">
                  <button
                    className="p-4 py-1 inline-block bg-gradient-to-r to-colorFondo1 from-colorDetalles text-white font-bold rounded-3xl filter hover:drop-shadow transition ease-in-out hover:-translate-y-1 hover:scale-105 "
                    value="DEVELOPER"
                    onClick={(e) => handleSubmitP(e)}
                  >
                    Applicants
                  </button>
                </div>
              </div>
            </div>
            <div className="my-7">
              <div className="md:mb-10">
                <h2 className="text-3xl md:text-5xl text-center  font-bold pb-4">
                  Recruiters
                </h2>
              </div>
              <div className="md:px-14 ">
                <p className="text-center md:text-center text-base">
                  We offer efficiency in the selection process in recruiting
                  developers specialized in all technologies.
                </p>
              </div>
              <div>
                <div className="flex mt-1 md:mt-10 justify-center">
                  <button
                    className="text-center p-4 py-1 inline-block bg-gradient-to-r to-colorFondo1 from-colorDetalles text-white font-bold rounded-3xl filter hover:drop-shadow transition ease-in-out hover:-translate-y-1 hover:scale-105 "
                    value="BUSINESS"
                    onClick={(e) => handleSubmitE(e)}
                  >
                    Recruiters
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SectionNuevo;
