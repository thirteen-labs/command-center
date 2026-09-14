import { Link } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Icon } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import type { CommandRow } from '@/hooks/use-commands';
import { useToggleFavorite } from '@/hooks/use-commands';
import { useTheme } from '@/hooks/use-theme';

interface CommandCardProps {
  command: CommandRow;
}

export function CommandCard({ command }: CommandCardProps) {
  const theme = useTheme();
  const toggleFavorite = useToggleFavorite();
  const [favorite, setFavorite] = useState(command.is_favorite === 1);

  const handleToggleFavorite = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    toggleFavorite(command.id, favorite);
    setFavorite((prev) => !prev);
  };

  return (
    <Link href={`/commands/${command.id}`} asChild>
      <Pressable
        style={({ pressed }) => [
          styles.pressed,
          pressed && styles.pressedActive,
        ]}>
        <ThemedView type="backgroundElement" style={styles.card}>
          <View style={styles.topRow}>
            <ThemedText type="code" style={styles.command}>
              {command.command}
            </ThemedText>
            <Pressable
              onPress={handleToggleFavorite}
              hitSlop={8}
              style={[
                styles.favButton,
                favorite && styles.favButtonActive,
              ]}
              accessibilityRole="button"
              accessibilityLabel={favorite ? 'Remove from favorites' : 'Add to favorites'}>
              <Icon
                name="star.fill"
                size={20}
                color={favorite ? '#FFD700' : theme.textSecondary}
                variant={favorite ? 'Bold' : 'Linear'}
              />
            </Pressable>
          </View>
          <ThemedText
            type="small"
            themeColor="textSecondary"
            numberOfLines={2}
            style={styles.desc}
          >
            {command.description}
          </ThemedText>
          <View style={styles.meta}>
            <View style={styles.metaItem}>
              <Icon name={command.category_icon ?? ''} size={10} color={theme.textSecondary} />
              <ThemedText type="small" themeColor="textSecondary">
                {command.category_name}
              </ThemedText>
            </View>
            <View style={styles.metaItem}>
              <Icon name={command.platform_icon ?? ''} size={10} color={theme.textSecondary} />
              <ThemedText type="small" themeColor="textSecondary">
                {command.platform_name}
              </ThemedText>
            </View>
          </View>
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
    gap: Spacing.one,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  command: {
    fontSize: 15,
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  favButton: {
    padding: Spacing.half,
  },
  favButtonActive: {
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
    borderRadius: Spacing.half,
  },
  desc: {
    lineHeight: 18,
  },
  meta: {
    flexDirection: 'row',
    gap: Spacing.three,
    marginTop: Spacing.half,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.half,
  },
});
