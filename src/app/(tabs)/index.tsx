import { useLocalSearchParams } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CommandCard } from '@/components/command-card';
import { PlatformFilter } from '@/components/platform-filter';
import { SearchBar } from '@/components/search-bar';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useCommands, type CommandRow } from '@/hooks/use-commands';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ category?: string }>();
  const [search, setSearch] = useState('');
  const [platformId, setPlatformId] = useState<number | null>(null);

  const categoryId = useMemo(
    () => (params.category ? Number(params.category) : null),
    [params.category]
  );

  const { results } = useCommands({ search, platformId, categoryId });

  const renderItem = useCallback(
    ({ item }: { item: CommandRow }) => <CommandCard command={item} />,
    []
  );

  const paddingBottom = insets.bottom + BottomTabInset + Spacing.three;

  return (
    <ThemedView style={styles.container}>
      <FlatList
        style={styles.list}
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: Spacing.three,
            paddingBottom,
          },
        ]}
        data={results}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        ListHeaderComponent={
          <ThemedView style={styles.header}>
            <ThemedText themeColor="textSecondary" style={styles.subtitle}>
              {categoryId
                ? `Filtered by category`
                : `${results.length} developer commands`}
            </ThemedText>
            <SearchBar value={search} onChangeText={setSearch} />
            <PlatformFilter selected={platformId} onSelect={setPlatformId} />
          </ThemedView>
        }
        ListEmptyComponent={
          <ThemedView style={styles.empty}>
            <ThemedText themeColor="textSecondary" style={styles.emptyText}>
              {search
                ? 'No commands match your search'
                : 'Select a platform or category to browse'}
            </ThemedText>
          </ThemedView>
        }
        ItemSeparatorComponent={() => <ThemedView style={styles.separator} />}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  content: {
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: Spacing.three,
  },
  header: {
    gap: Spacing.three,
    paddingBottom: Spacing.three,
  },
  subtitle: {
    marginTop: -Spacing.two,
  },
  separator: {
    height: Spacing.two,
  },
  empty: {
    paddingVertical: Spacing.six,
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
  },
});
