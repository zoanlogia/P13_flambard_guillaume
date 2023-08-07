import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: 'auth',
    initialState: { 
        user: {
            email: null, 
            password: null, 
            token: null 
        }
    },
    reducers: {
        setCredentials: (state, action) => {
            const { email, password, token } = action.payload
            state.user.email = email
            state.user.password = password
            state.user.token = token
        },
        logOut: (state, action) => {
            state.user.email = null
            state.user.password = null
            state.user.token = null
        }
    },
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.user.token
