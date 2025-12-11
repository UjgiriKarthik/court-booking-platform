import React, { createContext, useContext, useState, useEffect } from "react";
import { setToken as setApiToken } from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setTokenState] = useState(null);

  // Load saved auth on refresh
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken) {
      setTokenState(savedToken);
      setApiToken(savedToken);
    }
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Set Token
  function setToken(newToken) {
    setTokenState(newToken);
    if (newToken) {
      localStorage.setItem("token", newToken);
      setApiToken(newToken);
    } else {
      localStorage.removeItem("token");
      setApiToken(null);
    }
  }

  // Set User
  function setUserData(newUser) {
    if (newUser) {
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
    } else {
      setUser(null);
      localStorage.removeItem("user");
    }
  }

  // ✅ ADD LOGOUT HERE — THIS WAS MISSING
  function logout() {
    setUser(null);
    setToken(null); // clears both state + localStorage
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        setUser: setUserData,
        setToken,
        logout,   // <-- Export logout here
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
