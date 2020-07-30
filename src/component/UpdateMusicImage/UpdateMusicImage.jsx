import React, { useState, useEffect } from "react";
import "./UpdateMusicImage.css";
import { Button, message } from "antd";
import { 
  PlusOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import apiUploadMusicImage from "../../lib/api/apiUploadMusicImage";

const UpdateMusicImage = ({ music_msg, closeUpdateBox }) => {
  const [musicImage, setMusicImage] = useState(null);
  const [imageOnShow, setImageOnShow] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMusicImage(null);
    setImageOnShow(null);
    setLoading(false);
  }, []);
  const handleImageChange = (image_file) => {
    if (!image_file || image_file.type !== "image/png") {
      setMusicImage(null);
      message.error("图片文件必须是PNG格式文件！");
    } else {
      setMusicImage(image_file);
      message.success("图片文件已选中为 " + image_file.name);
      // FIle Reader
      const reader = new FileReader();
      reader.readAsDataURL(image_file);
      reader.onload = (event) => {
        setImageOnShow(event.target.result);
      }
    }
  }
  const handleSubmit = () => {
    if (music_msg) {
      if (!musicImage) {
        message.error("请选择图片文件！");
        return ;
      } else {
        const new_music_image = new File([musicImage], music_msg.music_name + ".png", {type: musicImage.type});
        const form_date_from_image = new FormData();
        form_date_from_image.append("music_image", new_music_image);
        apiUploadMusicImage(form_date_from_image, (code) => {
          if (code === 100) {
            setLoading(false);
            message.success("上传音乐图片成功，刷新页面后更新！");
          } else {
            setLoading(false);
            message.error("更新音乐图片失败！");
          }
        })
      }
    } else {
      message.error("未知错误！");
      setLoading(false);
    }
  }

  return (
    <div className="UpdateMusicImage-page">
      <div className="UpdateMusicImage-container">
        <div className="UpdateMusicImage-title">
          更新音乐图片
        </div>
        <div className="UpdateMusicImage-content">
          <div className="UpdateMusicImage-image-on-show">
            {imageOnShow === null ? "" : (
              <img 
                className="UpdateMusicImage-image"
                alt=""
                src={imageOnShow}
              />
            )}
          </div>
          <div className="UpdateMusicImage-alert">
            <div className="UpdateMusicImage-icon">
              <PlusOutlined style={{ fontSize: "50px" }}/>
            </div>
            <div className="UpdateMusicImage-alert-text">
              上传图片
              <div>(PNG格式)</div>
            </div>
          </div>
          <input 
            type="file" 
            onChange={event => handleImageChange(event.target.files[0])}
          />
        </div>
        <div className="UpdateMusicImage-button">
          <Button 
            type="primary"
            shape="round"
            loading={loading}
            icon={<DownloadOutlined style={{ fontSize: "20px" }}/>}
            size="large"
            onClick={() => { setLoading(true); handleSubmit(); }}
          >
            更新图片
          </Button>
          <Button
            type="primary"
            shape="round"
            size="large"
            onClick={() => closeUpdateBox()}
          >
            取消
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UpdateMusicImage;