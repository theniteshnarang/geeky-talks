import { configureStore } from "@reduxjs/toolkit";
import videosReducer from '../features/videos/videoSlice';
import likeReducer from '../features/like/likeSlice';
import saveReducer from '../features/save/saveSlice';
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
    reducer: {
        videos: videosReducer,
        likes: likeReducer,
        saved: saveReducer,
        auth: authReducer
    }
})