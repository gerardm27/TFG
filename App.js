import React, { Suspense } from 'react';
import { Text } from 'react-native';
import { AuthProvider } from './src/context/authContext';
import { Main } from './src/Main';
import "./i18n.config";
import { LogBox } from 'react-native';
import { YellowBox } from "react-native"

export default function App() {
  //LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  //LogBox.ignoreAllLogs();//Ignore all log notifications
  return (
    <AuthProvider>
      <Suspense fallback={<Text>Loading...</Text>}>
        <Main></Main>
      </Suspense>
    </AuthProvider>
  )  
}