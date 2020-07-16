import React from "react";
import {
  HomeOutlined,
  UnorderedListOutlined,
  CloudUploadOutlined,
} from '@ant-design/icons';

const titleBarHeaderConfig = {
  header: [{
    title: <div><HomeOutlined style={{"font-size": "20px"}}/>主页</div>,
    key: "header1",
    link: "/home",   
  }, {
    title: <div><UnorderedListOutlined style={{"font-size": "20px"}}/>收藏夹</div>,
    key: "header2",
    link: "/list",
  }, {
    title: <div><CloudUploadOutlined style={{"font-size": "20px"}}/>上传音乐</div>,
    key: "header3",
    link: "/upload",
  }],
}

export { titleBarHeaderConfig };