import React, { useState, useEffect } from "react";
import "./Music.css";
import apiMusic from "../../lib/api/apiMusic";

const MusicOnShow = ({ changeStatus, musicMsg }) => {
  return (
    <div 
      className="musicOnShow-page"
      onClick={changeStatus}
    >
      MusicOnShow
      {musicMsg ? musicMsg.music_name : "null"}
    </div>
  );
}

const MusicHide = ({ changeStatus, musicMsg }) => {
  return (
    <div 
      className="musicHide-page"
      onClick={changeStatus}
    >
      MusicHide
      {musicMsg ? musicMsg.music_name : "null"}
    </div>
  );
}

const Music = ({ musicStorage }) => {
  const [onShow, setOnShow] = useState(false);
  const [musicMsg, setMusicMsg] = useState(null);

  useEffect(() => {
    setOnShow(false);
  }, []);
  useEffect(() => {
    apiMusic(musicStorage, (data) => {
      setMusicMsg(data);
    });
  }, [musicStorage]);
  const handleChangeStatus = () => {
    setOnShow(!onShow);
  }

  return (
    <div className="music-page">
      {onShow === true ? (
        <MusicOnShow changeStatus={handleChangeStatus} musicMsg={musicMsg}/>
      ) : (
        <MusicHide changeStatus={handleChangeStatus} musicMsg={musicMsg}/>
      )}
    </div>
  );
}

export default Music;