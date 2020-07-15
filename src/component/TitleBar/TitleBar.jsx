import React from "react";
import "./TitleBar.css";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
const { Header, Content, Sider } = Layout;

const TitleBar = () => {
  return (
    <Layout className="title-bar">
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
      <Content className="content">
        <Layout className="content-box">
          <Sider className="sider" width={200}>
            <Menu
              className="menu-box"
              mode="inline"
              defaultSelectedKeys={["1"]}
            >
              <Menu.Item key="1">option1</Menu.Item>
              <Menu.Item key="2">option2</Menu.Item>
              <Menu.Item key="3">option3</Menu.Item>
              <Menu.Item key="4">option4</Menu.Item>
            </Menu>
          </Sider>
          <Content className="main-content"></Content>
        </Layout>
      </Content>
    </Layout>
  );
}

export default TitleBar;