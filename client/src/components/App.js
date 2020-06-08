import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { PrivateRoute, PublicRoute, SansMenuRoute } from "./routes";
import { AuthContext } from "../context/auth";

import Admin from "./Admin";
import Home from "./Home";
import Login from "./Login";
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
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <PublicRoute exact path="/">
          <Home />
        </PublicRoute>
        <PrivateRoute path="/admin">
          <Admin />
        </PrivateRoute>
      </Router>
    </AuthContext.Provider>
  );
}
