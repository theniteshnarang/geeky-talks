import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    videos: [],
    status: 'idle',
    error: null
}

export const loadVideos = createAsyncThunk('videos/loadVideos', async () => {
    const response = await axios.get('https://geeky-talks-backend.theniteshnarang.repl.co/video')
    return response.data
})


export const videoSlice = createSlice({
    name: "videos",
    initialState,
    reducers: {

    },
    extraReducers: {
        [loadVideos.fulfilled]: (state, action) => {
            state.videos = action.payload.data;
            state.status = "fulfilled"
        },
        [loadVideos.pending]: (state) => {
            state.status = "loading"
        },
        [loadVideos.rejected]: (state, action) => {
            state.status = "failed"
            state.error = action.error.message
        }
    }

})

export const selectAllVideos = state => state.videos

export const selectVideoById = (state, videoId) => state.videos.videos.find(video => video._id === videoId)

export default videoSlice.reducer