import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@/utils/api';

export default function EditFlowerScreen() {
  const { id } = useLocalSearchParams(); // ← pobiera ID kwiata z URL
  const router = useRouter();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchFlower = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await api.get(`/flowers/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const flower = response.data;
        setName(flower.name);
        setDescription(flower.description);
        setCategory(flower.category);
        setQuantity(flower.quantity.toString());
        setStatus(flower.status);
      } catch (error) {
        console.error('Błąd ładowania kwiatu:', error);
        Alert.alert('Błąd', 'Nie udało się załadować danych kwiatu.');
      }
    };

    fetchFlower();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      await api.put(`/flowers/${id}`, {
        name,
        description,
        category,
        quantity: parseInt(quantity),
        status,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Alert.alert('Sukces', 'Zmieniono dane kwiatu!');
      router.back(); // wraca do poprzedniego ekranu (lista)
    } catch (error) {
      console.error('Błąd zapisu:', error);
      Alert.alert('Błąd', 'Nie udało się zapisać zmian.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edytuj Kwiat</Text>
      <TextInput placeholder="Nazwa" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Opis" value={description} onChangeText={setDescription} style={styles.input} />
      <TextInput placeholder="Kategoria" value={category} onChangeText={setCategory} style={styles.input} />
      <TextInput placeholder="Ilość" value={quantity} onChangeText={setQuantity} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder="Status" value={status} onChangeText={setStatus} style={styles.input} />
      <Button title="Zapisz zmiany" onPress={handleUpdate} />
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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
