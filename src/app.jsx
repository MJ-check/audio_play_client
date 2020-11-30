import React, { useState, useEffect } from "react";
import { HashRouter, Route } from "react-router-dom";
import "./app.css";
import apiLastMusic from "./lib/api/apiLastMusic";
//import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Upload from "./pages/upload/Upload";
import Music from "./pages/music/Music";
import { 
  initBeforeUnloadFunctionList, 
  carryBeforeUnloadFunction,
  addBeforeUnloadFunction,
} from "./utils/handleBeforeUnload";
import {
  playListOperation,
  storePlayList,
  initMusicStack,
  chooseNextMusic,
  switchToLastMusic,
} from "./utils/playListOperation";

const App = () => {
  const [musicOnPlay, setMusicOnPlay] = useState(null);
  // 音乐播放列表
  const [playList, setPlayList] = useState({ list: [], ptr: 0, });

  useEffect(() => {
    // 加载正在播放的音乐
    const music_on_play = JSON.parse(window.localStorage.getItem("musicOnPlay"));
    if ( music_on_play &&
         typeof music_on_play === "object" &&
         typeof music_on_play.music_id === "number" &&
         typeof music_on_play.music_name === "string" 
    ) {
      setMusicOnPlay(music_on_play);
      initMusicStack(music_on_play);
    } else {
      apiLastMusic(data => {
        const load_music = data ? data[0] : null;
        setMusicOnPlay(load_music);
        initMusicStack(load_music);
      });
    }
    
    // 加载音乐播放列表
    const play_list = JSON.parse(window.localStorage.getItem("playList"));
    if ( play_list &&
         typeof play_list === "object" &&
         typeof play_list.list === "object" &&
         typeof play_list.ptr === "number" &&
         play_list.list.length > 0
    ) {
      setPlayList(play_list);
    } else {
      apiLastMusic(data => {
        const load_play_list = {
          list: data ? data : [],
          ptr: 0,
        };
        setPlayList(load_play_list);
        addBeforeUnloadFunction(storePlayList, load_play_list, 0);
      });
    }
    
    // 浏览器关闭时间初始化
    initBeforeUnloadFunctionList();
    window.onbeforeunload = e => {
      carryBeforeUnloadFunction();
      return null;
    };
  }, []);

  // 切换播放的音乐
  const handleChangeMusic = ({ musicMsg=null, toNext=null, toLast=null }) => {
    var result = null;
    if ( musicMsg ) {
      result =  chooseNextMusic({ list: playList.list, currentIndex: playList.ptr, value: musicMsg, });
    } else if ( toNext ) {
      result =  chooseNextMusic({ list: playList.list, currentIndex: playList.ptr, operation: toNext, });
    } else if ( toLast ) {
      result =  switchToLastMusic(playList.ptr);
    }
    window.localStorage.setItem("musicOnPlay", JSON.stringify(result[0]));
    setMusicOnPlay(result[0]);
    const load_play_list = { list: playList.list, ptr: result[1], };
    setPlayList(load_play_list);
    addBeforeUnloadFunction(storePlayList, load_play_list, 0);
  };

  // 修改播放列表
  const handleChangePlayList = ( operation, value ) => {
    const new_list = playListOperation(playList.list, operation, value);
    const new_ptr = playList.ptr;
    var load_play_list = { list: [], ptr: new_ptr, };
    if ( typeof new_list === "object" ) {
      // 当播放列表改变时修改网页关闭函数列，并保证播放列表不为空
      if ( new_list.length === 0 ) {
        apiLastMusic(data => {
          load_play_list.list = data ? data : [];   
          setPlayList(load_play_list);
          addBeforeUnloadFunction(storePlayList, load_play_list, 0);
        });
      } else {
        load_play_list.list = new_list;
        setPlayList(load_play_list);
        addBeforeUnloadFunction(storePlayList, load_play_list, 0);
      }
    } else {
      // 发出警告
      const warning_string = new_list;
    }
  };

  return (
    <div>
      <HashRouter>
        <Route exact path="/" render={() => (<Home changeMusic={handleChangeMusic}/>)} />
        <Route path="/home" render={() => (<Home changeMusic={handleChangeMusic}/>)} />
        <Route path="/list" render={() => (<List changeMusic={handleChangeMusic}/>)} />
        <Route path="/upload" render={()=> (<Upload />)} />
      </HashRouter>
      <Music 
        musicOnPlay={musicOnPlay}
        onChangeMusic={handleChangeMusic}
      />
    </div>
  );
}

export default App;