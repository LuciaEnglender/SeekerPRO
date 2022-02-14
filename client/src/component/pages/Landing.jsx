import React from "react";
import { Link, Navigate } from "react-router-dom";
import { ButtonLogIn, ButtonLogOutLanding } from "../../private/ButtonLogIn";
import ButtonSignIn from "../../private/ButtonSignIn";
import { useAuth0 } from "@auth0/auth0-react";
import { AiOutlineWhatsApp } from "react-icons/ai";

const Landing = () => {
  const { isAuthenticated } = useAuth0();
  // const dispatch = useDispatch();
  // const profileState = useSelector(
  //   (state) => state.rootReducerLanding.perfiles
  // );

  // useEffect(() => {
  //   dispatch(getUsers(profileState.email));
  // }, [dispatch, profileState]);

  return (
    <div className="p-9 bg-gray-300">
      <nav className=" grid grid-cols-2">
        <Link to="/">
          <h1 className="font-bold  text-2xl">JSeekers</h1>
          <h3 className="font-bold  text-2xl"> Optimized to make you grow</h3>
        </Link>
        <div>
          <div className="float-right">
            <div className="float-right">
              {isAuthenticated ? <ButtonLogOutLanding /> : <ButtonLogIn />}
            </div>
            <a
              href="#about"
              className="hover:opacity-100 opacity-70 text-lg mr-4"
            >
              About
            </a>
            <a
              href="#about"
              className="hover:opacity-100 mr-4 opacity-70 text-lg"
            >
              Contact
            </a>
            <a href="https://wa.me/número?text=Hola%somos%hired%pro">
              <AiOutlineWhatsApp/>
            </a>
          </div>
        </div>
      </nav>
      <section className="px-16 mt-32 mb-32">
        <div className="grid grid-cols-2">
          {isAuthenticated ? (
            <Navigate to={"/register"} />
          ) : (
            <div>
              <h2 className="text-5xl font-bold pb-4">Welcome!</h2>
              <p className="pb-4">
           
                
                
              </p>
           </div>
          )}
          <div>
            <img className="max-w-sm" src="/Landing.png" alt="asd" />
          </div>
        </div>
      </section>

      <section className="text-center mb-32">
        <div className="max-w-xl inline-block">
          <h1 className="text-4xl font-bold mb-4">How it Works?</h1>
          <p className="mb-4">
          JSeeker is an application that emerges to efficiently connect developers and recruiters.
Through an effective and minimalist system, it makes finding the right developer or the ideal position easier every day!
            
            
          </p>

          <div className="grid grid-cols-2 tex-center gap-4">
            <div className="pt-8">
              <h2 className="font-bold text-2xl"> Step 1</h2>
              <p>
              Register in a very simple way only with your email
                
              </p>
            </div>
            <div className="pt-8">
              <h2 className="font-bold text-2xl"> Step 2</h2>
              <p>
               Complete your data in a simple and dynamic form
                           </p>
            </div>
            <div className="pt-8">
              <h2 className="font-bold text-2xl"> Step 3</h2>
              <p>
              Browse the application looking for your ideal match in the IT world               
              </p>
            </div>
            <div className="pt-8">
              <h2 className="font-bold text-2xl"> Step 4</h2>
              <p>
              Enjoy your extra free time!                
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="about" className="px-16 mb-32">
        <div>
          <h2 className="text-5xl font-bold pb-4">About</h2>
          <p className="pb-4">
          JSeeker is an application that emerges to efficiently connect developers and recruiters.
<br/>
          Created in February 2022 by a group of students from Henry's bootcamp, this application was created to make the process of hiring workers in the IT world easier and more dynamic.<br/>
          JSekeer allows you to have an updated resume without having to spend too much time on it.
It also provides a series of statistical data so that the developer can continue training in a completely supported way... cause
anyone can help you get a job, we give you the right advice to grow in your career! <br/>
But also for the recruiters we bring an update... Connection without laps and metrics day by day that are marking the optimal work times. 
                    </p>
        </div>
      </section>
      <section id="contact" className="px-16 mb-32">
        <div>
          <h2 className="text-5xl font-bold pb-4">Contact</h2>
          <p className="pb-4">
          Doubts? Wanting to have the premium? ... Feel free to cantact us! <br/>
          Call our general manager of UX/UI Franco Montini to more details: +5490303456 <br/>
           Cordoba, Argentina </p>
          <Link to="/homep">
            {" "}
            <button className="p-4 py-2 inline-block bg-gradient-to-r from-verdeClaro to-verdeMedio text-white font-bold rounded-3xl filter hover:drop-shadow">
              Contact us!
            </button>{" "}
          </Link>
        </div>
      </section>
      <footer className="text-center py-8 border-t">
        <a className="hover:opacity-100 opacity-70 mr-4" href="a">
          JSeekers
        </a>
        <a className="hover:opacity-100 opacity-70 mr-4" href="a">
          About
        </a>
        <a className="hover:opacity-100 opacity-70 mr-4" href="a">
          Contact
        </a>
        <a className="hover:opacity-100 opacity-70" href="a">
          Por Henry Group PAPA!
        </a>
      </footer>
    </div>
  );
};

export default Landing;
