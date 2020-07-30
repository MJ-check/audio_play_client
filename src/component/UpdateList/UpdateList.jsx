import React, { useState } from "react";
import "./UpdateList.css";
import apiUpdateListMsg from "../../lib/api/apiUpdateListMsg";
import apiUploadListImage from "../../lib/api/apiUploadListImage";
import { Button, message, Input } from "antd";
import { 
  PlusOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
const { TextArea } = Input;

const UpdateListMsg = ({ list_msg, closeUpdateBox }) => {
  const [msgContent, setMsgContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(false);

  const handleChangeMsg = (msg) => {
    setMsgContent(msg);
  };
  const handleSubmit = () => {
    if (list_msg) {
      if (!msgContent) {
        message.error("简介内容不能为空！");
        setLoading(false);
        return ;
      } else {
        const list_id = list_msg.list_id;
        apiUpdateListMsg(list_id, msgContent, (code) => {
          if (code === 100) {
            setLoading(false);
            setUpdateStatus(true);
            message.success("更新收藏夹简介成功！");
          } else {
            setLoading(false);
            message.error("更新收藏夹简介失败！");
          }
        });
      }
    } else {
      message.error("未知错误！");
      setLoading(false);
      return ;
    }
  };

  return (
    <div className="UpdateListMsg-page">
      <div className="UpdateListMsg-content">
        <TextArea 
          value={msgContent}
          rows={10} 
          maxLength={200}
          onInput={event => handleChangeMsg(event.target.value)}
        />
      </div>
      <div className="UpdateListMsg-buttons">
        <Button
          type="primary"
          shape="round"
          loading={loading}
          icon={<DownloadOutlined style={{ fontSize: "20px" }}/>}
          size="large"
          onClick={() => { setLoading(true); handleSubmit(); }}
        >
          更新简介
        </Button>
        <Button
          type="primary"
          shape="round"
          size="large"
          onClick={() => closeUpdateBox(updateStatus)}
        >
          取消
        </Button>
      </div>
    </div>
  );
}

const UpdateListImage = ({ list_msg, closeUpdateBox }) => {
  const [imageFile, setImageFile] = useState(null);
  const [imageOnShow, setImageOnShow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(false);

  const handleChangeImage = (image_file) => {
    if (!image_file || image_file.type !== "image/png") {
      setImageFile(null);
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
  const handleSubmit = () => {
    if (list_msg) {
      if (!imageFile) {
        message.error("请选择图片文件！");
        setLoading(false);
        return ;
      } else {
        const new_image_file = new File([imageFile], list_msg.list_name + ".png", {type: imageFile.type});
        const form_data_for_image = new FormData();
        form_data_for_image.append("list_image", new_image_file);
        apiUploadListImage(form_data_for_image, (code) => {
          if (code === 100) {
            setLoading(false);
            setUpdateStatus(true);
            message.success("更新收藏夹图片成功！");
          } else {
            setLoading(false);
            message.error("更新收藏夹图片失败！");
          }
        });
      }
    } else {
      message.error("未知错误！");
      setLoading(false);
      return ;
    }
  };

  return (
    <div className="UpdateListImage-page">
      <div className="UpdateListImage-content">
        <div className="UpdateListImage-image-on-show">
          {imageOnShow === null ? "" : (
            <img
              className="UpdateListImage-image-content"
              alt=""
              src={imageOnShow}
            />
          )}
        </div>
        <div className="UpdateListImage-content-alert">
          <div className="UpdateListImage-content-alert-icon"> 
            <PlusOutlined style={{ fontSize: "50px" }} />
          </div>
          <div className="UpdateListImage-content-alert-text">
            上传图片
            <div>(PNG格式)</div>
          </div>
        </div>
        <input
          type="file"
          onChange={event => handleChangeImage(event.target.files[0])}
        />
      </div>
      <div className="UpdateListImage-button">
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
          onClick={() => closeUpdateBox(updateStatus)}
        >
          取消
        </Button>
      </div>
    </div>
  );
}

const UpdateList = ({ list_msg, closeUpdateBox }) => {
  const [chooseIndex, setChooseIndex] = useState(1);

  return (
    <div className="UpdateList-page">
      <div className="UpdateList-container">
        <div className="UpdateList-choose-title">
          <div 
            className="UpdateList-update-image"
            style={chooseIndex === 1 ? {backgroundColor: "white"} : {backgroundColor: "rgba(24, 144, 255, 0.75)"}}
            onClick={() => setChooseIndex(1)}
          >
            更新图片
          </div>
          <div 
            className="UpdateList-update-msg"
            style={chooseIndex === 2 ? {backgroundColor: "white"} : {backgroundColor: "rgba(24, 144, 255, 0.75)"}}  
            onClick={() => setChooseIndex(2)}
          >
            更新简介
          </div>
        </div>
        <div className="UpdateList-box">
          {chooseIndex === 1 ? (
            <UpdateListImage list_msg={list_msg} closeUpdateBox={closeUpdateBox}/>
          ) : (
            <UpdateListMsg list_msg={list_msg} closeUpdateBox={closeUpdateBox}/>
          )}
        </div>
      </div>
    </div>
  );
}

export default UpdateList;