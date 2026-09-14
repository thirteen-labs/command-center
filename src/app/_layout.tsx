import { SQLiteProvider } from 'expo-sqlite';
import { Stack, DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { Component, ReactNode, useEffect } from 'react';
import { StyleSheet, Text, View, useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { initializeDatabase } from '@/data/database';
import { ThemeProvider as AppThemeProvider } from '@/context/theme-context';

SplashScreen.preventAutoHideAsync();

interface ErrorBoundaryState {
  hasError: boolean;
  message?: string;
}

class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, message: error?.message ?? String(error) };
  }

  componentDidCatch(error: Error, info: { componentStack?: string }) {
    console.error('Command Center crashed:', error, info?.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Something went wrong</Text>
          <Text style={styles.errorMessage}>{this.state.message}</Text>
        </View>
      );
    }
    return this.props.children;
  }
}

function RootLayoutContent() {
  return (
    <AppThemeProvider>
      <SQLiteProvider databaseName="cheatsheet.db" onInit={initializeDatabase}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false, statusBarStyle: 'auto' }} />
          <Stack.Screen
            name="commands/[id]"
            options={{ title: 'Command', presentation: 'card', statusBarStyle: 'auto' }}
          />
        </Stack>
      </SQLiteProvider>
    </AppThemeProvider>
  );
}

// Fallback: hide the native splash as soon as the root mounts, regardless of
// what happens further down the tree.
function HideNativeSplash() {
  useEffect(() => {
    SplashScreen.hideAsync().catch(() => {});
  }, []);
  return null;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <HideNativeSplash />
      <ErrorBoundary>
        <RootLayoutContent />
      </ErrorBoundary>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 14,
    opacity: 0.7,
    textAlign: 'center',
  },
});
