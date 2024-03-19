import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { setupAuthHeaderForServiceCalls } from './utils/serviceHandler'
import {
    setLocalStorage,
    clearLocalStorage,
    getLocalStorage,
} from './utils/localStorage'

export const authLogin = createAsyncThunk('auth/login', async ({ input }) => {
    const response = await axios.post(`${global.config.url}/auth/login`, input)
    setupAuthHeaderForServiceCalls(response.data.token)
    return response.data
})

export const authSignUp = createAsyncThunk(
    'auth/sign-up',
    async ({ input }) => {
        const response = await axios.post(
            `${global.config.url}/auth/sign-up`,
            input
        )
        return response.data
    }
)

const initialState = {
    user: getLocalStorage('login')?.['user'] || {},
    status: 'idle',
    error: null,
    token: getLocalStorage('login')?.['token'] || null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authLogout: (state) => {
            state.user = {}
            state.token = null
            state.status = 'idle'
            setupAuthHeaderForServiceCalls(null)
            clearLocalStorage('login')
        },
    },
    extraReducers: {
        [authLogin.fulfilled]: (state, action) => {
            const { token, data } = action.payload
            state.status = 'fulfilled'
            state.token = token
            state.user = data
            state.error = ''
            setLocalStorage('login', { token, user: data })
        },
        [authLogin.pending]: (state) => {
            state.status = 'loading'
        },
        [authLogin.rejected]: (state, action) => {
            state.status = 'failed'
            state.token = null
            state.user = {}
            state.error = action.error.message
        },
        [authSignUp.fulfilled]: (state, action) => {
            state.status = 'fulfilled'
        },
        [authSignUp.pending]: (state) => {
            state.status = 'loading'
        },
        [authSignUp.rejected]: (state) => {
            state.status = 'rejected'
        },
    },
})

export const selectAuth = (state) => state.auth

export const { authLogout } = authSlice.actions

export default authSlice.reducer
