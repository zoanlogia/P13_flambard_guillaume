import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from '../features/auth/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3001/api/v1',
    prepareHeaders: (headers, { getState }) => {
        let token = getState().auth.token;
        
        // If token is not in Redux state, try getting it from localStorage
        if (!token) {
            token = localStorage.getItem('auth_token');
        }

        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.originalStatus === 403) {
        console.log('sending refresh token')
        
        // send refresh token to get new access token 
        const refreshResult = await baseQuery('/refresh', api, extraOptions)
        console.log(refreshResult)
        if (refreshResult?.data) {
            const user = api.getState().auth.user;
            
            // Store the new token in localStorage as well
            localStorage.setItem('auth_token', refreshResult.data.token);
            
            // store the new token in Redux state
            api.dispatch(setCredentials({ ...refreshResult.data, user }))
            
            // retry the original query with new access token 
            result = await baseQuery(args, api, extraOptions)
        } else {
            // Clear the token from localStorage on logout
            localStorage.removeItem('auth_token');
            
            api.dispatch(logOut())
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})
