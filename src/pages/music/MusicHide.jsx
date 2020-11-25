import React from "react";
import "./MusicHide.css";
import { Spin } from "antd";
import {
  ArrowsAltOutlined,
  PauseOutlined,
  CaretRightOutlined,
} from '@ant-design/icons';

const MusicHide = ({ 
  changeStatus = null,
  imageSrc = null,
  playStatus = null,
  changePlayStatus = null
}) => {
  return (
    <div className="musicHide-page">
      <div 
        className="musicHide-change-status"
        onClick={changeStatus}
      >
        <ArrowsAltOutlined style={{ fontSize: "30px" }}/>
      </div>
      {imageSrc !== null && playStatus !== null ? (
        <div className="musicHide-container">
          <div className="musicHide-image-container">
            <img 
              className="musicHide-image query-image"
              src={imageSrc}
              alt=""
            />
          </div>
          <div 
            className="musicHide-play-status"
            onClick={changePlayStatus}
          >
          {playStatus === true ? (
            <PauseOutlined style={{ fontSize: "30px" }}/>
          ) : (
            <CaretRightOutlined style={{ fontSize: "30px" }}/>
          )}
          </div>
        </div>
      ) : (
        <div className="musicHide-loading">
          <Spin />
        </div>
      )}
    </div>
  );
}

export default MusicHide;