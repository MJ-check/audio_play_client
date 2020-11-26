import React, { useState, useEffect } from "react";
import MusicOnShow from "./MusicOnShow";
import MusicHide from "./MusicHide";

const Music = ({ 
  musicOnPlay,   // 正在播放的音乐 
  onChangeMusic   // 切换音乐
}) => {
  const [onShow, setOnShow] = useState(false);
  const [musicMsg, setMusicMsg] = useState(null);
  const [player, setPlayer] = useState(null);
  const [playStatus, setPlayStatus] = useState(false);
  const [nowTime, setNowTime] = useState(0);
  const [isFirstOpen, setIsFirstOpen] = useState(true);  // 用于第一次加载判断

  useEffect(() => {
    console.log(musicOnPlay);
    // 上一首歌曲暂停
    if ( player ) {
      player.pause();
      setPlayStatus(false);
    } 

    // 加载下一首歌曲
    setMusicMsg(musicOnPlay);
    if ( musicOnPlay ) {
      const music_path = "/public/music/" + musicOnPlay.music_name + ".mp3";
      const audio = new Audio(music_path);
      audio.addEventListener("ended", () => {
        setPlayStatus(false);
      });
      audio.addEventListener("timeupdate", (event) => {
        const new_time = event.path ? event.path[0].currentTime : event.target.currentTime;
        setNowTime(parseInt(new_time));
      });
      if ( isFirstOpen === true ) {
        audio.pause();
        setPlayStatus(false);
        setIsFirstOpen(false);
      } else {
        audio.play();
        setPlayStatus(true);
      }
      setPlayer(audio);
    } else {
      console.error("Parameter musicOnPlay equals null!");
    }
  // eslint-disable-next-line
  }, [musicOnPlay]);

  const handleChangeStatus = () => {
    setOnShow(!onShow);
  };

  const handleChangePlayStatus = () => {
    if ( playStatus === true ) {
      player.pause();
      setPlayStatus(!playStatus);
    } else {
      player.play();
      setPlayStatus(!playStatus);
    }
  };

  const handelChangePlayTime = (time) => {
    if ( player ) {
      player.currentTime = time;
      player.play();
      setPlayStatus(true);
    }
  }

  return (
    <div className="music-page">
      {onShow === true ? (
        <MusicOnShow 
          changeStatus={handleChangeStatus}
          musicOnPlay={musicMsg}
          playStatus={playStatus}
          changePlayStatus={handleChangePlayStatus}
          maxTime={player ? parseInt(player.duration) : 1}
          nowTime={nowTime}
          changePlayTime={(time) => handelChangePlayTime(time)}
        />
      ) : (
        <MusicHide 
          changeStatus={handleChangeStatus}
          musicOnPlay={musicMsg}
          playStatus={playStatus}
          changePlayStatus={handleChangePlayStatus}
        />
      )}
    </div>
  );
}

export default Music;