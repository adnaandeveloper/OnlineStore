import { USERS_URL } from "../constants";

import { apiSlice } from "./apiSlice";

export const userssApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation } = userssApiSlice;
