import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import { API } from "../helpers/api";
import { Typography } from "antd";

export default function Public() {
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   API({ endpoint: "/api/test/user" }).then((response) => setData(response));
  // }, [data]);

  return (
    <React.Fragment>
      <Typography.Title level={1}>Public Library</Typography.Title>
      <p>You are successfully logged in.</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </React.Fragment>
  );
}
