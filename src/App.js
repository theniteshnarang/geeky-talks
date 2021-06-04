import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {VideoStandard, VideoSingle} from './pages/Videos';
import {Home} from './pages/Home'
import {NavMenu} from './components/NavMenu';
import {Guide} from './components/Guide'

function App() {
  return (
    <div className="App">
      <NavMenu />
      <Guide/>
      <div className="Main">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/videos" element={<VideoStandard/>}/>
          <Route path="/videos/:videoId" element={<VideoSingle/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
