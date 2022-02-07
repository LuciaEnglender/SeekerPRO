import React from "react";
import ButtonLogin from "../ui ux/ButtonLogin";
import s from "../postulantes/Styles/navBar.module.css"

const NavBar = () => {
  return (
    <div className={s.general}>
      <div >
      {/* <h1>LANDING</h1> */}
      <button >Contact Us</button>
      <button>About Us</button>
      <button>FAQ</button>
      <ButtonLogin></ButtonLogin>
    </div>
    </div>
    
  );
};

export default NavBar;
