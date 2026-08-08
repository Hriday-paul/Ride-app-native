import { IUser } from "../types";
import { baseApi } from "./base.api";

type LoginRequest = {
  phone: string;
  password: string;
};

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: IUser;
};

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    login: builder.mutation<{message: string, data: LoginResponse}, LoginRequest>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),

    register: builder.mutation<LoginResponse, { name: string; phone: string; password: string }>({
      query: (body) => ({
        url: '/auth/create',
        method: 'POST',
        body,
      }),
    }),

  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;