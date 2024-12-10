import React from "react";

// React-Router-Dom
import { Navigate } from "react-router-dom";
// Auth0
import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth0();

  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

export default PrivateRoute;
