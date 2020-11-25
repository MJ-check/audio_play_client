import React, { useState, useEffect } from "react";
import "./ListContent.css";
import { Spin } from "antd";
import apiList from "../../lib/api/apiList";
import CheckStatus from "../../component/CheckStatus/CheckStatus";
import UpdateList from "../../component/UpdateList/UpdateList";
import { list_image_url } from "../../lib/apiConfig";
import { 
  PlayCircleOutlined,
  FolderAddOutlined,
  EditOutlined,
} from '@ant-design/icons';

const ListContent = ({ listMsg = null, changeMusic }) => {
  const [musicList, setMusicList] = useState(null);
  const [musicMsg, setMusicMsg] = useState(null);
  const [updateMsg, setUpdateMsg] = useState(null);

  useEffect(() => {
    apiList(listMsg.list_id, (data) => {
      setMusicList(data);
    });
  }, [listMsg]);
  const closeCheckBox = () => {
    apiList(listMsg.list_id, (data) => {
      setMusicList(data);
    });
    setMusicMsg(null);
  };
  const openCheckBox = (music_msg) => {
    setMusicMsg(music_msg);
  };
  const openUpdateBox = () => {
    setUpdateMsg(listMsg);
  };
  const closeUpdateBox = (status) => {
    setUpdateMsg(null);
    if (status === true) {
      window.location.reload();
    }
  };

  return (
    <div className="list-content-container">
      <div className="list-content-background-container">
        <img
          className="list-content-background query-image"
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
            <div className="list-content-list-name">
              {listMsg.list_name}
              <div className="list-content-edit-icon">
                <EditOutlined
                  className="list-content-edit-icon-button" 
                  style={{ fontSize: "20px" }}
                  onClick={() => openUpdateBox()}
                />
              </div>
            </div>
            <div className="list-content-list-msg-text">
              {listMsg.list_msg}
            </div>
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
                        <div 
                          className="list-content-button"
                          onClick={() => changeMusic(item.music_id)}
                        >
                          <PlayCircleOutlined style={{ fontSize: "25px" }}/>
                        </div>
                        <div 
                          className="list-content-button"
                          onClick={() => openCheckBox(item)}
                        >
                          <FolderAddOutlined style={{ fontSize: "28px" }}/>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      {musicMsg === null ? "" : (
        <div className="list-content-check-status">
          <CheckStatus 
            music_msg={musicMsg} 
            closeCheckBox={closeCheckBox}
          />
        </div>
      )}
      {updateMsg === null ? "" : (
        <div className="list-content-update-msg">
          <UpdateList 
            list_msg={updateMsg}
            closeUpdateBox={closeUpdateBox}
          />
        </div>
      )}
    </div>
  );
}

export default ListContent;