import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from 'react-toastify'
const initialState = {
    likes: [],
    status: 'idle',
    error: null
}

export const loadLikes = createAsyncThunk('likes/loadLikes', async () => {
    const response = await axios.get(`${global.config.url}/like/u`)
    return response.data
})

export const addToLikes = createAsyncThunk('likes/addToLikes', async ({ _id }) => {
    const response = await axios.post(`${global.config.url}/like/u`, {
        "likedList": { "video": _id }
    })
    return response.data
})

export const removeFromLikes = createAsyncThunk('likes/removeFromLikes', async ({ _id }) => {
    const response = await axios.delete(`${global.config.url}/like/u/${_id}`)
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
            toast.success("Added to liked videos")
        },
        [addToLikes.rejected]: (state, action) => {
            toast.error("Couldn't Added To Liked videos")
        },
        [removeFromLikes.fulfilled]: (state, action) => {
            const foundLikeIndex = state.likes.findIndex(like => like._id === action.payload.id)
            if (foundLikeIndex > -1) {
                state.likes.splice(foundLikeIndex, 1)
                toast.success("Removed form liked videos")
            }
        },
        [removeFromLikes.rejected]: (state) => {
            toast.error("Couldn't removed from liked videos")
        },
    }

})



export const selectAllLikes = state => state.likes

export const findLikeById = (state, likeId) => state.likes.likes.some(like => like._id === likeId)

export default likeSlice.reducer