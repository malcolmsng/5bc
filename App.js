import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { AuthProvider } from './contexts/AuthContext'
import AppNavigation from './AppNavigation'


export default function App() {
  return (
    <AuthProvider>
      <AppNavigation />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
