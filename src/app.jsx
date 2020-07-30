import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./app.css";
//import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Upload from "./pages/upload/Upload";
import Music from "./pages/music/Music";

const App = () => {
  const [musicStorage, setMusicStorage] = useState(window.localStorage.getItem("music_id"));

  useEffect(() => {
    setMusicStorage(window.localStorage.getItem("music_id"));
  }, []);
  const handleChangeMusic = (music_id) => {
    window.localStorage.setItem("music_id", music_id);
    setMusicStorage(music_id);
  }

  return (
    <div>
      <BrowserRouter>
        <Route exact path="/" render={() => (<Home changeMusic={handleChangeMusic}/>)} />
        <Route path="/home" render={() => (<Home changeMusic={handleChangeMusic}/>)} />
        <Route path="/list" render={() => (<List changeMusic={handleChangeMusic}/>)} />
        <Route path="/upload" render={()=> (<Upload changeMusic={handleChangeMusic}/>)} />
      </BrowserRouter>
      <Music musicStorage={musicStorage}/>
    </div>
  );
}

export default App;