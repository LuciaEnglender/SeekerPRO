import React from "react";
import NavHomeE from "../modules/NavHomeE";
// SOLO PARA COPIAR Y PEGAR
const Dashboard = () => {
  return (
    <div className="min-h-full">
      {/* NAVEGACION */}
      <NavHomeE />
      {/* BODYssss */}

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Home</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* !!!!!!!!!! DE ACA PARA ABAJO CSS !!!!!!!! */}

          {/* /End replace */}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
