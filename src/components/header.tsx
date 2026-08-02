import { Pressable, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedText } from './themed-text';
import { Icon } from './icon';
import { Spacing } from '@/constants/theme';

export function Header() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ThemedText type="subtitle" style={styles.title}>
        Command Center
      </ThemedText>
      <Pressable onPress={() => router.push('/settings' as any)} style={styles.settingsButton}>
        <Icon name="setting" size={22} color="currentColor" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.two,
  },
  title: {
    fontSize: 20,
    lineHeight: 24,
  },
  settingsButton: {
    padding: Spacing.one,
  },
});