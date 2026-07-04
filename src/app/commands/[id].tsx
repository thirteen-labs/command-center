import { Stack, useLocalSearchParams } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useCommandById, useToggleFavorite } from '@/hooks/use-commands';
import { useTheme } from '@/hooks/use-theme';

export default function CommandDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const command = useCommandById(Number(id));
  const toggleFavorite = useToggleFavorite();

  if (!command) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Command not found</ThemedText>
      </ThemedView>
    );
  }

  const handleFavorite = () => {
    toggleFavorite(command.id, command.is_favorite === 1);
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          title: command.command,
          headerRight: () => (
            <Pressable onPress={handleFavorite} style={styles.favButton}>
              <SymbolView
                name={(command.is_favorite ? 'star.fill' : 'star') as any}
                size={20}
                tintColor={command.is_favorite ? '#FFD700' : theme.textSecondary}
              />
            </Pressable>
          ),
        }}
      />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: Spacing.three,
            paddingBottom: insets.bottom + BottomTabInset + Spacing.three,
          },
        ]}
      >
        <ThemedView type="backgroundElement" style={styles.commandBlock}>
          <ThemedText type="code" style={styles.commandText}>
            {command.command}
          </ThemedText>
          <Pressable
            style={[styles.copyButton, { backgroundColor: theme.background }]}
          >
            <SymbolView name={'doc.on.doc' as any} size={14} tintColor={theme.text} />
          </Pressable>
        </ThemedView>

        <ThemedText style={styles.description}>{command.description}</ThemedText>

        <View style={styles.tags}>
          <ThemedView type="backgroundElement" style={styles.tag}>
            <SymbolView name={command.category_icon as any} size={12} tintColor={theme.textSecondary} />
            <ThemedText type="small" themeColor="textSecondary">
              {command.category_name}
            </ThemedText>
          </ThemedView>
          <ThemedView type="backgroundElement" style={styles.tag}>
            <SymbolView name={command.platform_icon as any} size={12} tintColor={theme.textSecondary} />
            <ThemedText type="small" themeColor="textSecondary">
              {command.platform_name}
            </ThemedText>
          </ThemedView>
        </View>

        {command.example && (
          <ThemedView type="backgroundElement" style={styles.section}>
            <ThemedText type="smallBold">Example</ThemedText>
            <ThemedView style={styles.exampleBlock}>
              <ThemedText type="code">{command.example}</ThemedText>
            </ThemedView>
          </ThemedView>
        )}

        {command.notes && (
          <ThemedView type="backgroundElement" style={styles.section}>
            <ThemedText type="smallBold">Notes</ThemedText>
            <ThemedText type="small">{command.notes}</ThemedText>
          </ThemedView>
        )}

        {command.tags && (
          <ThemedView style={styles.section}>
            <ThemedText type="smallBold">Tags</ThemedText>
            <View style={styles.tagRow}>
              {command.tags.split(',').map((tag) => (
                <ThemedView key={tag} type="backgroundElement" style={styles.miniTag}>
                  <ThemedText type="small" themeColor="textSecondary">
                    {tag.trim()}
                  </ThemedText>
                </ThemedView>
              ))}
            </View>
          </ThemedView>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: Spacing.three,
    gap: Spacing.three,
  },
  commandBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: Spacing.three,
    padding: Spacing.three,
  },
  commandText: {
    fontSize: 18,
    flex: 1,
  },
  copyButton: {
    padding: Spacing.two,
    borderRadius: Spacing.two,
    marginLeft: Spacing.two,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  tags: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.half,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half + 1,
    borderRadius: Spacing.three,
  },
  section: {
    gap: Spacing.two,
    borderRadius: Spacing.three,
    padding: Spacing.three,
  },
  exampleBlock: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    padding: Spacing.three,
    borderRadius: Spacing.two,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.one,
  },
  miniTag: {
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
    borderRadius: Spacing.three,
  },
  favButton: {
    padding: Spacing.two,
  },
});
