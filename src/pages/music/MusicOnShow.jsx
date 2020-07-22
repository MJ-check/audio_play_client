import React from "react";
import "./MusicOnShow.css";
import { Spin, Slider } from "antd";
import {
  ShrinkOutlined,
  PauseOutlined,
  CaretRightOutlined,
} from '@ant-design/icons';

const MusicOnShow = ({ 
  changeStatus = null, 
  imageSrc = null, 
  playStatus = null, 
  changePlayStatus = null, 
  maxTime = null,
  nowTime = null,
  changePlayTime = null
}) => {
  return (
    <div className="musicOnShow-page">
      <div 
        className="musicOnShow-change-status"
        onClick={changeStatus}
      >
        <ShrinkOutlined style={{ fontSize: "40px" }}/>
      </div>
      {imageSrc !== null && playStatus !== null && maxTime !== null && nowTime !== null ? (
        <div>
          <div className="musicOnShow-background">
            <img 
              className="musicOnShow-background-image"
              src={imageSrc}
              alt=""
            />
            <div className="musicOnShow-background-opacity"></div>
          </div>
          <div className="musicOnShow-container">
            <div className="musicOnShow-image-container">
              <img
                className="musicOnShow-image"
                src={imageSrc}
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
            <div 
              className="musicOnShow-play-status"
              onClick={changePlayStatus}
            >
            {playStatus === true ? (
              <PauseOutlined style={{ fontSize: "50px" }}/>
            ) : (
              <CaretRightOutlined style={{ fontSize: "50px" }}/>
            )}
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