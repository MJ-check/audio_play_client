import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
//import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Upload from "./pages/upload/Upload";
import Music from "./pages/music/Music";
import MusicPendant from "./pages/musicPendant/MusicPendant";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/list" component={List} />
        <Route path="/upload" component={Upload} />
        <Route path="/music" component={Music} />
      </BrowserRouter>
      <MusicPendant />
    </div>
  );
}

export default App;