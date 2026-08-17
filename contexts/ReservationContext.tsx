import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
} from "react";

export type Contact = {
    id: string;
    name: string;
    phone: string;
};

export type TripType = "oneWay" | "roundTrip" | "hourly";

export type ReservationState = {
    contact: Contact | null;

    tripType: TripType;

    pickupDate: string | null;
    pickupTime: string | null;
    pickupLocation: string | null;

    dropoffLocation: string | null;
};

const initialState: ReservationState = {
    contact: null,

    tripType: "oneWay",

    pickupDate: null,
    pickupTime: null,
    pickupLocation: null,

    dropoffLocation: null,
};

type ReservationContextType = {
    reservation: ReservationState;

    setReservation: React.Dispatch<
        React.SetStateAction<ReservationState>
    >;

    updateReservation: <K extends keyof ReservationState>(
        key: K,
        value: ReservationState[K]
    ) => void;

    resetReservation: () => void;
};

const ReservationContext = createContext<
    ReservationContextType | undefined
>(undefined);

export function ReservationProvider({
    children,
}: {
    children: ReactNode;
}) {

    const [reservation, setReservation] =
        useState<ReservationState>(initialState);

    const updateReservation = <K extends keyof ReservationState>(
        key: K,
        value: ReservationState[K]
    ) => {
        setReservation((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const resetReservation = () => {
        setReservation(initialState);
    };

    return (
        <ReservationContext.Provider
            value={{
                reservation,
                setReservation,
                updateReservation,
                resetReservation,
            }}
        >
            {children}
        </ReservationContext.Provider>
    );
}

export function useReservation() {
    const context = useContext(ReservationContext);

    if (!context) {
        throw new Error(
            "useReservation must be used inside ReservationProvider"
        );
    }

    return context;
}