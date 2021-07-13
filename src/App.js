import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { VideoSingle } from './features/videos/VideoSingle';
import { SignUp, Register } from './pages/Account';
import { Login } from './features/auth/LoginForm';
import { Like } from './features/like/Like';
import { Save } from './features/save/Save';
// import { Home } from './pages/Home'
import { NavMenu } from './components/NavMenu';
import { Guide } from './components/Guide'
import { VideosList } from './features/videos/VideosList';
import { setupAuthExceptionHandler, setupAuthHeaderForServiceCalls } from './features/auth/utils/serviceHandler';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { authLogout } from './features/auth/authSlice';
import { useDispatch, useSelector } from "react-redux";
import { loadLikes } from './features/like/likeSlice'
import { loadSaved } from './features/save/saveSlice';
import { SaveModel } from './features/save/SaveModel'

function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { token } = useSelector(state => state.auth)

  useEffect(() => {
    console.log("I am running with", token)
    setupAuthHeaderForServiceCalls(token)
    setupAuthExceptionHandler(authLogout, navigate, dispatch)
    if (token) {
      dispatch(loadLikes())
      dispatch(loadSaved())
    }

  }, [token, dispatch, navigate])

  function PrivateRoute({ token, path, ...props }) {
    console.log({ token, path }, 'private route')
    return token ? <Route {...props} path={path} /> : <Navigate state={{ from: path }} replace to="/register/login" />
  }

  return (
    <div className="App">
      <NavMenu />
      <Guide />
      <SaveModel />
      <div className="Main">
        <Routes>
          <Route path="/" element={<VideosList />} />
          <Route path="/:videoId" element={<VideoSingle />} />
          <PrivateRoute token={token} path="/like" element={<Like />} />
          <PrivateRoute token={token} path="/save" element={<Save />} />
          <Route path="/register" element={<Register />}>
            <Route path="login" element={<Login />} />
            <Route path="sign-up" element={<SignUp />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
