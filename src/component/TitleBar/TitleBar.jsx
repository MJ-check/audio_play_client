import React, { useState, useEffect } from "react";
import "./TitleBar.css";
import "antd/dist/antd.css";
import { Link } from "react-router-dom";
import { Layout, Menu, Spin } from "antd";
const { Header, Content, Sider } = Layout;

/**
 * config = {
 *    header: [{
 *      title: "XXX",
 *      key: "XXX",
 *      link: "XXX",   
 *    }, {
 *      title: "XXX",
 *      key: "XXX",
 *      link: "XXX",
 *    },...],
 *    defaultSelectedHeaderKey: "XXX",
 *    haveSider: true / false,
 *    sider: [{                          // When haveSider is true
 *      name: "XXX",
 *      key: "XXX",
 *      content: component1,
 *    }, {
 *      name: "XXX",
 *      key: "XXX",
 *      content: component2,
 *    },...],
 *    defaultSelectedSiderKey: "XXX",   // When haveSider is true
 *    mainContent: mainComponent,       // When haveSider is false
 *    haveNew: true / false,
 *    handleHaveNew: function / component  // when haveNew is true
 * }
 */

const TitleBar = ({ config }) => {
  const [mainContent, setMainContent] = useState(null);

  useEffect(() => {
    if (config.haveSider === false) {
      setMainContent(config.mainContent);
    } else {
      config.sider.forEach((item) => {
        if (item.key === config.defaultSelectedSiderKey) {
          setMainContent(item.content);
        }
      });
    }
  }, [config]);
  const handleClickOnMenuItem = (index) => {
    setMainContent(config.sider[index].content);
  };

  return (
    <Layout className="title-bar">
      <Header className="header">
        <div className="logo" />
        <Menu 
          theme="dark" 
          mode="horizontal" 
          defaultSelectedKeys={[config.defaultSelectedHeaderKey]}
        >
          {config.header.map((item) => {
            return (
              <Menu.Item key={item.key} className="top-menu-item">
                <Link to={item.link}>
                  {item.title}
                </Link>
              </Menu.Item>
            );
          })}
        </Menu>
      </Header>
      <Content className="content">
        <Layout className="content-box">
          <div>
            {config.haveSider ? (
              <Sider className="sider" width={200}>
                <Menu
                  className="menu-box"
                  mode="inline"
                  defaultSelectedKeys={[config.defaultSelectedSiderKey]}
                >
                  {config.sider.map((item, index) => {
                    return (
                      <Menu.Item 
                        key={item.key}
                        onClick={() => handleClickOnMenuItem(index)}
                      >
                        {item.name}
                      </Menu.Item>
                    );
                  })}
                </Menu>
              </Sider>
            ) : ""}
            {config.haveNew ? (
              <div className="have-new-container">
                {config.handleHaveNew}
              </div>
            ): ""}
          </div>
          <Content className="main-content">
            {mainContent === null ? (
              <div className="main-content-loading">
                <Spin size="large" />
              </div>
            ) : mainContent}
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
}

export default TitleBar;