import { IReservation } from "../types";
import { baseApi } from "./base.api";

export const reservationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        passengerCompletedTrips: builder.query<{ message: string, data: IReservation[]}, void>({
            query: () => ({
                url: '/reservations/my-bookings',
            }),
            providesTags: ['completedTrips'],
        }),

        passangerNotFinishedTrips: builder.query<{ message: string, data: IReservation[]}, void>({
            query: () => ({
                url: '/reservations/incomplete-bookings',
            }),
            providesTags: ['incompleteTrips'],
        }),



    }),
});

export const { usePassengerCompletedTripsQuery, usePassangerNotFinishedTripsQuery } = reservationApi;