import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Text,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@/utils/api';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';

export default function FlowerFormScreen() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [status, setStatus] = useState('');
  const [dateAdded, setDateAdded] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const router = useRouter();

  // 🔒 Wymuszenie logowania
  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Błąd', 'Musisz być zalogowany, aby dodać kwiat.');
        router.replace('/login');
      }
    };
    checkAuth();
  }, []);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateAdded;
    setShowDatePicker(Platform.OS === 'ios');
    setDateAdded(currentDate);
  };

  const handleAddFlower = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Błąd', 'Nie znaleziono tokena. Zaloguj się ponownie.');
        router.replace('/login');
        return;
      }

      const payload = {
        name,
        description,
        category,
        quantity: parseInt(quantity),
        status,
        date_added: dateAdded.toISOString(),
      };

      const response = await api.post('/flowers', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Alert.alert('Sukces', 'Kwiat został dodany!');
      setName('');
      setDescription('');
      setCategory('');
      setQuantity('');
      setStatus('');
      setDateAdded(new Date());
    } catch (error) {
      console.error('Błąd dodawania kwiata:', error.response?.data || error.message);
      if (error.response?.status === 401) {
        Alert.alert('Nieautoryzowany', 'Zaloguj się ponownie.');
        router.replace('/login');
      } else {
        Alert.alert('Błąd', 'Nie udało się dodać kwiata.');
      }
    }
  };

  return (
    <View style={styles.container}>
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
      <Picker
        selectedValue={category}
        onValueChange={setCategory}
        style={styles.input}
      >
        <Picker.Item label="Wybierz kategorię..." value="" />
        <Picker.Item label="Piękny" value="Piękny" />
        <Picker.Item label="Rzadki" value="Rzadki" />
        <Picker.Item label="Chroniony" value="Chroniony" />
      </Picker>

      <TextInput
        placeholder="Ilość"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.label}>Status</Text>
      <Picker
        selectedValue={status}
        onValueChange={setStatus}
        style={styles.input}
      >
        <Picker.Item label="Wybierz status..." value="" />
        <Picker.Item label="Dostępny" value="dostępny" />
        <Picker.Item label="Niedostępny" value="niedostępny" />
      </Picker>

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
        <Button title="DODAJ KWIAT" onPress={handleAddFlower} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 15,
    padding: 10,
  },
  label: {
    marginTop: 10,
    fontWeight: 'bold',
  },
});
