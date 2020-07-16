import React, { useEffect, useState } from "react";
import "./List.css";
import { Spin } from "antd";
import TitleBar from "../../component/TitleBar/TitleBar";
import { titleBarHeaderConfig } from "../../lib/config";

import { TestContent, TestContent1, TestContent2, TestContent3 } from "../../test/index";

const List = () => {
  const [titleBarConfig, setTitleBarConfig] = useState(null);

  useEffect(() => {
    const config = Object.assign({
      defaultSelectedHeaderKey: "header2",
      haveSider: true,
      sider: [{                          
        name: "Option 1",
        key: "sider1",
        content: <TestContent />,
      }, {
        name: "Option 2",
        key: "sider2",
        content: <TestContent1 />,
      }, {
        name: "Option 3",
        key: "sider3",
        content: <TestContent2 />,
      }, {
        name: "Option 4",
        key: "sider4",
        content: <TestContent3 />,
      }],
      defaultSelectedSiderKey: "sider1",
    }, titleBarHeaderConfig);
    setTitleBarConfig(config);
  }, []);

  return (
    <div className="page-list">
      {titleBarConfig === null ? (
        <div className="list-page-loading">
          <Spin size="large" />
        </div>
      ) : (
        <TitleBar config={titleBarConfig} />
      )}
    </div>
  );
}

export default List;