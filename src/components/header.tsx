import { Pressable, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from './themed-text';
import { Icon } from './icon';
import { Spacing } from '@/constants/theme';

export function Header() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + Spacing.three }]}>
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