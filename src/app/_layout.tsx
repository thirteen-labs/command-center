import { SQLiteProvider } from 'expo-sqlite';
import { Stack, DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { Component, ReactNode } from 'react';
import { useColorScheme } from 'react-native';

import { initializeDatabase } from '@/data/database';
import { ThemeProvider as AppThemeProvider } from '@/context/theme-context';

SplashScreen.preventAutoHideAsync();

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

function RootLayoutContent() {
  return (
    <AppThemeProvider>
      <SQLiteProvider databaseName="cheatsheet.db" onInit={initializeDatabase}>
        <ErrorBoundary>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="commands/[id]"
              options={{ title: 'Command', presentation: 'card' }}
            />
          </Stack>
        </ErrorBoundary>
      </SQLiteProvider>
    </AppThemeProvider>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootLayoutContent />
    </ThemeProvider>
  );
}
