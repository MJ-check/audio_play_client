import React, { useState, useEffect } from "react";
import "./CreateNewList.css";
import { Input, Button, message, Modal } from "antd";
import { 
  PlusSquareOutlined,
  PlusOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import apiNewList from "../../lib/api/apiNewList";
import apiUploadListImage from "../../lib/api/apiUploadListImage";
const { TextArea } = Input;

const NewListContainer = ({ handleHideContainer }) => {
  const [listName, setListName] = useState(null);
  const [listMsg, setListMsg] = useState(null);
  const [listImage, setListImage] = useState(null);
  const [imageOnShow, setImageOnShow] = useState(null);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [haveChange, setHaveChange] = useState(false);

  useEffect(() => {
    setListName(null);
    setListMsg(null);
    setListImage(null);
    setImageOnShow(null);
    setVisible(false);
    setLoading(false);
    setHaveChange(false);
  }, []);
  const handleListImageChange = (list_image) => {
    if (!list_image || list_image.type !== "image/png") {
      setListImage(null);
      message.error("图片文件必须是PNG格式文件！");
    } else {
      setListImage(list_image);
      message.success("图片文件已选中为 " + list_image.name);
      // File Reader 
      const reader = new FileReader();
      reader.readAsDataURL(list_image);
      reader.onload = (event) => {
        setImageOnShow(event.target.result);
      }
    }
  };
  const handleListNameChange = (list_name) => {
    setListName(list_name);
  };
  const handleListMsgChange = (list_msg) => {
    setListMsg(list_msg);
  };
  const handleSubmitCheck = () => {
    if (!listName) {
      message.error("请填写收藏夹名称！");
      return ;
    } else if (!listImage) {
      message.error("请选择图片文件！");
      return ;
    } else if (!listMsg) {
      setListMsg("该收藏夹未填写简介...");
    }
    setVisible(true);
    setLoading(true);
  };
  const handleSubmit = () => {
    const submit_image_file = new File([listImage], listName + ".png", {type: listImage.type});
    const form_data_for_image = new FormData();
    form_data_for_image.append("list_image", submit_image_file);
    apiNewList(listName, listMsg, (code) => {
      if (code === 100) {
        apiUploadListImage(form_data_for_image, (code) => {
          if (code === 100) {
            setLoading(false);
            message.success("创建收藏夹成功！");
          } else {
            setLoading(false);
            message.warning("图片上传失败！");
          }
        })
      } else {
        setLoading(false);
        message.error("创建收藏夹失败！");
      }
    });
    setListName(null);
    setListMsg(null);
    setListImage(null);
    setImageOnShow(null);
    setHaveChange(true);
  }

  return (
    <div className="NewListContainer-page">
      <div className="NewListContainer-page-container">
        <div className="NewListContainer-page-title">新建收藏夹</div>
        <div className="NewListContainer-content">
          <div className="NewListContainer-text-content">
            <div className="NewListContainer-input-list-name">
              <div>收藏夹名</div>
              <Input 
                value={listName}
                maxLength={20}
                onChange={event => handleListNameChange(event.target.value)}
              />
            </div>
            <div className="NewListContainer-input-list-msg">
              <div>收藏夹简介</div>
              <TextArea 
                value={listMsg}
                rows={4}
                maxLength={200}
                onChange={event => handleListMsgChange(event.target.value)}
              />
            </div>
          </div>
          <div className="NewListContainer-image-content">
            <div className="NewListContainer-image-upload-review">
              {listImage === null ? "" : (
                <img 
                  className="NewListContainer-image-upload-review-pic"
                  alt=""
                  src={imageOnShow}
                />
              )}
            </div>
            <div className="NewListContainer-image-content-text">
              <div className="NewListContainer-image-content-text-icon">
                <PlusOutlined style={{ fontSize: "50px" }}/>
              </div>
              <div className="NewListContainer-image-content-alert">
                上传图片
                <div>(PNG格式)</div>
              </div>
            </div>
            <input 
              type="file"
              onChange={event => handleListImageChange(event.target.files[0])}
            />
          </div>
        </div>
        <div className="NewListContainer-button">
          <Button 
            type="primary"
            shape="round" 
            loading={loading}
            icon={<DownloadOutlined style={{ fontSize: "20px" }}/>} 
            size="large"
            onClick={() => handleSubmitCheck()}
          >
            创建收藏夹
          </Button>
          <Button 
            type="primary"
            shape="round"
            size="large"
            onClick={() => handleHideContainer(haveChange)}
          >
            取消
          </Button>
          <Modal
            title="确认创建收藏夹"
            visible={visible}
            onOk={() => { setVisible(false); handleSubmit(); }}
            onCancel={() => { setVisible(false); setLoading(false); }}
          >
            <p>确认创建收藏夹 "{listName}" ?</p>
            <p>"{listName}" 的简介为: {listMsg}</p>
            <p>同时上传文件: {listName + ".png"}</p>
          </Modal>
        </div>
      </div>
    </div>
  );
}

const CreateNewList = () => {
  const [containerOnShow, setContainerOnShow] = useState(false);

  useEffect(() => {
    setContainerOnShow(false);
  }, []);
  const handleShowContainer = () => {
    setContainerOnShow(true);
  };
  const handleHideContainer = (status) => {
    setContainerOnShow(false);
    if (status === true) {
      window.location.reload();
    }
  };

  return (
    <div className="CreateNewList-page-container">
      <div
        className="CreateNewList-page"
        onClick={() => handleShowContainer()}
      >
        <PlusSquareOutlined style={{ fontSize: "25px" }}/>
        新建收藏夹
      </div>
      {containerOnShow === false ? "" : (
        <div className="CreateNewList-container">
          <NewListContainer handleHideContainer={handleHideContainer} />
        </div>
      )}
    </div>
  );
}

export default CreateNewList;