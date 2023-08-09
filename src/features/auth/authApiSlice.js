import { apiSlice } from "../../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/user/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    getUserProfile: builder.query({
      query: () => ({
        url: "/user/profile",
        method: "POST",
        body: {
            token: localStorage.getItem("token"),
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useGetUserProfileQuery } = authApiSlice;
