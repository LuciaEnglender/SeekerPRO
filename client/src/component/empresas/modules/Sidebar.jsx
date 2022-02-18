import React from "react";
import { GrFormClose } from "react-icons/gr";
import { BiNetworkChart } from "react-icons/bi";
import { MdSpaceDashboard, MdEmojiPeople } from "react-icons/md";
import { BiMessageSquareDetail } from "react-icons/bi";
import { RiTeamFill } from "react-icons/ri";
import { GiPayMoney } from "react-icons/gi";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <aside className=" h-screen bg-colorFondo3 drop-shadow-2xl">
      <div className="bg-colorFondo3 flex items-center justify-between mt-6">
        <div className="flex gap-3">
          <img src="" alt="" className="w-8 h-8 " />
          <h2 className=" text-gray-800">
            J<span className="text-yellow-400"></span>seekers
          </h2>
        </div>
        <div className="none" id="close-btn">
          <span className="">
            <GrFormClose />
          </span>
        </div>
      </div>

      <div class="sidebar bg-colorFondo3">
        <Link
          to="/homee"
          className="sidebarLink pl-2 text-slate-800 rounded-l-2xl hover:rounded-l-2xl  focus:-translate-y-1  hover:-translate-y-1 active:translate-y-1 focus:rounded-l-2xl hover:bg-colorDetalles2 active:bg-colorFondo3 focus:bg-colorFondo1"
        >
          <MdSpaceDashboard />
          <h3>Home</h3>
        </Link>
        <Link
          to="/homee/vacancies"
          className="sidebarLink pl-2 text-slate-800 rounded-l-2xl hover:rounded-l-2xl  focus:-translate-y-1  hover:-translate-y-1 active:translate-y-1 focus:rounded-l-2xl hover:bg-colorDetalles2 active:bg-colorFondo3 focus:bg-colorFondo1"
        >
          <BiNetworkChart />
          <h3>Vacancies</h3>
        </Link>
        <Link
          to="/homee/message"
          className="sidebarLink pl-2 text-slate-800 rounded-l-2xl hover:rounded-l-2xl  focus:-translate-y-1  hover:-translate-y-1 active:translate-y-1 focus:rounded-l-2xl hover:bg-colorDetalles2 active:bg-colorFondo3 focus:bg-colorFondo1"
        >
          <BiMessageSquareDetail />
          <h3>Messages</h3>
          <span className="rounded-full bg-colorDetalles1  text-center w-8">
            <p className="mb-1">12</p>
          </span>
        </Link>
        <Link
          to="/homee/search"
          className="sidebarLink pl-2 text-slate-800 rounded-l-2xl hover:rounded-l-2xl  focus:-translate-y-1  hover:-translate-y-1 active:translate-y-1 focus:rounded-l-2xl hover:bg-colorDetalles2 active:bg-colorFondo3 focus:bg-colorFondo1"
        >
          <MdEmojiPeople />
          <h3>Postulantes</h3>
        </Link>
        <Link
          to="/homee/team"
          className="sidebarLink pl-2 text-slate-800 rounded-l-2xl hover:rounded-l-2xl  focus:-translate-y-1  hover:-translate-y-1 active:translate-y-1 focus:rounded-l-2xl hover:bg-colorDetalles2 active:bg-colorFondo3 focus:bg-colorFondo1"
        >
          <RiTeamFill />
          <h3>Team</h3>
        </Link>
        <Link
          to="/homee/mercado"
          className="sidebarLink pl-2 text-slate-800 rounded-l-2xl hover:rounded-l-2xl  focus:-translate-y-1  hover:-translate-y-1 active:translate-y-1 focus:rounded-l-2xl hover:bg-colorDetalles2 active:bg-colorFondo3 focus:bg-colorFondo1"
        >
          <GiPayMoney />
          <h3>Suscription</h3>
        </Link>
      </div>
    </aside>
  );
};

export default SideBar;
