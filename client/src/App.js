import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeEmpresa from "./component/empresas/HomeEmpresa";
import Home from "./component/postulantes/Home";
// import FormVacancy from "./component/empresas/FormVacancy";
import Landing from "./component/pages/Landing";
import Register from "./component/pages/Register";
import CreateForm from "./component/postulantes/Create";
import Perfil from "./component/postulantes/Perfil";
import SignUp from "./component/SignUp/SignUp";
import Notificaciones from "./component/postulantes/Notificaciones";
import Mensajes from "./component/postulantes/Mensajes";
import MiPerfil from "./component/postulantes/MiPerfil";
import Favourites from "./component/postulantes/Favourites";
import DetailPost from './component/postulantes/DetailPost'
import NotiEmp from "./component/empresas/NotiEmp";
import MensajeEmp from "./component/empresas/MensajeEmp";
import PerfilEmp from "./component/empresas/PerfilEmp";
import SetingsEmp from "./component/empresas/SetingsEmp";
import DetailVacy from "./component/empresas/DetailVacy";
import SearchPostu from "./component/empresas/SearchPostu";
import FormPerfil from "./component/empresas/FormPerfil";
import EditVcancy from "./component/empresas/modules/EditVcancy";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<SignUp />} />
      {/* RUTAS DE PERFIL */}
      <Route path="/homep" element={<Home />} />
      <Route path="/homep/create" element={<CreateForm />} />
      <Route path="/homep/notificaciones" element={<Notificaciones />} />
      <Route path="/homep/mensajes" element={<Mensajes />} />
      <Route path="homep/miperfil" element={<MiPerfil />} />
      <Route path="/homep/favourites" element={<Favourites />} />
      <Route path="/homep/create/modifyprofile" element={<Perfil />} />
      <Route path="/homep/postdetail/:id" element={<DetailPost/>}/>
      {/* RUTAS DE EMPRESA */}
      <Route path="/homee" element={<HomeEmpresa />} />
      <Route path="/homee/create" element={<FormPerfil />} />
      {/* <Route path="/homee/vacancy" element={<FormVacancy />} /> */}
      <Route path="/homee/notification" element={<NotiEmp />} />
      <Route path="/homee/message" element={<MensajeEmp />} />
      <Route path="/homee/perfil" element={<PerfilEmp />} />
      <Route path="/vacancy/:id" element={<DetailVacy />} />
      <Route path="/vacancy/edit/:id" element={<EditVcancy />} />
      <Route path="/homee/search" element={<SearchPostu />} />
      <Route path="/homee/perfil" element={<PerfilEmp />} />
      <Route path="/homee/setings" element={<SetingsEmp />} />
      {/* RUTAS DE REGISTRO */}
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
