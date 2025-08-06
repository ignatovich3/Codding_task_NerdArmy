import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import api from '../utils/api';

export default function RegisterScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await api.post('/register', { username, password });
      Alert.alert('Sukces', 'Zarejestrowano pomyślnie');
      router.replace('/login');
    } catch (error) {
      Alert.alert('Błąd rejestracji', 'Użytkownik już istnieje lub błąd serwera');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rejestracja</Text>
      <TextInput
        placeholder="Nazwa użytkownika"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Hasło"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <Button title="Zarejestruj się" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});
