import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@/utils/api';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { useFocusEffect } from '@react-navigation/native';

export default function FlowerListScreen() {
  const [flowers, setFlowers] = useState([]);
  const [allFlowers, setAllFlowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortDate, setSortDate] = useState('dateNewest');
  const [filterStatus, setFilterStatus] = useState('all');

  const router = useRouter();

  const fetchFlowers = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Błąd', 'Musisz być zalogowany, aby zobaczyć listę kwiatów.');
        return;
      }
      const response = await api.get('/flowers', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllFlowers(response.data);
      applySortAndFilter(response.data, sortDate, filterStatus);
    } catch (error) {
      console.error('Błąd pobierania kwiatów:', error);
      Alert.alert('Błąd', 'Nie udało się pobrać danych z serwera.');
    } finally {
      setLoading(false);
    }
  };

  const applySortAndFilter = (data, sortDateOption, statusFilter) => {
    let filtered = [...data];

    if (statusFilter !== 'all') {
      filtered = filtered.filter(
        (flower) => (flower.status || '').toLowerCase() === statusFilter
      );
    }

    switch (sortDateOption) {
      case 'dateNewest':
        filtered.sort(
          (a, b) => new Date(b.date_added) - new Date(a.date_added)
        );
        break;
      case 'dateOldest':
        filtered.sort(
          (a, b) => new Date(a.date_added) - new Date(b.date_added)
        );
        break;
    }
    setFlowers(filtered);
  };

  const handleSortDateChange = (value) => {
    setSortDate(value);
    applySortAndFilter(allFlowers, value, filterStatus);
  };

  const handleStatusFilterChange = (value) => {
    setFilterStatus(value);
    applySortAndFilter(allFlowers, sortDate, value);
  };

  const handleDelete = async (id) => {
    Alert.alert('Potwierdzenie', 'Czy na pewno chcesz usunąć ten kwiat?', [
      { text: 'Anuluj', style: 'cancel' },
      {
        text: 'Usuń',
        style: 'destructive',
        onPress: async () => {
          try {
            const token = await AsyncStorage.getItem('token');
            await api.delete(`/flowers/${id}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            Alert.alert('Usunięto', 'Kwiat został usunięty.');
            fetchFlowers();
          } catch (error) {
            console.error('Błąd usuwania:', error);
            Alert.alert('Błąd', 'Nie udało się usunąć kwiata.');
          }
        },
      },
    ]);
  };

  const handleEdit = (id) => {
    // ⬇️ ważne: przejście na /flowers/[id]
    router.push(`/screens/${id}`);
  };

  // refetch po powrocie na ekran
  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchFlowers();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sortuj według daty:</Text>
      <Picker
        selectedValue={sortDate}
        onValueChange={handleSortDateChange}
        style={styles.picker}
      >
        <Picker.Item label="Najnowsze" value="dateNewest" />
        <Picker.Item label="Najstarsze" value="dateOldest" />
      </Picker>

      <Text style={styles.heading}>Filtruj według statusu:</Text>
      <Picker
        selectedValue={filterStatus}
        onValueChange={handleStatusFilterChange}
        style={styles.picker}
      >
        <Picker.Item label="Wszystkie" value="all" />
        <Picker.Item label="Dostępny" value="dostępny" />
        <Picker.Item label="Niedostępny" value="niedostępny" />
      </Picker>

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
              {item.description ? <Text>{item.description}</Text> : null}
              <Text>Kategoria: {item.category}</Text>
              <Text>Ilość: {item.quantity}</Text>
              <Text>Status: {item.status}</Text>
              <Text>
                Data dodania:{' '}
                {item.date_added
                  ? new Date(item.date_added).toLocaleDateString()
                  : 'brak'}
              </Text>

              <View style={styles.buttonRow}>
                <Button title="Edytuj" onPress={() => handleEdit(item.id)} />
                <View style={{ width: 10 }} />
                <Button
                  title="Usuń"
                  color="red"
                  onPress={() => handleDelete(item.id)}
                />
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff', flex: 1 },
  heading: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  picker: { marginBottom: 16 },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  name: { fontWeight: 'bold', fontSize: 16 },
  buttonRow: { flexDirection: 'row', marginTop: 10 },
});
