import React, { useState, useEffect } from "react";
import "./Upload.css";
import { Spin } from "antd";
import TitleBar from "../../component/TitleBar/TitleBar";
import { titleBarHeaderConfig } from "../../lib/config";

import { TestContent } from "../../test/index";

const Upload = () => {
  const [titleBarConfig, setTitleBarConfig] = useState(null);

  useEffect(() => {
    const config = Object.assign({
      defaultSelectedHeaderKey: "header3",
      haveSider: false,
      mainContent: <TestContent />,
    }, titleBarHeaderConfig);
    setTitleBarConfig(config);
  }, []);

  return (
    <div className="page-upload">
      {titleBarConfig === null ? (
        <div className="upload-page-loading">
          <Spin size="large" />
        </div>
      ) : (
        <TitleBar config={titleBarConfig} />
      )}
    </div>
  );
}

export default Upload;