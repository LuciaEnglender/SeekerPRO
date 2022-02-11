import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function PrivateRoute() {
  const { isAuthenticated } = useAuth0();
  let location = useLocation();

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
}

export default PrivateRoute;
