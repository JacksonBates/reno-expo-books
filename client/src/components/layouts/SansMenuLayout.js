import React from "react";
import { Layout } from "antd";

const { Content, Footer } = Layout;

export default function SansMenuLayout(props) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ margin: "24px 16px 0" }}>
        <div style={{ padding: 24, background: "#fff", minHeight: "80vh" }}>
          {props.children}
        </div>
      </Content>
      <Footer>Reno Expo Books</Footer>
    </Layout>
  );
}
