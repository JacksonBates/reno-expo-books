import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { PrivateRoute, PublicRoute, SansMenuRoute } from "./routes";
import { AuthContext } from "../context/auth";

import Home from "./Home";
import Login from "./Login";
import Personal from "./Personal";
import Public from "./Public";
import Register from "./Register";

import "../styles/App.css";

export default function App() {
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  };

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <SansMenuRoute path="/login">
          <Login />
        </SansMenuRoute>
        <SansMenuRoute path="/signup">
          <Register />
        </SansMenuRoute>
        <PublicRoute exact path="/">
          <Home />
        </PublicRoute>
        <PublicRoute exact path="/public">
          <Public />
        </PublicRoute>
        <PrivateRoute path="/personal">
          <Personal />
        </PrivateRoute>
      </Router>
    </AuthContext.Provider>
  );
}
