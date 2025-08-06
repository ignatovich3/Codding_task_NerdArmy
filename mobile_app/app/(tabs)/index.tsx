import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.title}>🌸 Witaj w aplikacji Kwiaty!</Text>

        <Button title="Zaloguj się" onPress={() => router.push('/login')} />
        <Button title="Zarejestruj się" onPress={() => router.push('/register')} />
        <View style={styles.spacer} />
        <Button title="Zobacz listę kwiatów" onPress={() => router.push('/flowers')} />
        <Button title="Dodaj kwiat" onPress={() => router.push('/FlowerFormScreen')} />
      </View>

      <View style={styles.footerNote}>
        <Text style={styles.footerText}>
          🔒 Aby <Text style={styles.bold}>dodać</Text> lub <Text style={styles.bold}>edytować</Text> kwiaty, musisz być zalogowany!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  topSection: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: '700',
  },
  spacer: {
    height: 10,
  },
  footerNote: {
    backgroundColor: '#ffe4e1',
    padding: 15,
    borderRadius: 12,
    marginTop: 30,
  },
  footerText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#c0392b',
  },
  bold: {
    fontWeight: '700',
  },
});
