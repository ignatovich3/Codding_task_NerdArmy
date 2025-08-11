import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Text,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@/utils/api';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function EditFlowerScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [status, setStatus] = useState('');
  const [dateAdded, setDateAdded] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const fetchFlower = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await api.get(`/flowers/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const flower = response.data;
        setName(flower.name || '');
        setDescription(flower.description || '');
        setCategory(flower.category || '');
        setQuantity(String(flower.quantity ?? ''));
        setStatus(flower.status || '');
        if (flower.date_added) setDateAdded(new Date(flower.date_added));
      } catch (error) {
        console.error('Błąd ładowania kwiatu:', error);
        Alert.alert('Błąd', 'Nie udało się załadować danych kwiatu.');
      }
    };
    fetchFlower();
  }, [id]);

  const handleDateChange = (_event, selectedDate) => {
    const currentDate = selectedDate || dateAdded;
    if (Platform.OS !== 'ios') setShowDatePicker(false);
    setDateAdded(currentDate);
  };

  const handleUpdate = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      await api.put(
        `/flowers/${id}`,
        {
          name,
          description,
          category,
          quantity: parseInt(quantity, 10),
          status,
          date_added: dateAdded.toISOString(),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Alert.alert('Sukces', 'Zmieniono dane kwiatu!');
      // ⬇️ kluczowe: wracamy/odświeżamy listę
      router.replace('/flowers');
    } catch (error) {
      console.error('Błąd zapisu:', error);
      Alert.alert('Błąd', 'Nie udało się zapisać zmian.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edytuj Kwiat</Text>

      <TextInput
        placeholder="Nazwa"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Opis"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />

      <Text style={styles.label}>Kategoria</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={category}
          onValueChange={(value) => setCategory(value)}
        >
          <Picker.Item label="Wybierz kategorię..." value="" />
          <Picker.Item label="Piękny" value="Piękny" />
          <Picker.Item label="Rzadki" value="Rzadki" />
          <Picker.Item label="Chroniony" value="Chroniony" />
        </Picker>
      </View>

      <TextInput
        placeholder="Ilość"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.label}>Status</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={status}
          onValueChange={(value) => setStatus(value)}
        >
          <Picker.Item label="Wybierz status..." value="" />
          <Picker.Item label="Dostępny" value="dostępny" />
          <Picker.Item label="Niedostępny" value="niedostępny" />
        </Picker>
      </View>

      <Text style={styles.label}>
        Data dodania: {dateAdded.toLocaleDateString()}
      </Text>
      <Button title="Zmień datę" onPress={() => setShowDatePicker(true)} />

      {showDatePicker && (
        <DateTimePicker
          value={dateAdded}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <View style={{ marginTop: 20 }}>
        <Button title="ZAPISZ ZMIANY" onPress={handleUpdate} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flex: 1 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 6,
    marginBottom: 16, paddingHorizontal: 12, paddingVertical: 10, fontSize: 16,
  },
  pickerWrapper: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 6,
    marginBottom: 16, overflow: 'hidden',
  },
  label: { marginBottom: 6, fontWeight: 'bold', fontSize: 15 },
});
