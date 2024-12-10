import React, { createContext, useContext, useEffect, useState } from "react";

// Auth0
import { useAuth0 } from "@auth0/auth0-react";

// createContext
const UserContext = createContext();

// provider
const UserProvider = ({ children }) => {
  const { isAuthenticated, loginWithRedirect, logout, user } =
    useAuth0();
  const [myUser, setMyUser] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      setMyUser(user);
    } else {
      setMyUser(false);
    }
  }, [isAuthenticated]);

  return (
    <UserContext.Provider value={{ loginWithRedirect, logout, myUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

// custom Hook 
export const useUserContext = () => useContext(UserContext);