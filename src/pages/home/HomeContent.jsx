import React, { useState, useEffect } from "react";
import "./HomeContent.css";
import apiAllMusic from "../../lib/api/apiAllMusic";
import HomeCarousel from "../../component/HomeCarousel/HomeCarousel";

const MusicContent = () => {
  const [musicContent, setMusicContent] = useState(null);

  useEffect(() => {
    apiAllMusic((data) => {
      if (data !== null) { setMusicContent(data); }
    })
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
              >
                music
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const HomeContent = () => {
  return (
    <div className="home-content-container">
      <HomeCarousel />
      <MusicContent />
    </div>
  );
}

export default HomeContent;