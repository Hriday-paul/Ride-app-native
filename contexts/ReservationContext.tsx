import { BookingContact } from "@/redux/types";
import React, {
    createContext,
    useState,
    ReactNode,
} from "react";

 type ReservationContextType = {
    bookingContact: BookingContact | null;
    setBookingContact: React.Dispatch<React.SetStateAction<BookingContact | null>>;
};

export const ReservationContext = createContext<
    ReservationContextType | undefined
>(undefined);

export function ReservationProvider({
    children,
}: {
    children: ReactNode;
}) {

    const [bookingContact, setBookingContact] = useState<BookingContact | null>(null);

    return (
        <ReservationContext.Provider
            value={{
                bookingContact,
                setBookingContact,
            }}
        >
            {children}
        </ReservationContext.Provider>
    );
}