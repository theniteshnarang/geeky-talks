import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    saved: [],
    status: 'idle',
    error: null
}

export const loadSaved = createAsyncThunk('saved/loadSaved', async () => {
    const response = await axios.get('https://geeky-talks-backend.theniteshnarang.repl.co/save/u')
    return response.data
})


export const saveSlice = createSlice({
    name: "saved",
    initialState,
    reducers: {

    },
    extraReducers: {
        [loadSaved.fulfilled]: (state, action) => {
            state.status = "fulfilled"
            state.saved = action.payload.data.savedList
        },
        [loadSaved.pending]: (state) => {
            state.status = "loading"
        },
        [loadSaved.rejected]: (state, action) => {
            state.status = "failed"
            state.error = action.error.message
        }
    }

})

export const selectAllSaved = state => state.saved

export const selectSavedById = (state, saveId) => state.saved.saved.find(save => save._id === saveId)

export default saveSlice.reducer