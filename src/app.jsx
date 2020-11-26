import React, { useState, useEffect } from "react";
import { HashRouter, Route } from "react-router-dom";
import "./app.css";
//import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Upload from "./pages/upload/Upload";
import Music from "./pages/music/Music";
import { 
  initBeforeUnloadFunctionList, 
  carryBeforeUnloadFunction 
} from "./utils/handleBeforeUnload"

const App = () => {
  const [musicOnPlay, setMusicOnPlay] = useState(JSON.parse(window.localStorage.getItem("musicOnPlay")));

  useEffect(() => {
    // 浏览器关闭时间初始化
    initBeforeUnloadFunctionList();
    window.onbeforeunload = e => {
      carryBeforeUnloadFunction();
      return null;
    };
  }, []);

  const handleChangeMusic = musicMsg => {
    if ( typeof musicMsg === "object" 
         && typeof musicMsg.music_id === "number" 
         && typeof musicMsg.music_name === "string" 
    ) {
      window.localStorage.setItem("musicOnPlay", JSON.stringify(musicMsg));
      setMusicOnPlay(musicMsg);
    } else {
      console.error("Parameter Type error!");
    }
  }

  return (
    <div>
      <HashRouter>
        <Route exact path="/" render={() => (<Home changeMusic={handleChangeMusic}/>)} />
        <Route path="/home" render={() => (<Home changeMusic={handleChangeMusic}/>)} />
        <Route path="/list" render={() => (<List changeMusic={handleChangeMusic}/>)} />
        <Route path="/upload" render={()=> (<Upload changeMusic={handleChangeMusic}/>)} />
      </HashRouter>
      <Music 
        musicOnPlay={musicOnPlay}
        onChangeMusic={handleChangeMusic}
      />
    </div>
  );
}

export default App;