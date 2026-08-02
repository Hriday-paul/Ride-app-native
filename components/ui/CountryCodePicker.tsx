// components/ui/CountryCodePicker.tsx
import { useMemo, useState } from 'react';
import {
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// constants/countryCodes.ts
export const COUNTRY_CODES = [
  { code: 'BD', name: 'Bangladesh', dial: '880', flag: '🇧🇩' },
  { code: 'US', name: 'United States', dial: '1', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', dial: '44', flag: '🇬🇧' },
  { code: 'IN', name: 'India', dial: '91', flag: '🇮🇳' },
  { code: 'PK', name: 'Pakistan', dial: '92', flag: '🇵🇰' },
  { code: 'SA', name: 'Saudi Arabia', dial: '966', flag: '🇸🇦' },
  { code: 'AE', name: 'UAE', dial: '971', flag: '🇦🇪' },
  { code: 'MY', name: 'Malaysia', dial: '60', flag: '🇲🇾' },
  { code: 'SG', name: 'Singapore', dial: '65', flag: '🇸🇬' },
  { code: 'AU', name: 'Australia', dial: '61', flag: '🇦🇺' },
  { code: 'CA', name: 'Canada', dial: '1', flag: '🇨🇦' },
  { code: 'DE', name: 'Germany', dial: '49', flag: '🇩🇪' },
  { code: 'FR', name: 'France', dial: '33', flag: '🇫🇷' },
  { code: 'IT', name: 'Italy', dial: '39', flag: '🇮🇹' },
  { code: 'JP', name: 'Japan', dial: '81', flag: '🇯🇵' },
  { code: 'KR', name: 'South Korea', dial: '82', flag: '🇰🇷' },
  { code: 'CN', name: 'China', dial: '86', flag: '🇨🇳' },
  { code: 'BR', name: 'Brazil', dial: '55', flag: '🇧🇷' },
  { code: 'MX', name: 'Mexico', dial: '52', flag: '🇲🇽' },
  { code: 'ZA', name: 'South Africa', dial: '27', flag: '🇿🇦' },
  { code: 'NG', name: 'Nigeria', dial: '234', flag: '🇳🇬' },
  { code: 'EG', name: 'Egypt', dial: '20', flag: '🇪🇬' },
  { code: 'TR', name: 'Turkey', dial: '90', flag: '🇹🇷' },
  { code: 'ID', name: 'Indonesia', dial: '62', flag: '🇮🇩' },
  { code: 'PH', name: 'Philippines', dial: '63', flag: '🇵🇭' },
  { code: 'TH', name: 'Thailand', dial: '66', flag: '🇹🇭' },
  { code: 'VN', name: 'Vietnam', dial: '84', flag: '🇻🇳' },
  { code: 'NP', name: 'Nepal', dial: '977', flag: '🇳🇵' },
  { code: 'LK', name: 'Sri Lanka', dial: '94', flag: '🇱🇰' },
  { code: 'MM', name: 'Myanmar', dial: '95', flag: '🇲🇲' },
];

type Country = typeof COUNTRY_CODES[0];

type Props = {
  selected: Country;
  onSelect: (country: Country) => void;
};

export default function CountryCodePicker({ selected, onSelect }: Props) {
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() =>
    COUNTRY_CODES.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.dial.includes(search)
    ),
    [search]
  );

  const handleSelect = (country: Country) => {
    onSelect(country);
    setVisible(false);
    setSearch('');
  };

  return (
    <>
      {/* Trigger Button */}
      <TouchableOpacity
        onPress={() => setVisible(true)}
        className="flex-row items-center pr-3 py-2 gap-1"
      >
        <Text className="text-xl">{selected.flag}</Text>
        <Text className="text-gray-700 font-semibold text-sm">+{selected.dial}</Text>
        {/* <Text className="text-gray-400 text-xs">▾</Text> */}
        <MaterialIcons name="keyboard-arrow-down" size={20} className='text-gray-700' />
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        visible={visible}
        animationType="slide"
        transparent
        onRequestClose={() => setVisible(false)}
      >
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-3xl px-4 pt-4 pb-8" style={{ height: '75%' }}>

            {/* Handle bar */}
            <View className="w-10 h-1 bg-gray-300 rounded-full self-center mb-4" />

            {/* Title */}
            <Text className="text-lg font-bold text-gray-900 mb-3 text-center">
              Select Country
            </Text>

            {/* Search */}
            <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2 mb-3">
              <Text className="text-gray-400 mr-2">🔍</Text>
              <TextInput
                className="flex-1 text-gray-800 text-sm"
                placeholder="Search country or code..."
                placeholderTextColor="#9ca3af"
                value={search}
                onChangeText={setSearch}
                autoFocus
              />
              {search.length > 0 && (
                <TouchableOpacity onPress={() => setSearch('')}>
                  <Text className="text-gray-400 text-lg">✕</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* List */}
            <FlatList
              data={filtered}
              keyExtractor={(item) => item.code}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleSelect(item)}
                  className={`flex-row items-center py-3 px-2 border-b border-gray-100 ${selected.code === item.code ? 'bg-blue-50' : ''
                    }`}
                >
                  <Text className="text-2xl mr-3">{item.flag}</Text>
                  <Text className="flex-1 text-gray-800 text-sm">{item.name}</Text>
                  <Text className="text-gray-500 text-sm font-medium">+{item.dial}</Text>
                  {selected.code === item.code && (
                    <MaterialIcons
                      name="check"
                      size={14}
                      className='text-primary ml-1.5'
                    />
                  )}
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <View className="items-center py-10">
                  <Text className="text-gray-400 text-sm">No countries found</Text>
                </View>
              }
            />

          </View>
        </View>
      </Modal>
    </>
  );
}