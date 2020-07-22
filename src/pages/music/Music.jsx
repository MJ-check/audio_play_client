import React, { useState, useEffect } from "react";
import apiMusic from "../../lib/api/apiMusic";
import MusicOnShow from "./MusicOnShow";
import MusicHide from "./MusicHide";

const Music = ({ musicStorage }) => {
  const [onShow, setOnShow] = useState(false);
  const [musicMsg, setMusicMsg] = useState(null);
  const [player, setPlayer] = useState(null);
  const [playStatus, setPlayStatus] = useState(null);
  const [isFirstOpen, setIsFirstOpen] = useState(null);
  const [nowTime, setNowTime] = useState(0);

  useEffect(() => {
    setOnShow(false);
    setIsFirstOpen(true);
  }, []);
  useEffect(() => {
    if (player !== null) { player.pause(); }
    apiMusic(musicStorage, (data) => {
      setMusicMsg(data);
      if (data !== null) {
        const music_path = "/public/music/" + data.music_name + ".mp3";
        const audio = new Audio(music_path);
        audio.addEventListener("ended", () => {
          setPlayStatus(false);
        });
        audio.addEventListener("timeupdate", (event) => {
          setNowTime(parseInt(event.path[0].currentTime));
        });
        if (isFirstOpen === true || isFirstOpen === null) {
          audio.pause();
          setPlayStatus(false);
          setIsFirstOpen(false);
        } else {
          audio.play();
          setPlayStatus(true);
        }
        setPlayer(audio);
      } else {
        setPlayer(null);
        setPlayStatus(null);
      }
    });
  }, [musicStorage]);
  const handleChangeStatus = () => {
    setOnShow(!onShow);
  }
  const handleChangePlayStatus = () => {
    if (playStatus === true && player !== null) {
      player.pause();
      setPlayStatus(!playStatus);
    } else if (playStatus === false && player !== null) {
      player.play();
      setPlayStatus(!playStatus);
    }
  }
  const handelChangePlayTime = (time) => {
    if (player !== null) {
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
          imageSrc={musicMsg ? "/public/image/" + musicMsg.music_name + ".png" : null}
          playStatus={playStatus}
          changePlayStatus={handleChangePlayStatus}
          maxTime={player === null ? null : parseInt(player.duration)}
          nowTime={nowTime === null ? null : nowTime}
          changePlayTime={(time) => handelChangePlayTime(time)}
        />
      ) : (
        <MusicHide 
          changeStatus={handleChangeStatus}
          imageSrc={musicMsg ? "/public/image/" + musicMsg.music_name + ".png" : null}
          playStatus={playStatus}
          changePlayStatus={handleChangePlayStatus}
        />
      )}
    </div>
  );
}

export default Music;