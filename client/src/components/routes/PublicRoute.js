import React from "react";
import { Route } from "react-router-dom";
import AppLayout from "../AppLayout";

export default function PublicRoute({ children, ...rest }) {
  return (
    <Route {...rest}>
      <AppLayout>{children}</AppLayout>
    </Route>
  );
}
