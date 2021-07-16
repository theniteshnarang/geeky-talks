import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Guide, NavMenu, PageNotFound } from './components'
import { setupAuthExceptionHandler, setupAuthHeaderForServiceCalls } from './features/auth/utils/serviceHandler';
import { SignUp, Login } from './features/auth';
import { Like } from './features/like';
import { VideosList, VideoSingle } from './features/videos';
import { SaveModel, Save } from './features/save';
import { authLogout } from './features/auth/authSlice';
import { loadLikes } from './features/like/likeSlice';
import { loadSaved } from './features/save/saveSlice';
import { ToastContainer } from 'react-toastify'

function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { token } = useSelector(state => state.auth)

  useEffect(() => {
    setupAuthHeaderForServiceCalls(token)
    setupAuthExceptionHandler(authLogout, navigate, dispatch)
    if (token) {
      dispatch(loadLikes())
      dispatch(loadSaved())
    }

  }, [token, dispatch, navigate])

  function PrivateRoute({ token, path, ...props }) {
    return token ? <Route {...props} path={path} /> : <Navigate state={{ from: path }} replace to="/login" />
  }



  return (
    <div className="App">
      <NavMenu />
      <Guide />
      <SaveModel />
      <div className="Main">
        <Routes>
          <Route path="/" element={<VideosList />} />
          <Route path="/v/:videoId" element={<VideoSingle />} />
          <PrivateRoute token={token} path="/like" element={<Like />} />
          <PrivateRoute token={token} path="/save" element={<Save />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
      <ToastContainer position="bottom-left" autoClose={1700} />
    </div>
  );
}

export default App;
