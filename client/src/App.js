import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeEmpresa from "./component/empresas/HomeEmpresa";
import Home from "./component/postulantes/Home";
import Landing from "./component/pages/Landing";
import CreateForm from "./component/postulantes/Create";
import Perfil from "./component/postulantes/Perfil";
import Notificaciones from "./component/postulantes/Notificaciones";
import Mensajes from "./component/postulantes/Mensajes";
import MiPerfil from "./component/postulantes/MiPerfil";
import Favourites from "./component/postulantes/Favourites";
import NotiEmp from "./component/empresas/NotiEmp";
import MensajeEmp from "./component/empresas/MensajeEmp";
import PerfilEmp from "./component/empresas/PerfilEmp";
import SetingsEmp from "./component/empresas/SetingsEmp";
import DetailVacy from "./component/empresas/DetailVacy";
import SearchPostu from "./component/empresas/SearchPostu";
import FormPerfil from "./component/empresas/FormPerfil";
import PrivateRoute from "./private/PrivateRoute";
import Register from "./private/Register";

function App() {
  return (
    <Routes>
      {/* LANDING */}
      <Route path="/" element={<Landing />} />
      <Route path="/register" element={<Register />} />
      <Route element={<PrivateRoute />}>
        {/* RUTAS DE PERFIL */}
        <Route path="/homep" element={<Home />} />
        <Route path="/homep/create" element={<CreateForm />} />
        <Route path="/homep/notificaciones" element={<Notificaciones />} />
        <Route path="/homep/mensajes" element={<Mensajes />} />
        <Route path="/homep/miperfil" element={<MiPerfil />} />
        <Route path="/homep/favourites" element={<Favourites />} />
        <Route path="/homep/create/modifyprofile" element={<Perfil />} />
        {/* RUTAS DE EMPRESA */}
        <Route path="/homee" element={<HomeEmpresa />} />
        <Route path="/homee/create" element={<FormPerfil />} />
        <Route path="/homee/notification" element={<NotiEmp />} />
        <Route path="/homee/message" element={<MensajeEmp />} />
        <Route path="/homee/perfil" element={<PerfilEmp />} />
        <Route path="/vacancy" element={<DetailVacy />} />
        <Route path="/homee/search" element={<SearchPostu />} />
        <Route path="/homee/perfil" element={<PerfilEmp />} />
        <Route path="/homee/setings" element={<SetingsEmp />} />
      </Route>
    </Routes>
  );
}

export default App;
