import { Stack } from 'expo-router';

export const unstable_settings = {
    anchor: '(tabs)',
};

export default function AuthLayout() {

    return (

        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="wellcome" options={{ headerShown: false }} />
            {/* <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} /> */}
        </Stack>

    );
}
