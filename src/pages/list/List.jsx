import React, { useEffect, useState } from "react";
import "./List.css";
import { Spin } from "antd";
import TitleBar from "../../component/TitleBar/TitleBar";
import { titleBarHeaderConfig } from "../../lib/config";
import apiCollectList from "../../lib/api/apiCollectList";
import { list_image_url } from "../../lib/apiConfig";

const List = () => {
  const [titleBarConfig, setTitleBarConfig] = useState(null);

  useEffect(() => {
    apiCollectList((data) => {
      var sider = [];
      if (data !== null) {
        data.forEach((item, index) => {
          sider.push({
            name: <div>
                    <img 
                      className="sider-image"
                      src={list_image_url + "/" + item.list_name + ".png"}
                      alt={item.list_name}
                    />
                    {item.list_name}
                  </div>,
            id: item.list_id,
            key: "sider" + index,
            content: <div></div>,
          });
        });
      }
      const config = Object.assign({
        defaultSelectedHeaderKey: "header2",
        haveSider: true,
        sider: sider,
        defaultSelectedSiderKey: "sider0",
      }, titleBarHeaderConfig);
      setTitleBarConfig(config);
    });
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