import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@/utils/api';

export default function FlowerFormScreen() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [status, setStatus] = useState('');

  const handleAddFlower = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Błąd', 'Musisz być zalogowany, aby dodać kwiat.');
        return;
      }

      const payload = {
        name,
        description,
        category,
        quantity: parseInt(quantity), // upewniamy się, że jest liczbą
        status,
      };

      await api.post('/flowers', payload, {
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
    } catch (error) {
      console.error(error);
      Alert.alert('Błąd', 'Nie udało się dodać kwiata. Upewnij się, że wszystkie dane są poprawne.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Nazwa" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Opis" value={description} onChangeText={setDescription} style={styles.input} />
      <TextInput placeholder="Kategoria" value={category} onChangeText={setCategory} style={styles.input} />
      <TextInput placeholder="Ilość" value={quantity} onChangeText={setQuantity} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder="Status" value={status} onChangeText={setStatus} style={styles.input} />
      <Button title="DODAJ KWIAT" onPress={handleAddFlower} />
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
});
