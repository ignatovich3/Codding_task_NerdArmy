// app/(tabs)/index.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌸 Witaj w aplikacji Kwiaty!</Text>
      <Button title="Zaloguj się" onPress={() => router.push('/login')} />
      <Button title="Zarejestruj się" onPress={() => router.push('/register')} />
      <Button title="Zobacz listę kwiatów" onPress={() => router.push('/flowers')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
});
