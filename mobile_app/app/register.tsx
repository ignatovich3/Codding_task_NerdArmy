import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import api from '@/utils/api';

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!username || !email || !password) {
      Alert.alert('Błąd', 'Wszystkie pola są wymagane.');
      return;
    }

    try {
      const response = await api.post('/register', {
        username: username.trim(),
        email: email.trim(),
        password: password.trim(),
      });

      if (response.status === 200) {
        Alert.alert('Sukces', 'Rejestracja zakończona pomyślnie!');
        // Możesz dodać: navigation.navigate('Login');
      } else {
        Alert.alert('Błąd', 'Coś poszło nie tak');
      }
    } catch (error: any) {
      console.error('Błąd rejestracji:', error.response?.data || error.message);
      Alert.alert('Błąd rejestracji', 'Użytkownik już istnieje lub wystąpił błąd serwera.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Hasło"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <Button title="ZAREJESTRUJ SIĘ" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 12,
    borderRadius: 6,
  },
});
