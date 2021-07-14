import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    likes: [],
    status: 'idle',
    error: null
}

export const loadLikes = createAsyncThunk('likes/loadLikes', async () => {
    const response = await axios.get('https://geeky-talks-backend.theniteshnarang.repl.co/like/u')
    return response.data
})

export const addToLikes = createAsyncThunk('likes/addToLikes', async ({ _id }) => {
    const response = await axios.post('https://geeky-talks-backend.theniteshnarang.repl.co/like/u', {
        "likedList": { "video": _id }
    })
    return response.data
})

export const removeFromLikes = createAsyncThunk('likes/removeFromLikes', async ({ _id }) => {
    const response = await axios.delete(`https://geeky-talks-backend.theniteshnarang.repl.co/like/u/${_id}`)
    return response.data
})

export const likeSlice = createSlice({
    name: "likes",
    initialState,
    reducers: {

    },
    extraReducers: {
        [loadLikes.fulfilled]: (state, action) => {
            state.status = "fulfilled"
            state.likes = action.payload.data.likedList
        },
        [loadLikes.pending]: (state) => {
            state.status = "loading"
        },
        [loadLikes.rejected]: (state, action) => {
            state.status = "failed"
            state.error = action.error.message
        },
        [addToLikes.fulfilled]: (state, action) => {
            state.likes.push(action.meta.arg)
        },
        [removeFromLikes.fulfilled]: (state, action) => {
            const foundLikeIndex = state.likes.findIndex(like => like._id === action.payload.id)
            foundLikeIndex > -1 && state.likes.splice(foundLikeIndex, 1)
        }
    }

})



export const selectAllLikes = state => state.likes

export const findLikeById = (state, likeId) => state.likes.likes.some(like => like._id === likeId)

export default likeSlice.reducer