import { SQLiteProvider } from 'expo-sqlite';
import { Stack, DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';

import { initializeDatabase } from '@/data/database';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SQLiteProvider databaseName="cheatsheet.db" onInit={initializeDatabase}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="commands/[id]"
            options={{ title: 'Command', presentation: 'card' }}
          />
        </Stack>
      </SQLiteProvider>
    </ThemeProvider>
  );
}
