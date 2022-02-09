import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { putUsers } from "../../redux/actions/indexL";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const SectionNuevo = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth0();

  const [input, setInput] = useState({
    profile: "",
  });

  function handleRecruiter(e) {
    e.preventDefault();
    console.log(input);
    setInput({
      profile: "BUSINESS",
    });
    dispatch(putUsers(input));
  }

  function handleDeveloper(e) {
    e.preventDefault();
    console.log(input);
    setInput({
      profile: "DEVELOPER",
    });
    dispatch(putUsers(input));
  }

  return (
    <>
      <div className="grid grid-cols-2">
        <div className="p-2">
          <h2 className="text-5xl  font-bold pb-4">Developer?</h2>
          <p className="pb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora,
            sapiente vero temporibus ullam voluptatibus modi maxime quis minima
            dicta iure hic, molestiae libero veritatis quos.
          </p>
          <Link to="/homee/create">
            <button
              className="p-4 ml-2 py-2 inline-block bg-gradient-to-r to-verdeClaro from-verdeMedio text-white font-bold rounded-3xl filter hover:drop-shadow"
              onClick={(e) => handleDeveloper(e)}
            >
              Empresa...
            </button>
          </Link>
        </div>
        <div className="p-2">
          <h2 className="text-5xl font-bold pb-4">Recruiter?</h2>
          <p className="pb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora,
            sapiente vero temporibus ullam voluptatibus modi maxime quis minima
            dicta iure hic, molestiae libero veritatis quos.
          </p>
          <Link to="/homep/create">
            <button
              className="p-4 ml-2 py-2 inline-block bg-gradient-to-r to-verdeClaro from-verdeMedio text-white font-bold rounded-3xl filter hover:drop-shadow"
              onClick={(e) => handleRecruiter(e)}
            >
              Recruitere...
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SectionNuevo;
