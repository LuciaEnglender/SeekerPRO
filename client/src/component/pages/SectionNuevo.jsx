import React, { useState } from "react";
import { postEmail } from "../../redux/actions/indexL";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

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
    profile:"BUSINESS",
  });


  function handleSubmitP(e) {
    e.preventDefault();
    console.log(inputp);
    dispatch(postEmail(inputp));
    alert("Cuenta DEVELOPER creada!")
    setInputp({
      email: "",
      profile: "",
    });
    navigate("/homep/create");
  }

  function handleSubmitE(e) {
    e.preventDefault();
    console.log(inpute);
    dispatch(postEmail(inpute));
    alert("Cuenta EMPRESA creada!")
    setInpute({
      email: "",
      profile: "",
    });
    navigate("/homee/create");
  }

  return (
    <div>
      <div className="grid grid-cols-2">
        <div className="m-10">
          <h2 className="text-5xl font-bold pb-4">Como Developer</h2>
          <p className="pb-4 text-justify">
            We will help you to get in contact with recruiters all over the world, from the most relevant IT  companies.
          </p>
          <div className="flex m-0 justify-center">
            <button
              className="p-4 py-2 inline-block bg-gradient-to-r to-verdeClaro from-verdeMedio text-white font-bold rounded-3xl filter hover:drop-shadow  focus:outline-none focus:ring focus:ring-orange-600"
              value="DEVELOPER"
              onClick={(e) => handleSubmitP(e)}
            >
              Developer
            </button>
          </div>
        </div>
        <div className="m-10">
          <div>
            <h2 className="text-5xl font-bold pb-4">Como Recruiter</h2>
            <p className="pb-4 text-justify">
              We offer efficiency in the selection process in recruiting developers specialized in all technologies.
            </p>
            <div className="flex m-0 justify-center">
              <button
                className="p-4 py-2 inline-block bg-gradient-to-r to-verdeClaro from-verdeMedio text-white font-bold rounded-3xl filter hover:drop-shadow  focus:outline-none focus:ring focus:ring-orange-600"
                value="BUSINESS"
                onClick={(e) => handleSubmitE(e)}
              >
                Recruiter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionNuevo;
