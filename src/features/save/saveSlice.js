import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loadSaved = createAsyncThunk('saved/loadSaved', async () => {
    const response = await axios.get('https://geeky-talks-backend.theniteshnarang.repl.co/save/u')
    return response.data
})

export const createPlaylist = createAsyncThunk('saved/createPlaylist', async ({ name, video }) => {
    const response = await axios.post('https://geeky-talks-backend.theniteshnarang.repl.co/save/u', {
        name, videos: [{ video: video._id }]
    })
    return response.data
})

export const addToPlaylist = createAsyncThunk('saved/addToPlaylist', async ({ playlistId, video }) => {
    const response = await axios.post(`https://geeky-talks-backend.theniteshnarang.repl.co/save/u/${playlistId}`, {
        videos: { video: video._id }
    })
    return response.data
})

export const removeVideoFromSave = createAsyncThunk('saved/removeVideoFromSave', async ({ playlistId, _id }) => {
    const response = await axios.delete(`https://geeky-talks-backend.theniteshnarang.repl.co/save/u/${playlistId}/${_id}`)
    return response.data
})

export const removePlaylist = createAsyncThunk('saved/removePlaylist', async ({ playlistId }) => {
    const response = await axios.delete(`https://geeky-talks-backend.theniteshnarang.repl.co/save/u/${playlistId}`)
    return response.data
})

const initialState = {
    saved: [],
    status: 'idle',
    error: null,
    isModelOpen: false,
    video: null
}

export const saveSlice = createSlice({
    name: "saved",
    initialState,
    reducers: {
        saveButtonPressed: (state, action) => {
            state.isModelOpen = !state.isModelOpen
            state.video = action.payload
        }
    },
    extraReducers: {
        [loadSaved.fulfilled]: (state, action) => {
            state.status = "fulfilled"
            state.saved = action.payload.data
        },
        [loadSaved.pending]: (state) => {
            state.status = "loading"
        },
        [loadSaved.rejected]: (state, action) => {
            state.status = "failed"
            state.error = action.error.message
        },
        [createPlaylist.fulfilled]: (state, action) => {
            const newplaylist = {
                _id: action.payload.data._id,
                name: action.meta.arg.name,
                videos: [action.meta.arg.video],
            }
            state.saved.push(newplaylist)
        },
        [addToPlaylist.fulfilled]: (state, action) => {
            const { playlistId, video } = action.meta.arg
            const findPlaylist = state.saved.find(item => item._id === playlistId)
            findPlaylist.videos.push(video)
        },
        [removeVideoFromSave.fulfilled]: (state, action) => {
            const { playlistId, _id } = action.meta.arg
            const playlistIndex = state.saved.findIndex(save => save._id === playlistId)
            const videoIndex = state.saved[playlistIndex].videos.findIndex(video => video._id === _id)
            videoIndex > -1 && state.saved[playlistIndex].videos.splice(videoIndex, 1)
        },
        [removePlaylist.fulfilled]: (state, action) => {
            const { playlistId } = action.meta.arg
            const playlistIndex = state.saved.findIndex(save => save._id === playlistId)
            playlistIndex > -1 && state.saved.splice(playlistIndex, 1)
        }
    }

})

export const { saveButtonPressed } = saveSlice.actions

export const selectAllSaved = state => state.saved

export const selectSavedById = (state, saveId) => state.saved.saved.find(save => save._id === saveId)

export default saveSlice.reducer