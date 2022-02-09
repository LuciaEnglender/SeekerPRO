import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { ButtonsHomeE, ButtonsHomeP } from "../../private/ButtonsHome";
import ButtonSignIn from "../../private/ButtonSignIn";
import { getUsers, postEmail } from "../../redux/actions/indexL";
import { useDispatch, useSelector } from "react-redux";

const SectionT = () => {
  const dispatch = useDispatch();
  const { user } = useAuth0();
  const profileState = useSelector(
    (state) => state.rootReducerLanding.perfiles
  );
  const [input, setInput] = useState({
    name: "",
    email: "",
    photo: "",
    profile: "",
  });

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  function handleRecruiter(e) {
    e.preventDefault();
    dispatch(postEmail(input));
    console.log(input);
    setInput({
      name: user.name,
      email: user.email,
      photo: user.picture,
      profile: "BUSINESS",
    });
  }

  function handleDeveloper(e) {
    e.preventDefault();
    dispatch(postEmail(input));
    console.log(input);
    setInput({
      name: user.name,
      email: user.email,
      photo: user.picture,
      profile: "DEVELOPER",
    });
  }

  return (
    <div className="grid grid-cols-2">
      <div className="p-2">
        <h2 className="text-5xl  font-bold pb-4">Developer?</h2>
        <p className="pb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora,
          sapiente vero temporibus ullam voluptatibus modi maxime quis minima
          dicta iure hic, molestiae libero veritatis quos.
        </p>
        <button onClick={(e) => handleRecruiter(e)}> MANDELE</button>
      </div>
      <div className="p-2">
        <h2 className="text-5xl font-bold pb-4">Recruiter?</h2>
        <p className="pb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora,
          sapiente vero temporibus ullam voluptatibus modi maxime quis minima
          dicta iure hic, molestiae libero veritatis quos.
        </p>
        <button onClick={(e) => handleDeveloper(e)}> MANDELE</button>
      </div>
    </div>
  );
};

export default SectionT;
