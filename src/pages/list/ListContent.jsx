import React, { useState, useEffect } from "react";
import "./ListContent.css";
import { Spin } from "antd";
import apiList from "../../lib/api/apiList";
import { list_image_url } from "../../lib/apiConfig";
import { 
  PlayCircleOutlined,
  //PauseCircleOutlined,
  FolderAddOutlined,
} from '@ant-design/icons';

const ListContent = ({ listMsg = null }) => {
  const [musicList, setMusicList] = useState(null);

  useEffect(() => {
    apiList(listMsg, (data) => {
      if (data !== null) { 
        setMusicList(data); 
      } else {
        setMusicList(null);
      }
    });
  }, [listMsg]);

  return (
    <div className="list-content-container">
      <div className="list-content-background-container">
        <img
          className="list-content-background"
          src={list_image_url + "/" + listMsg.list_name + ".png"}
          alt={listMsg.list_name}
        />
      </div>
      <div className="list-content-opacity"></div>
      <div className="list-content-list-container">
        <div className="list-content-list-msg">
          <img
            className="list-content-list-image"
            src={list_image_url + "/" + listMsg.list_name + ".png"}
            alt={listMsg.list_name}
          />
          <div className="list-content-list-text">
            {listMsg.list_name}
          </div>
        </div>
        <div className="list-content-music-container">
          {musicList === null ? (
            <div className="list-content-music-loading">
              <Spin size="large" />
            </div>
          ) : (
            <div className="list-content-music-content">
              {musicList.map((item) => {
                return (
                  <div className="list-content-music" key={"list_music" + item.music_id}>
                    <div className="list-content-music-msg">
                      <div className="list-content-music-name">
                        {item.music_name.split("--")[0]}
                      </div>
                      <div className="list-content-music-signer">
                        {item.music_name.split("--")[1]}
                      </div>
                    </div>
                    <div className="list-content-music-button">
                      <div className="list-content-button-container">
                        <PlayCircleOutlined 
                          className="list-content-button"
                          style={{ fontSize: "25px" }} 
                        />
                        <FolderAddOutlined 
                          className="list-content-button"
                          style={{ fontSize: "28px" }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ListContent;