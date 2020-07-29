import React, { useState, useEffect } from "react";
import "./UploadContent.css";
import { Input, message, Button, Modal } from "antd";
import { 
  InboxOutlined, 
  PlusOutlined, 
  UploadOutlined,
} from '@ant-design/icons';
import apiUploadMusic from "../../lib/api/apiUploadMusic";
import apiUploadMusicImage from "../../lib/api/apiUploadMusicImage";

const UploadContent = () => {
  const [musicFile, setMusicFile] = useState(null);
  const [musicName, setMusicName] = useState(null);
  const [signerName, setSignerName] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageOnShow, setImageOnShow] = useState(null);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMusicFile(null);
    setMusicName(null);
    setSignerName(null);
    setImageFile(null);
    setImageOnShow(null);
    setVisible(false);
    setLoading(false);
  }, []);

  const handleMusicFileChange = (music_file) => {
    if (!music_file || music_file.type !== "audio/mp3") {
      message.error("音频文件必须是MP3格式文件！");
    } else {
      setMusicFile(music_file);
      message.success("音频文件已选中为 " + music_file.name);
    }
  };
  const handleMusicImageChange = (image_file) => {
    if (!image_file || image_file.type !== "image/png") {
      message.error("图片文件必须是PNG格式文件！");
    } else {
      setImageFile(image_file);
      message.success("图片文件已选中为 " + image_file.name);
      // File Reader
      const reader = new FileReader();
      reader.readAsDataURL(image_file);
      reader.onload = (event) => {
        setImageOnShow(event.target.result);
      }
    }
  };
  const handleMusicNameChange = (music_name) => {
    setMusicName(music_name);
  };
  const handleSingerNameChange = (singer_name) => {
    setSignerName(singer_name);
  };
  const handleSubmitCheck = () => {
    if (musicFile === null) {
      message.error("请选择音频文件！");
      return ;
    } else if (imageFile === null) {
      message.error("请选择图片文件！");
      return ;
    } else if (musicName === null) {
      message.error("请输入音乐名！");
      return ;
    } else if (signerName === null) {
      message.error("请输入歌手名！");
      return ;
    } else {
      setVisible(true);
      setLoading(true);
    }
  };
  const handleSubmit = () => {
    const file_name = musicName + "--" + signerName;
    const submit_music_file = new File([musicFile], file_name + ".mp3", {type: musicFile.type});
    const submit_image_file = new File([imageFile], file_name + ".png", {type: imageFile.type});
    const form_data_for_music = new FormData();
    form_data_for_music.append("music_file", submit_music_file);
    const form_data_for_image = new FormData();
    form_data_for_image.append("music_image", submit_image_file);
    apiUploadMusic(form_data_for_music, (code) => {
      if (code === 100) {
        apiUploadMusicImage(form_data_for_image, (code) => {
          if (code === 100) {
            setLoading(false);
            message.success("音乐上传成功！");
          } else {
            setLoading(false);
            message.warning("图片上传失败！");
          }
        });
      } else {
        setLoading(false);
        message.error("音乐上传失败！");
      }
    });
  }

  return (
    <div className="UploadContent-page">
      <div className="UploadContent-music-file">
        <div className="UploadContent-music-file-alert">
          <div className="UploadContent-music-file-alert-icon">
            <InboxOutlined style={{ fontSize: "75px" }}/>
          </div>
          <div className="UploadContent-music-file-alert-text">
            <div className="first-text">上传音频文件</div>
            <div className="second-text">点击或者拖拽上传，仅支持单文件上传，文件规定为MP3格式文件</div>
          </div>
        </div>
        <input 
          type="file"
          onChange={event => handleMusicFileChange(event.target.files[0])}
        />
      </div>
      <div className="UploadContent-music-info">
        <div className="UploadContent-music-name">
          <div className="UploadContent-music-name-alert">
            请输入音乐名
          </div>
          <Input 
            value={musicName}
            maxLength={20}
            onChange={event => handleMusicNameChange(event.target.value)}
          />
          <div className="UploadContent-music-name-alert">
            请输入歌手名
          </div>
          <Input 
            value={signerName}
            maxLength={10}
            onChange={event => handleSingerNameChange(event.target.value)}
          />
        </div>
        <div className="UploadContent-music-image">
          <div className="Upload-music-image-on-show">
          {imageOnShow === null ? "" : (
            <img
              className="Upload-music-image-on-show-pic"
              src={imageOnShow}
              alt=""
            />
          )}
          </div>
          <div className="UploadContent-music-image-alert">
            <div className="UploadContent-music-image-alert-icon">
              <PlusOutlined style={{ fontSize: "50px" }}/>
            </div>
            <div className="UploadContent-music-image-alert-text">
              上传图片
              <div>(PNG格式)</div>
            </div>
          </div>
          <input
            type="file"
            onChange={event => handleMusicImageChange(event.target.files[0])}
          />
        </div>
      </div>
      <div className="UploadContent-submit-button">
        <Button 
          type="primary" 
          shape="round" 
          loading={loading}
          icon={<UploadOutlined style={{ fontSize: "20px" }}/>} 
          size="large"
          onClick={() => handleSubmitCheck()}
        >
          上传音乐
        </Button>
        <Modal
          title="确认上传"
          visible={visible}
          onOk={() => { setVisible(false); handleSubmit(); }}
          onCancel={() => { setVisible(false); setLoading(false); }}
        >
          <p>确认上传音乐 "{musicName + "--" + signerName}" ?</p>
          <p>同时上传以下文件:</p>
          <p>{musicName + "--" + signerName + ".mp3"}</p>
          <p>{musicName + "--" + signerName + ".png"}</p>
        </Modal>
      </div>
    </div>
  );
}

export default UploadContent;