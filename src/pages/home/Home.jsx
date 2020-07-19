import React, { useEffect, useState } from "react";
import "./Home.css";
import { Spin } from "antd";
import TitleBar from "../../component/TitleBar/TitleBar";
import { titleBarHeaderConfig } from "../../lib/config";
import HomeContent from "./HomeContent";

const Home = () => {
  const [titleBarConfig, setTitleBarConfig] = useState(null);

  useEffect(() =>{
    const config = Object.assign({
      defaultSelectedHeaderKey: "header1",
      haveSider: false,
      mainContent: <HomeContent />,
    }, titleBarHeaderConfig);
    setTitleBarConfig(config);
  }, []);

  return (
    <div className="page-home">
      {titleBarConfig === null ? (
        <div className="home-page-loading">
          <Spin size="large" />
        </div>
      ) : (
        <TitleBar config={titleBarConfig}/>
      )}
    </div>
  );
}

export default Home;