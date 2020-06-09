import React, { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { Button, Form, Input, message, Typography } from "antd";
import { useAuth } from "../context/auth";
import { login } from "../helpers/api";

export default function Login(props) {
  const history = useHistory();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthTokens } = useAuth();

  const referer = history?.location?.state?.referer || "/";

  const postLogin = () => {
    login({ username, password })
      .then((response) => {
        if (response.accessToken) {
          setAuthTokens(response.accessToken);
          setLoggedIn(true);
          message.success("Login successful!", 3);
        } else {
          message.error(response.reason, 3);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (isLoggedIn) return <Redirect to={referer} />;

  return (
    <React.Fragment>
      <Typography.Title level={1}>Login</Typography.Title>
      <Form onFinish={postLogin}>
        <Form.Item label="Username: ">
          <Input
            name="username"
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Password: ">
          <Input
            name="password"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Login
          </Button>
        </Form.Item>
      </Form>
      <Link to="/signup">Don't have an account?</Link>
    </React.Fragment>
  );
}
