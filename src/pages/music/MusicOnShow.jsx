import React, { useState } from "react";
import "./MusicOnShow.css";
import { Spin, Slider } from "antd";
import CheckStatus from "../../component/CheckStatus/CheckStatus";
import UpdateMusicImage from "../../component/UpdateMusicImage/UpdateMusicImage";
import {
  ShrinkOutlined,
  PauseOutlined,
  CaretRightOutlined,
  MenuUnfoldOutlined,
  FormOutlined,
} from '@ant-design/icons';

const MusicOnShow = ({ 
  changeStatus = null, 
  musicOnPlay = null, 
  playStatus = null, 
  changePlayStatus = null, 
  maxTime = null,
  nowTime = null,
  changePlayTime = null,
}) => {
  const [musicMsg, setMusicMsg] = useState(null);
  const [updateMsg, setUpdateMsg] = useState(null);

  const closeCheckBox = () => {
    setMusicMsg(null);
  };
  const openCheckBox = () => {
    setMusicMsg(musicOnPlay);
  };
  const openUpdateBox = () => {
    setUpdateMsg(musicOnPlay);
  };
  const closeUpdateBox = () => {
    setUpdateMsg(null);
  };

  return (
    <div className="musicOnShow-page">
      <div 
        className="musicOnShow-change-status"
        onClick={changeStatus}
      >
        <ShrinkOutlined style={{ fontSize: "40px" }}/>
      </div>
      {musicOnPlay !== null && playStatus !== null ? (
        <div>
          {musicMsg === null ? "" : (
            <div className="musicOnShow-check-status-box">
              <CheckStatus music_msg={musicMsg} closeCheckBox={() => closeCheckBox()}/>
            </div>
          )}
          {updateMsg === null ? "" : (
            <div className="musicOnSHow-update-music-image">
              <UpdateMusicImage music_msg={updateMsg} closeUpdateBox={() => closeUpdateBox()}/>
            </div>
          )}
          <div className="musicOnShow-background">
            <img 
              className="musicOnShow-background-image query-image"
              src={"/public/image/" + musicOnPlay.music_name + ".png"}
              alt=""
            />
            <div className="musicOnShow-background-opacity"></div>
          </div>
          <div className="musicOnShow-container">
            <div className="musicOnShow-image-container">
              <img
                className="musicOnShow-image query-image"
                src={"/public/image/" + musicOnPlay.music_name + ".png"}
                alt=""
              />
            </div>
          </div>
          <div className="musicOnShow-player-container">
            <Slider
              className="musicOnSHow-player-slider"
              min={0}
              max={maxTime}
              value={nowTime}
              onChange={(value) => changePlayTime(value)}
              tipFormatter={null}
            />
            <div className="musicOnShow-play-status">
              <div
                className="musicOnShow-play-status-setting-button"
                onClick={() => openUpdateBox()}
              >
                <FormOutlined style={{ fontSize: "40px" }}/>
              </div>
              <div 
                className="musicOnShow-play-status-play-button"
                onClick={changePlayStatus}
              >
                {playStatus === true ? (
                  <PauseOutlined style={{ fontSize: "50px" }}/>
                ) : (
                  <CaretRightOutlined style={{ fontSize: "50px" }}/>
                )}
              </div>
              <div 
                className="musicOnShow-play-status-check-status-button"
                onClick={() => openCheckBox()}
              >
                <MenuUnfoldOutlined style={{ fontSize: "40px" }}/>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="musicOnShow-loading">
          <Spin size="large"/>
        </div>
      )}
    </div>
  );
}

export default MusicOnShow;