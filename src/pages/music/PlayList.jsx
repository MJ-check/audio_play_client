import React, { useEffect, useState } from "react";
import "./PlayList.css";
import { MAX_LENGTH } from "../../utils/playListOperation";

/**
 * PlayList 播放列表组件
 */
const PlayList = ({
  playList,         // 音乐播放列表
  changePlayList,   // 更新音乐播放列表
  closeBox,         // 关闭音乐播放列表
  openStatus,       // 组件打开状态 true（打开） 或者 false（关闭）
  musicOnPlay,      // json 正在播放的音乐
}) => {
  // 音乐播放列表
  const [list, setList] = useState(null);
  // 判断当前播放音乐是否在播放列表中, -1表示不存在，存在则保存位置index
  const [isExist, setIsExist] = useState(-1);

  useEffect(() => {
    setList(
      playList && typeof playList === "object" ? 
      JSON.parse(JSON.stringify(playList.list)) : 
      null
    );
    playList.list.forEach((item, index) => {
      if ( item.music_id === musicOnPlay.music_id )
        setIsExist(index);
    });
  }, [playList, musicOnPlay]);

  // 关闭组件触发事件
  const handleCloseBox = () => {
    changePlayList("update", list);
    closeBox();
  };

  // 加入播放列表
  const addToList = music => {
    const list_length = list.length;
    var new_list = JSON.parse(JSON.stringify(list));
    if ( list_length < MAX_LENGTH ) {
      new_list.push(music);
    } else {
      new_list = new_list.slice(0, MAX_LENGTH-1);
      new_list.push(music);
    }
    setList(new_list);
  };

  // 从音乐播放列表中删除
  const deleteFromList = index => {
    const list_length = list.length;
    if ( list_length !== 0 ) {
      const new_list = JSON.parse(JSON.stringify(list));
      new_list.splice(index, 1);
      setList(new_list); 
    }
  };

  // 音乐在播放列表中的位置上移
  const moveUp = index => {
    if ( index !== 0 ) {
      const new_list = JSON.parse(JSON.stringify(list));
      const current_music = new_list[index];
      const before_music = new_list[index - 1];
      new_list[index] = before_music;
      new_list[index - 1] = current_music;
      setList(new_list);
    }
  };

  // 音乐在播放列表中的位置下移
  const moveDown = index => {
    const list_length = list.length;
    if ( index < list_length - 1 ) {
      const new_list = JSON.parse(JSON.stringify(list));
      const current_music = new_list[index];
      const next_music = new_list[index + 1];
      new_list[index + 1] = current_music;
      new_list[index] = next_music;
      setList(new_list);
    }
  };

  // 音乐移至播放列表顶端
  const moveToTop = index => {
    const new_list = JSON.parse(JSON.stringify(list));
    const music = new_list.splice(index, 1)[0];
    new_list.unshift(music);
    setList(new_list);
  };

  return (
    <div>
    </div>
  );
};

export default PlayList;