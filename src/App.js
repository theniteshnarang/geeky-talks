import { useEffect, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Guide, NavMenu, PageNotFound } from './components'
import { setupAuthExceptionHandler, setupAuthHeaderForServiceCalls } from './features/auth/utils/serviceHandler';
import { SaveModel } from './features/save';
import { authLogout, selectAuth } from './features/auth/authSlice';
import { loadLikes } from './features/like/likeSlice';
import { loadSaved } from './features/save/saveSlice';
import { ToastContainer } from 'react-toastify'

const VideosList = lazy(() => import('./features/videos/VideosList'/* webpackChunkName: "videos-list" */));
const VideoSingle = lazy(() => import('./features/videos/VideoSingle'/* webpackChunkName: "video-single" */));
const Like = lazy(() => import('./features/like/Like'/* webpackChunkName: "like" */))
const Save = lazy(() => import('./features/save/Save'/* webpackChunkName: "save" */))
const Login = lazy(() => import('./features/auth/LoginForm'/* webpackChunkName: "login" */))
const SignUp = lazy(() => import('./features/auth/SignUpForm'/* webpackChunkName: "sign-up" */))

function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { token } = useSelector(selectAuth)

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
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<VideosList />} />
            <Route path="/v/:videoId" element={<VideoSingle />} />
            <PrivateRoute token={token} path="/like" element={<Like />} />
            <PrivateRoute token={token} path="/save" element={<Save />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </div>
      <ToastContainer position="bottom-left" autoClose={1700} />
    </div>
  );
}

export default App;
