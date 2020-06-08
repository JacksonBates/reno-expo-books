import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth";

const { Content, Sider, Footer } = Layout;

export default function AppLayout(props) {
  const { setAuthTokens } = useAuth();

  const logout = (e) => {
    e.preventDefault();
    setAuthTokens();
    localStorage.removeItem("tokens");
  };

  return (
    <Layout>
      <Sider breakpoint="md" collapsedWidth="0">
        <Menu theme="dark" mode="inline">
          <Menu.Item key="1">
            <Link to={"/"}>
              <span className="nav-text">Home</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to={"/admin"}>
              <span className="nav-text">Admin</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to={"/login"} onClick={logout}>
              <span className="nav-text">Log out</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ minHeight: "100vh" }}>
        <Content style={{ margin: "24px 16px 0" }}>
          <div style={{ padding: 24, background: "#fff", minHeight: "80vh" }}>
            {props.children}
          </div>
        </Content>
        <Footer>Reno Expo Books</Footer>
      </Layout>
    </Layout>
  );
}
