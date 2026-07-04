import { SymbolView } from 'expo-symbols';
import { Pressable, ScrollView, StyleSheet } from 'react-native';

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

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
      {platforms.map((p) => {
        const isActive = selected === p.id;
        return (
          <Pressable
            key={p.label}
            style={[
              styles.chip,
              { backgroundColor: isActive ? theme.text : theme.backgroundElement },
            ]}
            onPress={() => onSelect(p.id === selected ? null : p.id)}
          >
            <SymbolView name={p.icon as any} size={12} tintColor={isActive ? theme.background : theme.textSecondary} />
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
  },
});
