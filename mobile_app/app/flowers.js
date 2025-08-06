import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@/utils/api';

export default function FlowerListScreen() {
  const [flowers, setFlowers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFlowers = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Błąd', 'Musisz być zalogowany, aby zobaczyć listę kwiatów.');
        return;
      }

      const response = await api.get('/flowers', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFlowers(response.data);
    } catch (error) {
      console.error('Błąd pobierania kwiatów:', error);
      Alert.alert('Błąd', 'Nie udało się pobrać danych z serwera.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlowers();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Ładowanie...</Text>
      ) : flowers.length === 0 ? (
        <Text>Brak kwiatów do wyświetlenia.</Text>
      ) : (
        <FlatList
          data={flowers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.name}>{item.name}</Text>
              <Text>{item.description}</Text>
              <Text>Kategoria: {item.category}</Text>
              <Text>Ilość: {item.quantity}</Text>
              <Text>Status: {item.status}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
