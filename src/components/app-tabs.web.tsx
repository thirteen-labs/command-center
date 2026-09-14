import {
  Tabs,
  TabList,
  TabTrigger,
  TabSlot,
  TabTriggerSlotProps,
} from 'expo-router/ui';
import { Pressable, View, StyleSheet } from 'react-native';

import { Icon } from './icon';
import { useThemeColor } from '@/context/theme-context';

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ height: '100%' }} />
      <TabList asChild>
        <CustomTabList />
      </TabList>
    </Tabs>
  );
}

function CustomTabList(props: { children?: React.ReactNode }) {
  const colors = useThemeColor();

  return (
    <View {...props} style={styles.tabListContainer}>
      <TabTrigger name="index" href="/" asChild accessibilityLabel="Search">
        <TabButton>
          <Icon name="magnifyingglass" size={24} color={colors.text} />
        </TabButton>
      </TabTrigger>
      <TabTrigger name="explore" href="/explore" asChild accessibilityLabel="Commands">
        <TabButton>
          <Icon name="command" size={24} color={colors.text} />
        </TabButton>
      </TabTrigger>
      <TabTrigger name="favorites" href="/favorites" asChild accessibilityLabel="Favorites">
        <TabButton>
          <Icon name="star.fill" size={24} color={colors.text} />
        </TabButton>
      </TabTrigger>
      <TabTrigger name="settings" href="/settings" asChild accessibilityLabel="Settings">
        <TabButton>
          <Icon name="gear" size={24} color={colors.text} />
        </TabButton>
      </TabTrigger>
    </View>
  );
}

function TabButton({ children, isFocused, ...props }: TabTriggerSlotProps) {
  return (
    <Pressable
      {...props}
      accessibilityRole="tab"
      style={[
        styles.pressed,
        isFocused && styles.tabButtonPressed,
      ]}>
      <View
        style={[
          styles.tabButtonView,
          isFocused && styles.tabButtonViewFocused,
        ]}>
        {children}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tabListContainer: {
    position: 'absolute',
    alignSelf: 'center',
    left: '1%',
    width: '98%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 8,
    backdropFilter: 'blur(20px)',
  },
  tabButtonView: {
    width: 56,
    height: 56,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabButtonViewFocused: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  pressed: {
    opacity: 0.7,
    borderRadius: 999,
    overflow: 'hidden',
  },
  tabButtonPressed: {
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 2 },
    elevation: 10,
  },
});
