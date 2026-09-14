import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet } from 'react-native';

import { Icon } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const platforms = [
  { id: null, label: 'All', icon: 'line.3.horizontal.decrease' },
  { id: 1, label: 'Linux', icon: 'terminal' },
  { id: 2, label: 'Windows', icon: 'desktopcomputer' },
  { id: 3, label: 'macOS', icon: 'apple.logo' },
  { id: 4, label: 'Termux', icon: 'iphone.gen3' },
  { id: 5, label: 'Cross', icon: 'globe' },
] as const;

interface PlatformFilterProps {
  selected: number | null;
  onSelect: (id: number | null) => void;
}

export function PlatformFilter({ selected, onSelect }: PlatformFilterProps) {
  const theme = useTheme();
  const [pressedId, setPressedId] = useState<number | null>(null);

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
      {platforms.map((p) => {
        const isActive = selected === p.id;
        const isPressed = pressedId === p.id;
        return (
          <Pressable
            key={p.label}
            style={[
              styles.chip,
              { backgroundColor: isActive ? theme.text : theme.backgroundElement },
              isPressed && styles.chipPressed,
            ]}
            onPress={() => {
              setPressedId(p.id);
              setTimeout(() => setPressedId(null), 100);
              onSelect(p.id === selected ? null : p.id);
            }}
            accessibilityRole="button"
            accessibilityLabel={`Filter by ${p.label}`}
            accessibilityState={{ selected: isActive }}>
            <Icon name={p.icon} size={12} color={isActive ? theme.background : theme.textSecondary} />
            <ThemedText
              type="small"
              themeColor={isActive ? 'background' : 'textSecondary'}
            >
              {p.label}
            </ThemedText>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 0,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.half,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one + 2,
    borderRadius: 20,
    marginRight: Spacing.two,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  chipPressed: {
    opacity: 0.7,
  },
});
