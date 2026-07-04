import { useCallback, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CommandCard } from '@/components/command-card';
import { SearchBar } from '@/components/search-bar';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useFavoriteCommands, type CommandRow } from '@/hooks/use-commands';

export default function FavoritesScreen() {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');
  const favorites = useFavoriteCommands(search);

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
            paddingTop: insets.top + Spacing.three,
            paddingBottom,
          },
        ]}
        data={favorites}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        ListHeaderComponent={
          <ThemedView style={styles.header}>
            <ThemedText type="title" style={styles.title}>
              Favorites
            </ThemedText>
            <ThemedText themeColor="textSecondary">
              {favorites.length} saved command{favorites.length !== 1 ? 's' : ''}
            </ThemedText>
            <SearchBar
              value={search}
              onChangeText={setSearch}
              placeholder="Search favorites..."
            />
          </ThemedView>
        }
        ListEmptyComponent={
          <ThemedView style={styles.empty}>
            <ThemedText themeColor="textSecondary" style={styles.emptyText}>
              {search
                ? 'No favorites match your search'
                : 'Tap the star icon on any command to save it here'}
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
  title: {
    fontSize: 32,
    lineHeight: 36,
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
