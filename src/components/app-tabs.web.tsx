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
      <TabTrigger name="index" href="/" asChild>
        <TabButton>
          <Icon name="magnifyingglass" size={24} color={colors.text} />
        </TabButton>
      </TabTrigger>
      <TabTrigger name="explore" href="/explore" asChild>
        <TabButton>
          <Icon name="command" size={24} color={colors.text} />
        </TabButton>
      </TabTrigger>
      <TabTrigger name="favorites" href="/favorites" asChild>
        <TabButton>
          <Icon name="star.fill" size={24} color={colors.text} />
        </TabButton>
      </TabTrigger>
    </View>
  );
}

function TabButton({ children, isFocused, ...props }: TabTriggerSlotProps) {
  return (
    <Pressable
      {...props}
      style={({ pressed }) => pressed && styles.pressed}>
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
    flexDirection: 'row',
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
  },
});
