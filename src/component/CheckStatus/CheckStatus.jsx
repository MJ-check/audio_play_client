import React, { useState, useEffect } from "react";
import "./CheckStatus.css";
import { Spin, message } from "antd";
import apiStatus from "../../lib/api/apiStatus";
import apiAdd from "../../lib/api/apiAdd";
import apiRemove from "../../lib/api/apiRemove";
import apiCollectList from "../../lib/api/apiCollectList";
import {
  CloseOutlined,
} from '@ant-design/icons';

const CheckStatus = ({ music_msg, closeCheckBox }) => { 
  const [listMsg, setListMsg] = useState(null);
  const [musicMsg, setMusicMsg] = useState(null);
  const [collectList, setCollectList] = useState(null);

  useEffect(() => {
    apiCollectList((data) => {
      setCollectList(data);
    });
    apiStatus(music_msg.music_id, (data) => {
      setListMsg(data);
    });
    setMusicMsg(music_msg);
  }, [music_msg]);
  const addToList = (music_id, list_id, list_index) => {
    apiAdd(music_id, list_id, (code) => {
      if (code !== null) {
        message.success("添加收藏夹成功!");
        const new_list_msg = listMsg.slice();
        new_list_msg.push(collectList[list_index]);
        setListMsg(new_list_msg);
      } else {
        message.error("添加收藏夹失败!");
      }
    });
  };
  const removeFromList = (music_id, list_id) => {
    apiRemove(music_id, list_id, (code) => {
      if (code !== null) {
        message.success("移出收藏夹成功!");
        const new_list_msg = listMsg.slice();
        listMsg.forEach((item, index) => {
          if (item.list_id === list_id) {
            new_list_msg.splice(index, 1);
          }
        });
        setListMsg(new_list_msg);
      } else {
        message.error("移出收藏夹失败!");
      }
    })
  };

  return (
    <div className="CheckStatus-page">
      <div className="CheckStatus-container">
        <div 
          className="CheckStatus-close-box"
          onClick={() => closeCheckBox()}  
        >
          <CloseOutlined style={{ fontSize: "28px" }}/>
        </div>
      {musicMsg === null ? "" : (
        <div className="CheckStatus-music-name">
          {musicMsg.music_name}
        </div>
      )}
      {listMsg === null || musicMsg === null || collectList === null ? (
        <div className="CheckStatus-loading">
          <Spin size="large" />
        </div>
      ) : (
        <div className="CheckStatus-content">
          {collectList.map((item, index) => {
            for (var i = 0; i < listMsg.length; i++) {
              if (item.list_id === listMsg[i].list_id) {
                return (
                  <div className="CheckStatus-item" key={"收藏夹" + index}>
                    <div className="CheckStatus-list-name">
                      {item.list_name}
                    </div>
                    <div 
                      className="CheckStatus-list-status in-list"
                      onClick={() => removeFromList(musicMsg.music_id, item.list_id)}
                    >
                      已收藏
                    </div>
                  </div>
                );
              } else {
                continue;
              }
            }
            return (
              <div className="CheckStatus-item" key={"收藏夹" + index}>
                <div className="CheckStatus-list-name">
                  {item.list_name}
                </div>
                <div 
                  className="CheckStatus-list-status not-in-list"
                  onClick={() => addToList(musicMsg.music_id, item.list_id, index)}
                >
                  收藏
                </div>
              </div>
            );
          })}
        </div>
      )}
      </div>
    </div>
  );
}

export default CheckStatus;