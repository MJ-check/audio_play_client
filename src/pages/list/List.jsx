import React, { useEffect, useState } from "react";
import "./List.css";
import { Spin } from "antd";
import TitleBar from "../../component/TitleBar/TitleBar";
import { titleBarHeaderConfig } from "../../lib/config";
import apiCollectList from "../../lib/api/apiCollectList";
import { list_image_url } from "../../lib/apiConfig";
import ListContent from "./ListContent";
import CreateNewList from "../../component/CreateNewList/CreateNewList";

const List = ({ changeMusic }) => {
  const [titleBarConfig, setTitleBarConfig] = useState(null);

  useEffect(() => {
    apiCollectList((data) => {
      var sider = [];
      if (data !== null) {
        data.forEach((item, index) => {
          sider.push({
            name: <div>
                    <img 
                      className="sider-image query-image"
                      src={list_image_url + "/" + item.list_name + ".png"}
                      alt=""
                    />
                    {item.list_name}
                  </div>,
            id: item.list_id,
            key: "sider" + index,
            content: <ListContent listMsg={item} changeMusic={changeMusic}/>,
          });
        });
      }
      const config = Object.assign({
        defaultSelectedHeaderKey: "header2",
        haveSider: true,
        sider: sider,
        defaultSelectedSiderKey: "sider0",
        haveNew: true,
        handleHaveNew: <CreateNewList />,
      }, titleBarHeaderConfig);
      setTitleBarConfig(config);
    });
  }, [changeMusic]);

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