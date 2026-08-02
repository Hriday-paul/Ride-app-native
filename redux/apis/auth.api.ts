import { baseApi } from "./base.api";

type LoginRequest = {
  phone: string;
  password: string;
};

type LoginResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    phone: string;
    role: 'rider' | 'driver';
  };
};

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    login: builder.mutation<LoginResponse, LoginRequest>({
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