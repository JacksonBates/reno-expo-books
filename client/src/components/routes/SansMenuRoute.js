import React from "react";
import { Route } from "react-router-dom";
import { SansMenuLayout } from "../layouts";

export default function SansMenuRoute({ children, ...rest }) {
  return (
    <Route {...rest}>
      <SansMenuLayout>{children}</SansMenuLayout>
    </Route>
  );
}
