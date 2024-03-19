import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    videos: [],
    status: 'idle',
    search: '',
    error: null,
}

export const loadVideos = createAsyncThunk('videos/loadVideos', async () => {
    const response = await axios.get(`${global.config.url}/video`)
    return response.data
})

export const videoSlice = createSlice({
    name: 'videos',
    initialState,
    reducers: {
        querySearch: (state, action) => {
            state.search = action.payload.query
        },
    },
    extraReducers: {
        [loadVideos.fulfilled]: (state, action) => {
            state.videos = action.payload.data
            state.status = 'fulfilled'
        },
        [loadVideos.pending]: (state) => {
            state.status = 'loading'
        },
        [loadVideos.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
    },
})

export const { querySearch } = videoSlice.actions

export const selectVideos = (state) => state.videos

export const selectVideoById = (state, videoId) =>
    state.videos.videos.find((video) => video._id === videoId)

export default videoSlice.reducer
