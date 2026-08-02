/**
 * Theme colors for the app. Includes light, dark, and custom themes:
 * amoled, sepia, paper, midnight, ocean, glass, forest.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#000000',
    background: '#ffffff',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#60646C',
  },
  dark: {
    text: '#ffffff',
    background: '#000000',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    textSecondary: '#B0B4BA',
  },
  amoled: {
    text: '#ffffff',
    background: '#000000',
    backgroundElement: '#0a0a0a',
    backgroundSelected: '#1a1a1a',
    textSecondary: '#808080',
  },
  sepia: {
    text: '#3B2E1E',
    background: '#FDF5E6',
    backgroundElement: '#F5E6D3',
    backgroundSelected: '#E8D5B7',
    textSecondary: '#8B7355',
  },
  paper: {
    text: '#1a1a1a',
    background: '#FAFAF5',
    backgroundElement: '#F0EDE4',
    backgroundSelected: '#E0D8C8',
    textSecondary: '#6B6B6B',
  },
  midnight: {
    text: '#E0E0E0',
    background: '#0D1117',
    backgroundElement: '#161B22',
    backgroundSelected: '#21262D',
    textSecondary: '#8B949E',
  },
  ocean: {
    text: '#E0F0FF',
    background: '#0A1628',
    backgroundElement: '#0F2035',
    backgroundSelected: '#1A3A5C',
    textSecondary: '#5B8FA8',
  },
  glass: {
    text: '#ffffff',
    background: 'rgba(0,0,0,0.0)',
    backgroundElement: 'rgba(255,255,255,0.08)',
    backgroundSelected: 'rgba(255,255,255,0.15)',
    textSecondary: 'rgba(255,255,255,0.6)',
  },
  forest: {
    text: '#E8F0E8',
    background: '#0F1A0F',
    backgroundElement: '#1A2E1A',
    backgroundSelected: '#243824',
    textSecondary: '#6B8F6B',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 64 }) ?? 0;
export const MaxContentWidth = 800;
