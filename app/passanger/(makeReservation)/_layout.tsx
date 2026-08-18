import { ReservationProvider } from "@/contexts/ReservationContext";
import { Stack } from 'expo-router';

export default function ReservationLayout() {
  return (
    <ReservationProvider>
      <Stack screenOptions={{ headerShown: false, }}>
        <Stack.Screen
          name="makeTrip"
          options={{
            title: "Make Reservation",
            // animation: "slide_from_right"
          }}
        />

        <Stack.Screen
          name="selectContact"
          options={{
            title: "Select Contact",
            animation: "slide_from_right"
          }}
        />
        <Stack.Screen
          name="addNewContact"
          options={{
            title: "Add New Contact",
            animation: "slide_from_right"
          }}
        />

        {/* <Stack.Screen
          name="add-contact"
          options={{
            title: "Add Contact",
          }}
        /> */}
      </Stack>
    </ReservationProvider>
  );
}