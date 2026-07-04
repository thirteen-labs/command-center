import { Link } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import type { CommandRow } from '@/hooks/use-commands';
import { useTheme } from '@/hooks/use-theme';

interface CommandCardProps {
  command: CommandRow;
}

export function CommandCard({ command }: CommandCardProps) {
  const theme = useTheme();

  return (
    <Link href={`/commands/${command.id}`} asChild>
      <Pressable style={({ pressed }) => pressed && styles.pressed}>
        <ThemedView type="backgroundElement" style={styles.card}>
          <ThemedText type="code" style={styles.command}>
            {command.command}
          </ThemedText>
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
              <SymbolView name={command.category_icon as any} size={10} tintColor={theme.textSecondary} />
              <ThemedText type="small" themeColor="textSecondary">
                {command.category_name}
              </ThemedText>
            </View>
            <View style={styles.metaItem}>
              <SymbolView name={command.platform_icon as any} size={10} tintColor={theme.textSecondary} />
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
    opacity: 0.7,
  },
  card: {
    borderRadius: Spacing.three,
    padding: Spacing.three,
    gap: Spacing.one,
  },
  command: {
    fontSize: 15,
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
