import React, { useState } from 'react';
import { StatusBar, StyleSheet, View, TouchableOpacity, Text } from 'react-native'; // Import TouchableOpacity
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackScreens } from '../../App';
import { WebView as NativeWebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';

export default function WebView({}: NativeStackScreenProps<StackScreens, 'App'>) {
  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSignOut = async () => {
    try {
      // Make a request to the logout endpoint
      const response = await fetch('http://127.0.0.1:50000/auth/logout', {
        method: 'POST',
      });

      if (response.ok) {
        // Clear local session data and navigate to the 'Login' screen
        navigation.navigate('Login' as never);
      } else {
        // Handle logout failure
        const responseData = await response.json();
        setErrorMessage(responseData.message || 'Failed to log out.');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      setErrorMessage('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <NativeWebView source={{ uri: process.env.EXPO_PUBLIC_WEBAPP_ROOT as string }} />
      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
      <StatusBar hidden />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    height: 50,
    width: '100%',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007AFF', // button color
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});
