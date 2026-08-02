import { FlatList, StyleSheet, Pressable, View } from 'react-native';
import React from 'react';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Icon } from '@/components/icon';
import { Colors, Spacing } from '@/constants/theme';
import { useThemeColor, useThemeName, useSetTheme } from '@/context/theme-context';

const themes = [
  { name: 'light', label: 'Light', colors: Colors.light },
  { name: 'dark', label: 'Dark', colors: Colors.dark },
  { name: 'amoled', label: 'AMOLED', colors: Colors.amoled },
  { name: 'sepia', label: 'Sepia', colors: Colors.sepia },
  { name: 'paper', label: 'Paper', colors: Colors.paper },
  { name: 'midnight', label: 'Midnight', colors: Colors.midnight },
  { name: 'ocean', label: 'Ocean', colors: Colors.ocean },
  { name: 'glass', label: 'Glass', colors: Colors.glass },
  { name: 'forest', label: 'Forest', colors: Colors.forest },
] as const;

type ThemeEntry = typeof themes[number];

const fontOptions = [
  { name: 'sans', label: 'Sans' },
  { name: 'serif', label: 'Serif' },
  { name: 'rounded', label: 'Rounded' },
  { name: 'mono', label: 'Mono' },
];

export default function SettingsScreen() {
  const colors = useThemeColor();
  const currentTheme = useThemeName();
  const setTheme = useSetTheme();
  const [selectedFont, setSelectedFont] = React.useState('sans');

  const renderThemeItem = ({ item }: { item: ThemeEntry }) => {
    const isActive = currentTheme === item.name;
    return (
      <Pressable
        style={[styles.themeItem, isActive && styles.themeItemActive]}
        onPress={() => setTheme(item.name)}
      >
        <View style={[styles.colorSquare, { backgroundColor: item.colors.background }]}>
          <View style={[styles.colorInner, { backgroundColor: item.colors.backgroundElement }]}>
            <View style={[styles.colorDot, { backgroundColor: item.colors.text }]} />
          </View>
        </View>
        <ThemedText
          type="small"
          themeColor={isActive ? 'text' : 'textSecondary'}
          style={styles.themeLabel}
        >
          {item.label}
        </ThemedText>
        {isActive && <Icon name="checkmark.circle.fill" size={16} color={colors.text} />}
      </Pressable>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <FlatList
        contentContainerStyle={styles.content}
        data={themes}
        keyExtractor={(item) => item.name as string}
        renderItem={renderThemeItem}
        ListHeaderComponent={
          <>
            <ThemedText type="title" style={styles.screenTitle}>
              Settings
            </ThemedText>
            <ThemedText type="smallBold" style={styles.sectionTitle}>
              Theme
            </ThemedText>
          </>
        }
        ItemSeparatorComponent={() => <View style={{ height: Spacing.two }} />}
        ListFooterComponent={
          <>
            <View style={{ height: Spacing.three }} />
            <ThemedText type="smallBold" style={styles.sectionTitle}>
              Font
            </ThemedText>
            <View style={{ height: Spacing.two }} />
            {fontOptions.map((item) => {
              const isActive = selectedFont === item.name;
              return (
                <Pressable
                  key={item.name}
                  style={[styles.fontItem, isActive && styles.fontItemActive]}
                  onPress={() => setSelectedFont(item.name)}
                >
                  <ThemedText
                    type="small"
                    themeColor={isActive ? 'text' : 'textSecondary'}
                    style={[styles.fontLabel, isActive && { fontFamily: item.name }]}
                  >
                    {item.label}
                  </ThemedText>
                  {isActive && <Icon name="checkmark.circle.fill" size={16} color={colors.text} />}
                </Pressable>
              );
            })}
            <View style={{ height: Spacing.six }} />
          </>
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.two,
    paddingBottom: Spacing.six,
  },
  screenTitle: {
    marginBottom: Spacing.three,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: Spacing.two,
  },
  themeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.two,
    gap: Spacing.two,
  },
  themeItemActive: {
    opacity: 1,
  },
  colorSquare: {
    width: 36,
    height: 36,
    borderRadius: 8,
    padding: 3,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorInner: {
    flex: 1,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  themeLabel: {
    flex: 1,
  },
  fontItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.two,
    gap: Spacing.two,
  },
  fontItemActive: {
    opacity: 1,
  },
  fontLabel: {
    flex: 1,
  },
});