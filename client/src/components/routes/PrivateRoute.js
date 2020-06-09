import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { AppLayout } from "../layouts";

export default function PrivateRoute({ children, ...rest }) {
  const { authTokens } = useAuth();

  return (
    <Route {...rest}>
      {authTokens ? (
        <AppLayout>{children}</AppLayout>
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { referer: { ...rest }.path } }}
        />
      )}
    </Route>
  );
}
