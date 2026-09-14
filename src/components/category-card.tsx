import { Link } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

import { Icon } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import type { CategoryRow } from '@/hooks/use-commands';
import { useTheme } from '@/hooks/use-theme';

interface CategoryCardProps {
  category: CategoryRow;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const theme = useTheme();

  return (
    <Link href={`/?category=${category.id}`} asChild>
      <Pressable
        style={({ pressed }) => [
          styles.pressed,
          pressed && styles.pressedActive,
        ]}>
        <ThemedView type="backgroundElement" style={styles.card}>
          <Icon name={category.icon} size={24} color={theme.text} />
          <ThemedText type="small" style={styles.name}>
            {category.name}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {category.command_count} commands
          </ThemedText>
        </ThemedView>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  pressed: {
    borderRadius: Spacing.three,
    marginBottom: Spacing.one,
  },
  pressedActive: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  card: {
    borderRadius: Spacing.three,
    padding: Spacing.three,
    gap: Spacing.two,
    alignItems: 'center',
    flex: 1,
    minWidth: 140,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  name: {
    textAlign: 'center',
    fontWeight: '600',
  },
});
