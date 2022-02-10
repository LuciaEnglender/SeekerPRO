import React from "react";
import { Routes, Route } from "react-router-dom";

// Rutas compartidas
import SignUp from "./component/SignUp/SignUp";
import Landing from "./component/pages/Landing";
import Register from "./component/pages/Register";

//Rutas de Postulantes
import Home from "./component/postulantes/Home";
import CreateForm from "./component/postulantes/Create";
import Perfil from "./component/postulantes/Perfil";
import Notificaciones from "./component/postulantes/Notifications/Notificaciones";
import Mensajes from "./component/postulantes/Messages/Mensajes";
import MiPerfil from "./component/postulantes/MiPerfil";
import DetailPost from './component/postulantes/MyPostulations/DetailPost'
import Business from "./component/postulantes/FollowBusiness/Business";


//Rutas de Empresa
import HomeEmpresa from "./component/empresas/HomeEmpresa";
import NotiEmp from "./component/empresas/NotiEmp";
import MensajeEmp from "./component/empresas/MensajeEmp";
import PerfilEmp from "./component/empresas/PerfilEmp";
import SetingsEmp from "./component/empresas/SetingsEmp";
import DetailVacy from "./component/empresas/DetailVacy";
import SearchPostu from "./component/empresas/SearchPostu";
import FormPerfil from "./component/empresas/FormPerfil";
import EditVcancy from "./component/empresas/modules/EditVcancy";
// import FormVacancy from "./component/empresas/FormVacancy";
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
        <Route path="/homep/favourites" element={<Business/>} />
        <Route path="/homep/create/modifyprofile" element={<Perfil />} />
        <Route path="/homep/postdetail/:id" element={<DetailPost/>}/>
        {/* RUTAS DE EMPRESA */}
        <Route path="/homee" element={<HomeEmpresa />} />
        <Route path="/homee/create" element={<FormPerfil />} />
        <Route path="/homee/notification" element={<NotiEmp />} />
        <Route path="/homee/message" element={<MensajeEmp />} />
        <Route path="/homee/perfil" element={<PerfilEmp />} />
        <Route path="/vacancy" element={<DetailVacy />} />
        <Route path="/homee/search" element={<SearchPostu />} />
        <Route path="/vacancy/:id" element={<DetailVacy />} />
        <Route path="/vacancy/edit/:id" element={<EditVcancy />} />
        <Route path="/homee/setings" element={<SetingsEmp />} />
      </Route>
    </Routes>
  );
}

export default App;
