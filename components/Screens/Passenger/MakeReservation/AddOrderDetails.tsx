import { BookingContact } from '@/redux/types';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
    FlatList,
    Modal,
    Pressable,
    Text,
    TextInput,
    View,
} from 'react-native';

/* ------------------------------------------------------------------ */
/* Generic select field                                               */
/* ------------------------------------------------------------------ */

function SelectField({
    label,
    value,
    required,
    onPress,
}: {
    label: string;
    value?: string;
    required?: boolean;
    onPress: () => void;
}) {
    return (
        <Pressable
            onPress={onPress}
            className="border border-gray-200 rounded-xl px-4 py-4 flex-row items-center justify-between active:bg-gray-50"
        >
            <Text className={value ? "text-gray-900 text-base" : "text-gray-400 text-base"}>
                {value || `${label}${required ? "*" : ""}`}
            </Text>
            <Ionicons name="chevron-down" size={18} color="#9CA3AF" />
        </Pressable>
    );
}

/* ------------------------------------------------------------------ */
/* Simple option-list modal — used for Order Type                     */
/* ------------------------------------------------------------------ */

function OptionListModal({
    visible,
    title,
    options,
    onSelect,
    onClose,
}: {
    visible: boolean;
    title: string;
    options: string[];
    onSelect: (value: string) => void;
    onClose: () => void;
}) {
    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            <Pressable className="flex-1 bg-black/40 justify-end" onPress={onClose}>
                <Pressable className="bg-white rounded-t-3xl px-5 pt-5 pb-8" onPress={(e) => e.stopPropagation()}>
                    <View className="w-10 h-1 bg-gray-300 rounded-full self-center mb-4" />
                    <Text className="text-lg font-semibold text-gray-900 mb-4">{title}</Text>

                    {options.map((opt) => (
                        <Pressable
                            key={opt}
                            onPress={() => {
                                onSelect(opt);
                                onClose();
                            }}
                            className="py-3.5 border-b border-gray-100 active:bg-gray-50"
                        >
                            <Text className="text-gray-800 text-base">{opt}</Text>
                        </Pressable>
                    ))}
                </Pressable>
            </Pressable>
        </Modal>
    );
}

/* ------------------------------------------------------------------ */
/* Booking contact selector                                           */
/* ------------------------------------------------------------------ */

type BookingContactValue = { mode: "me" | "other"; contact: BookingContact | null };

type BookingContactFieldProps = {
    currentUser: { id: number; name: string; phone: string };
    contacts: BookingContact[];
    value: BookingContactValue;
    onChange: (value: BookingContactValue) => void;
};

function BookingContactField({ currentUser, contacts, value, onChange }: BookingContactFieldProps) {
    const router = useRouter();

    // small "For me / Another" dropdown
    const [dropdownVisible, setDropdownVisible] = useState(false);

    // full picker modal (search list + add new), only for "Another"
    const [pickerVisible, setPickerVisible] = useState(false);
    const [search, setSearch] = useState("");

    const filteredContacts = useMemo(() => {
        if (!search.trim()) return contacts;
        const q = search.toLowerCase();
        return contacts.filter((c) =>
            `${c.first_name} ${c.last_name ?? ""}`.toLowerCase().includes(q) ||
            c.phone.includes(q)
        );
    }, [search, contacts]);

    const displayValue =
        value.mode === "me"
            ? `${currentUser.name} (You)`
            : value.contact
                ? `${value.contact.first_name} ${value.contact.last_name ?? ""}`.trim()
                : undefined;

    const handleSelectMe = () => {
        onChange({ mode: "me", contact: null });
        setDropdownVisible(false);
    };

    const handleOpenAnother = () => {
        setDropdownVisible(false);
        setSearch("");
        setPickerVisible(true);
    };

    const handleSelectContact = (contact: BookingContact) => {
        onChange({ mode: "other", contact });
        setPickerVisible(false);
    };

    const handleAddNewContact = () => {
        setPickerVisible(false);
        // router.push("/passanger/booking-contact/add"); // adjust route to your actual add-contact screen
    };

    return (
        <>
            <SelectField label="Search for booking contact" value={displayValue} onPress={() => setDropdownVisible(true)} />

            {/* Small dropdown: For me / Another */}
            <Modal visible={dropdownVisible} transparent animationType="fade" onRequestClose={() => setDropdownVisible(false)}>
                <Pressable className="flex-1 bg-black/30 justify-end" onPress={() => setDropdownVisible(false)}>
                    <Pressable className="bg-white rounded-t-3xl px-5 pt-5 pb-8" onPress={(e) => e.stopPropagation()}>
                        <View className="w-10 h-1 bg-gray-300 rounded-full self-center mb-4" />
                        <Text className="text-lg font-semibold text-gray-900 mb-4">Booking Contact</Text>

                        <Pressable
                            onPress={handleSelectMe}
                            className="flex-row items-center justify-between border border-gray-200 rounded-xl px-4 py-3.5 mb-3 active:bg-gray-50"
                        >
                            <View>
                                <Text className="text-gray-900 font-medium text-base">For me</Text>
                                <Text className="text-gray-400 text-sm mt-0.5">{currentUser.name}</Text>
                            </View>
                            {value.mode === "me" && <Ionicons name="checkmark-circle" size={20} color="#dc2626" />}
                        </Pressable>

                        <Pressable
                            onPress={handleOpenAnother}
                            className="flex-row items-center justify-between border border-gray-200 rounded-xl px-4 py-3.5 active:bg-gray-50"
                        >
                            <View>
                                <Text className="text-gray-900 font-medium text-base">Another person</Text>
                                <Text className="text-gray-400 text-sm mt-0.5">
                                    {value.mode === "other" && value.contact
                                        ? `${value.contact.first_name} ${value.contact.last_name ?? ""}`.trim()
                                        : "Choose from your contacts"}
                                </Text>
                            </View>
                            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
                        </Pressable>
                    </Pressable>
                </Pressable>
            </Modal>

            {/* Full picker: search + list + add new, opened from "Another" */}
            <Modal visible={pickerVisible} transparent animationType="slide" onRequestClose={() => setPickerVisible(false)}>
                <Pressable className="flex-1 bg-black/40 justify-end" onPress={() => setPickerVisible(false)}>
                    <Pressable
                        className="bg-white rounded-t-3xl px-5 pt-5 pb-8"
                        style={{ maxHeight: "80%" }}
                        onPress={(e) => e.stopPropagation()}
                    >
                        <View className="w-10 h-1 bg-gray-300 rounded-full self-center mb-4" />

                        <View className="flex-row items-center mb-4">
                            <Pressable onPress={() => { setPickerVisible(false); setDropdownVisible(true); }} className="mr-2">
                                <Ionicons name="chevron-back" size={20} color="#374151" />
                            </Pressable>
                            <Text className="text-lg font-semibold text-gray-900">Select Contact</Text>
                        </View>

                        {/* Search */}
                        <View className="flex-row items-center border border-gray-200 rounded-xl px-3 mb-3">
                            <Ionicons name="search" size={18} color="#9CA3AF" />
                            <TextInput
                                value={search}
                                onChangeText={setSearch}
                                placeholder="Search name or phone"
                                placeholderTextColor="#9CA3AF"
                                className="flex-1 px-2 py-3 text-gray-900 text-base"
                            />
                        </View>

                        <FlatList
                            data={filteredContacts}
                            keyExtractor={(item) => String(item.id)}
                            keyboardShouldPersistTaps="handled"
                            ItemSeparatorComponent={() => <View className="h-px bg-gray-100" />}
                            style={{ maxHeight: 280 }}
                            renderItem={({ item }) => {
                                const isSelected = value.mode === "other" && value.contact?.id === item.id;
                                return (
                                    <Pressable
                                        onPress={() => handleSelectContact(item)}
                                        className="flex-row items-center justify-between py-3.5 active:bg-gray-50"
                                    >
                                        <View>
                                            <Text className="text-gray-900 font-medium text-base">
                                                {item.first_name} {item.last_name ?? ""}
                                            </Text>
                                            <Text className="text-gray-400 text-sm mt-0.5">{item.phone}</Text>
                                        </View>
                                        {isSelected && <Ionicons name="checkmark-circle" size={20} color="#dc2626" />}
                                    </Pressable>
                                );
                            }}
                            ListEmptyComponent={
                                <Text className="text-gray-400 text-sm text-center py-6">
                                    No matching contacts
                                </Text>
                            }
                        />

                        <Pressable
                            onPress={handleAddNewContact}
                            className="flex-row items-center justify-center gap-2 border border-dashed border-gray-300 rounded-xl py-3.5 mt-3 active:bg-gray-50"
                        >
                            <Ionicons name="add-circle-outline" size={18} color="#dc2626" />
                            <Text className="text-red-600 font-medium text-sm">Add new contact</Text>
                        </Pressable>
                    </Pressable>
                </Pressable>
            </Modal>
        </>
    );
}

/* ------------------------------------------------------------------ */
/* Order Details card                                                 */
/* ------------------------------------------------------------------ */

const ORDER_TYPES = ["One Way", "Round Trip", "Hourly"];

export default function AddOrderDetails({
    currentUser,
    contacts,
}: {
    currentUser: { id: number; name: string; phone: string };
    contacts: BookingContact[];
}) {
    const [bookingContact, setBookingContact] = useState<BookingContactValue>({ mode: "me", contact: null });
    const [orderTypeModalVisible, setOrderTypeModalVisible] = useState(false);
    const [orderType, setOrderType] = useState<string | undefined>(undefined);

    return (
        <View className="bg-white rounded-2xl pt-5 pb-6">
            <Text className="text-xl font-bold text-gray-900 mb-3">Order Details</Text>
            <View className="h-px bg-gray-200 mb-5" />

            <View className="gap-3">
                <BookingContactField
                    currentUser={currentUser}
                    contacts={contacts}
                    value={bookingContact}
                    onChange={setBookingContact}
                />

                <SelectField
                    label="Order Type"
                    required
                    value={orderType}
                    onPress={() => setOrderTypeModalVisible(true)}
                />
            </View>

            <OptionListModal
                visible={orderTypeModalVisible}
                title="Select Order Type"
                options={ORDER_TYPES}
                onSelect={setOrderType}
                onClose={() => setOrderTypeModalVisible(false)}
            />
        </View>
    );
}