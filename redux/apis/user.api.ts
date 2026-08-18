import { BookingContact, IUser } from "../types";
import { baseApi } from "./base.api";

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        bookingContacts: builder.query<{ message: string, data: BookingContact[] }, void>({
            query: () => ({
                url: '/booking-contacts',
            }),
        }),

    }),
});

export const { useBookingContactsQuery } = userApi;