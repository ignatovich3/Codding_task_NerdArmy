import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.title}>🌸 Witaj w aplikacji Kwiaty!</Text>

        <TouchableOpacity style={styles.button} onPress={() => router.push('/login')}>
          <Text style={styles.buttonText}>Zaloguj się</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.push('/register')}>
          <Text style={styles.buttonText}>Zarejestruj się</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.push('/flowers')}>
          <Text style={styles.buttonText}>Zobacz listę kwiatów</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.push('/FlowerFormScreen')}>
          <Text style={styles.buttonText}>Dodaj kwiat</Text>
        </TouchableOpacity>
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
  button: {
    backgroundColor: '#007bff', // NIEBIESKI
    paddingVertical: 14,
    borderRadius: 6,
    marginVertical: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
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

