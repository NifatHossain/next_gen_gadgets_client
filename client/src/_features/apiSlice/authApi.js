import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.token
      if (token) {
        headers.set("authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: "/register",
        method: "POST",
        body: credentials,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    oauthLogin: builder.mutation({
      query: (data) => ({
        url: "/oauth-login",
        method: "POST",
        body: data,
      }),
    }),
    getProfile: builder.query({
      query: () => "/profile",
      providesTags: ["Auth"],
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/change-password",
        method: "PUT",
        body: data,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/reset-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
})

export const {
  useRegisterMutation,
  useLoginMutation,
  useOauthLoginMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi
