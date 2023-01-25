import React from 'react';
import { Text } from 'react-native';
import { AuthProvider } from './src/context/authContext';
import { Main } from './src/Main';
import "./i18n.config";

export default function App() {
  return (
    <AuthProvider>
      <Main></Main>
    </AuthProvider>
  )  
}