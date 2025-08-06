import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@/utils/api';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Błąd', 'Wprowadź nazwę użytkownika i hasło.');
      return;
    }

    try {
      const response = await api.post('/login', {
        username: username.trim(),
        password: password.trim(),
      });

      const { access_token } = response.data;
      await AsyncStorage.setItem('token', access_token);

      Alert.alert('Sukces', 'Zalogowano pomyślnie!');
      // Możesz przejść dalej, np. navigation.navigate('Home');
    } catch (error: any) {
      console.error('Błąd logowania:', error.response?.data || error.message);
      Alert.alert('Błąd logowania', 'Nieprawidłowe dane logowania lub błąd serwera.');
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
        placeholder="Hasło"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <Button title="ZALOGUJ SIĘ" onPress={handleLogin} />
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
