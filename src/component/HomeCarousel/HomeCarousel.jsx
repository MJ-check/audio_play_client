import React, { useState, useEffect } from "react";
import "./HomeCarousel.css";
import 'antd/dist/antd.css';
import { Carousel, Spin } from "antd";
import apiLastMusic from "../../lib/api/apiLastMusic";
import { music_image_url } from "../../lib/apiConfig";

const HomeCarousel = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    apiLastMusic((data) => {
      if (data !== null) { setContent(data); }
    });
  }, []);

  return (
    <div className="home-carousel-container">
      {content === null ? (
        <div className="home-carousel-loading">
          <Spin size="large" />
        </div>
      ) : (
        <Carousel autoplay>
          {content.map((item) => {
            return (
              <div 
                className="carousel-piece" 
                key={"carousel" + item.music_id}
              >
                <img
                  className="carousel-piece-image"
                  src={music_image_url + "/" + item.music_name + ".png"}
                  alt={item.music_name}
                />
              </div>
            );
          })}
        </Carousel>
      )}
    </div>
  );
}

export default HomeCarousel;