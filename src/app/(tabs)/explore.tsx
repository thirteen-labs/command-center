import { useCallback } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CategoryCard } from '@/components/category-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useCategories, type CategoryRow } from '@/hooks/use-commands';

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();
  const categories = useCategories();

  const renderItem = useCallback(
    ({ item }: { item: CategoryRow }) => <CategoryCard category={item} />,
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
        data={categories}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        renderItem={renderItem}
        columnWrapperStyle={styles.row}
        ListHeaderComponent={
          <ThemedView style={styles.header}>
            <ThemedText type="title" style={styles.title}>
              Categories
            </ThemedText>
            <ThemedText themeColor="textSecondary">
              Browse commands by category
            </ThemedText>
          </ThemedView>
        }
        ListEmptyComponent={
          <ThemedView style={styles.empty}>
            <ThemedText themeColor="textSecondary">Loading categories...</ThemedText>
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
    gap: Spacing.one,
    paddingBottom: Spacing.three,
  },
  title: {
    fontSize: 32,
    lineHeight: 36,
  },
  row: {
    gap: Spacing.two,
  },
  separator: {
    height: Spacing.two,
  },
  empty: {
    paddingVertical: Spacing.six,
    alignItems: 'center',
  },
});
