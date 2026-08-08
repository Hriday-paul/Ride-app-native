import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout, setTokens } from '../slices/auth.slice';
import { RootState } from '../store';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://192.168.0.100:3700/api', // 👈 your Express API URL
  prepareHeaders: (headers, { getState }) => {
    // Attach JWT token to every request automatically
    const auth = (getState() as RootState).auth;

    if (auth?.authToken) {
      headers.set('token', `${auth?.authToken}`);
    }

    if (auth?.accessToken) {
      headers.set('Authorization', `Bearer ${auth?.accessToken}`);
    }

    return headers;
  },
});

// Refresh the base----------------------------------------------------------------
const baseQueryWithReauth: typeof baseQuery = async (
  args,
  api,
  extraOptions,
) => {

  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {

    //access state from redux store
    const state = api.getState() as RootState;
    const refreshToken = state.auth.refreshToken;

    if (refreshToken) {

      const refreshResult = await baseQuery(
        {
          url: "/auth/refresh",
          method: "POST",
          headers: {
            token: refreshToken
          },
          body: { refreshToken: refreshToken },
        },
        api,
        extraOptions,
      ) as { data: { data: { accessToken: string } } };

      // Check if refreshResult contains data and accessToken
      if (refreshResult?.data && refreshResult?.data?.data?.accessToken) {

        const newAccessToken = refreshResult?.data?.data?.accessToken;

        // Retry the original request with the new token
        api.dispatch(setTokens({
          accessToken: newAccessToken,
          refreshToken: refreshToken
        }));

        result = await baseQuery(args, api, extraOptions);
      } else {
        // Logout user if refresh token fails
        api.dispatch(logout());
      }
    } else {
      api.dispatch(logout());
      // api.dispatch(removeUser());
    }
  }

  return result;
};


export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Profile', 'completedTrips', "incompleteTrips"],
  endpoints: () => ({}),
});