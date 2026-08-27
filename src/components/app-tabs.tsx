import {
  Tabs,
  TabList,
  TabTrigger,
  TabSlot,
  TabTriggerSlotProps,
} from 'expo-router/ui';
import { Pressable, View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon } from './icon';
import { useThemeColor } from '@/context/theme-context';
import { Spacing } from '@/constants/theme';

export default function AppTabs() {
  const colors = useThemeColor();

  return (
    <Tabs>
      <TabSlot style={{ height: '100%' }} />
      <TabList asChild>
        <CustomTabList>
          <TabTrigger name="index" href="/" asChild>
            <TabButton colors={colors}>
              <Icon name="magnifyingglass" size={24} color={colors.text} />
            </TabButton>
          </TabTrigger>
          <TabTrigger name="explore" href="/explore" asChild>
            <TabButton colors={colors}>
              <Icon name="command" size={24} color={colors.text} />
            </TabButton>
          </TabTrigger>
          <TabTrigger name="favorites" href="/favorites" asChild>
            <TabButton colors={colors}>
              <Icon name="star.fill" size={24} color={colors.text} />
            </TabButton>
          </TabTrigger>
        </CustomTabList>
      </TabList>
    </Tabs>
  );
}

function CustomTabList(props: { children?: React.ReactNode }) {
  const insets = useSafeAreaInsets();
  const colors = useThemeColor();

  return (
    <View
      {...props}
      style={[
        styles.tabListContainer,
        { bottom: insets.bottom + Spacing.two },
      ]}>
      {props.children}
      <TabTrigger name="settings" href="/settings" asChild>
        <TabButton colors={colors}>
          <Icon name="gear" size={24} color={colors.text} />
        </TabButton>
      </TabTrigger>
    </View>
  );
}

function TabButton({
  children,
  isFocused,
  colors,
  ...props
}: TabTriggerSlotProps & { colors: { text: string; backgroundSelected: string } }) {
  return (
    <Pressable
      {...props}
      style={({ pressed }) => pressed && styles.pressed}>
      <View
        style={[
          styles.tabButtonView,
          isFocused && { backgroundColor: colors.backgroundSelected },
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
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
  },
  tabButtonView: {
    width: 56,
    height: 56,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
});
