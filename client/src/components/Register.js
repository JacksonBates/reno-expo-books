import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { register } from "../helpers/api";
import { Button, Form, Input, message } from "antd";

export default function Register() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const postRegistration = () => {
    register({ username, password }).then((response) => {
      if (response.status === 200) {
        message.success(response.message, 3);
        history.push("/login");
      } else if (response.status >= 400) {
        setUsername("");
        setPassword("");
        message.error(response.message, 3);
      }
    });
  };

  return (
    <React.Fragment>
      <Form onFinish={postRegistration}>
        <Form.Item label="Username: ">
          <Input
            type="text"
            name="username"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Password: ">
          <Input
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Button htmlType="submit" type="primary">
          Sign Up
        </Button>
      </Form>
      <Link to="/login">Already have an account?</Link>
    </React.Fragment>
  );
}
