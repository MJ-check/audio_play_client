import React, { useState, useEffect } from "react";
import "./HomeContent.css";
import apiAllMusic from "../../lib/api/apiAllMusic";
import HomeCarousel from "../../component/HomeCarousel/HomeCarousel";
import { music_image_url } from "../../lib/apiConfig";

const MusicContent = ({ changeMusic }) => {
  const [musicContent, setMusicContent] = useState(null);

  useEffect(() => {
    apiAllMusic((data) => {
      setMusicContent(data);
    });
  }, []);

  return (
    <div className="home-music-content-container">
      {musicContent === null ? "" : (
        <div className="home-music-content">
          {musicContent.map((item) => {
            return (
              <div 
                className="home-music-content-music" 
                key={"music" + item.music_id}
                onClick={() => changeMusic(item)}
              >
                <div className="music-content-image-container">
                  <img
                    className="music-content-image query-image"
                    src={music_image_url + "/" + item.music_name + ".png"}
                    alt={item.music_name}
                  />
                </div>
                <div className="music-content-text-container">
                  <div className="music-content-text-music">
                    {item.music_name.split("--")[0]}
                  </div>
                  <div className="music-content-text-singer">
                   {item.music_name.split("--")[1]}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const HomeContent = ({ changeMusic }) => {
  return (
    <div className="home-content-container">
      <HomeCarousel />
      <MusicContent changeMusic={changeMusic}/>
    </div>
  );
}

export default HomeContent;