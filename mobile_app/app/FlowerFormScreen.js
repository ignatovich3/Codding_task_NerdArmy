// app/FlowerFormScreen.js
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
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import api from '@/utils/api';

export default function FlowerFormScreen() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState(''); // string -> konwersja przy wysyłce
  const [status, setStatus] = useState('');
  const [dateAdded, setDateAdded] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // 🔐 sprawdzenie logowania
  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Błąd', 'Musisz być zalogowany, aby dodać kwiat.');
        router.replace('/login');
      }
    })();
  }, [router]);

  const handleDateChange = (_event, selectedDate) => {
    const currentDate = selectedDate || dateAdded;
    if (Platform.OS !== 'ios') setShowDatePicker(false);
    setDateAdded(currentDate);
  };

  const handleSubmit = async () => {
    if (!name.trim()) return Alert.alert('Błąd', 'Podaj nazwę kwiatu.');
    if (!category.trim()) return Alert.alert('Błąd', 'Podaj kategorię.');
    if (!quantity || isNaN(Number(quantity)) || Number(quantity) < 0) {
      return Alert.alert('Błąd', 'Podaj prawidłową ilość (liczba nieujemna).');
    }
    if (!status) return Alert.alert('Błąd', 'Wybierz status.');

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Błąd', 'Brak tokena. Zaloguj się ponownie.');
        return router.replace('/login');
      }

      const payload = {
        name: name.trim(),
        description: description.trim(),
        category: category.trim(),
        quantity: parseInt(quantity, 10),
        status,
        date_added: dateAdded.toISOString(),
      };

      await api.post('/flowers', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Alert.alert('Sukces', 'Kwiat został dodany!');
      setName('');
      setDescription('');
      setCategory('');
      setQuantity('');
      setStatus('');
      setDateAdded(new Date());
      router.replace('/flowers'); // wróć na listę
    } catch (err) {
      console.error('Błąd podczas dodawania kwiatu:', err?.response?.data || err?.message);
      if (err?.response?.status === 401) {
        Alert.alert('Nieautoryzowany', 'Zaloguj się ponownie.');
        router.replace('/login');
      } else {
        Alert.alert('Błąd', 'Nie udało się dodać kwiatu.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dodaj / Edytuj Kwiat</Text>

      <TextInput
        placeholder="Nazwa kwiatu"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Opis"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        multiline
      />

      <TextInput
        placeholder="Kategoria"
        value={category}
        onChangeText={setCategory}
        style={styles.input}
      />

      <TextInput
        placeholder="Ilość"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.label}>Status zapasu</Text>
      <View style={styles.pickerWrapper}>
        <Picker selectedValue={status} onValueChange={setStatus}>
          <Picker.Item label="Wybierz status..." value="" />
          <Picker.Item label="Dostępny" value="Dostępny" />
          <Picker.Item label="Mało" value="Mało" />
          <Picker.Item label="Brak" value="Brak" />
        </Picker>
      </View>

      <Text style={styles.label}>Data dodania: {dateAdded.toLocaleDateString()}</Text>
      <Button title="Wybierz datę" onPress={() => setShowDatePicker(true)} />

      {showDatePicker && (
        <DateTimePicker
          value={dateAdded}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <View style={{ marginTop: 20 }}>
        <Button title="Zapisz" onPress={handleSubmit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'stretch',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  label: {
    marginBottom: 6,
    fontWeight: 'bold',
    fontSize: 15,
  },
});
