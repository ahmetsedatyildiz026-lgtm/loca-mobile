// LOCA - Typography System (Light Luxury)
import { Platform } from 'react-native';
import { THEME_COLORS } from '../types';

// Font ailesi tanımları
export const FONT_FAMILIES = {
  regular: Platform.select({
    ios: 'SF Pro Display',
    android: 'Roboto',
    default: 'System'
  }),
  medium: Platform.select({
    ios: 'SF Pro Display Medium',
    android: 'Roboto Medium',
    default: 'System'
  }),
  semiBold: Platform.select({
    ios: 'SF Pro Display Semibold',
    android: 'Roboto Medium',
    default: 'System'
  }),
  bold: Platform.select({
    ios: 'SF Pro Display Bold',
    android: 'Roboto Bold',
    default: 'System'
  }),
} as const;

// Tipografi hiyerarşisi
export const TYPOGRAPHY = {
  // Başlıklar
  h1: {
    fontSize: 32,
    lineHeight: 40,
    fontFamily: FONT_FAMILIES.bold,
    color: THEME_COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: 28,
    lineHeight: 36,
    fontFamily: FONT_FAMILIES.bold,
    color: THEME_COLORS.textPrimary,
    letterSpacing: -0.4,
  },
  h3: {
    fontSize: 24,
    lineHeight: 32,
    fontFamily: FONT_FAMILIES.semiBold,
    color: THEME_COLORS.textPrimary,
    letterSpacing: -0.3,
  },
  h4: {
    fontSize: 20,
    lineHeight: 28,
    fontFamily: FONT_FAMILIES.semiBold,
    color: THEME_COLORS.textPrimary,
    letterSpacing: -0.2,
  },
  h5: {
    fontSize: 18,
    lineHeight: 26,
    fontFamily: FONT_FAMILIES.semiBold,
    color: THEME_COLORS.textPrimary,
    letterSpacing: -0.1,
  },
  h6: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: FONT_FAMILIES.semiBold,
    color: THEME_COLORS.textPrimary,
    letterSpacing: 0,
  },

  // Gövde metinleri
  bodyLarge: {
    fontSize: 18,
    lineHeight: 28,
    fontFamily: FONT_FAMILIES.regular,
    color: THEME_COLORS.textPrimary,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: FONT_FAMILIES.regular,
    color: THEME_COLORS.textPrimary,
  },
  bodySmall: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: FONT_FAMILIES.regular,
    color: THEME_COLORS.textSecondary,
  },

  // Etiket ve buton metinleri
  labelLarge: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: FONT_FAMILIES.medium,
    color: THEME_COLORS.textPrimary,
  },
  label: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: FONT_FAMILIES.medium,
    color: THEME_COLORS.textPrimary,
  },
  labelSmall: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: FONT_FAMILIES.medium,
    color: THEME_COLORS.textSecondary,
  },

  // Buton metinleri
  buttonLarge: {
    fontSize: 18,
    lineHeight: 22,
    fontFamily: FONT_FAMILIES.semiBold,
    color: THEME_COLORS.surface,
    textAlign: 'center' as const,
  },
  button: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: FONT_FAMILIES.semiBold,
    color: THEME_COLORS.surface,
    textAlign: 'center' as const,
  },
  buttonSmall: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: FONT_FAMILIES.medium,
    color: THEME_COLORS.surface,
    textAlign: 'center' as const,
  },

  // Caption ve yardımcı metinler
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: FONT_FAMILIES.regular,
    color: THEME_COLORS.textSecondary,
  },
  overline: {
    fontSize: 10,
    lineHeight: 14,
    fontFamily: FONT_FAMILIES.medium,
    color: THEME_COLORS.textSecondary,
    textTransform: 'uppercase' as const,
    letterSpacing: 1.5,
  },

  // Özel premium stiller
  premium: {
    fontSize: 20,
    lineHeight: 28,
    fontFamily: FONT_FAMILIES.bold,
    color: THEME_COLORS.primary,
    letterSpacing: -0.2,
  },
  accent: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: FONT_FAMILIES.semiBold,
    color: THEME_COLORS.primary,
  },
  price: {
    fontSize: 18,
    lineHeight: 24,
    fontFamily: FONT_FAMILIES.bold,
    color: THEME_COLORS.textPrimary,
  },
} as const;

// Responsive tipografi yardımcıları
export const getResponsiveTypography = (baseSize: number, scale: number = 1.2) => {
  return {
    fontSize: baseSize * scale,
    lineHeight: (baseSize * scale) * 1.4,
  };
};

// Text style varyantları
export const TEXT_VARIANTS = {
  primary: { color: THEME_COLORS.textPrimary },
  secondary: { color: THEME_COLORS.textSecondary },
  accent: { color: THEME_COLORS.primary },
  success: { color: THEME_COLORS.success },
  warning: { color: THEME_COLORS.warning },
  error: { color: THEME_COLORS.error },
  info: { color: THEME_COLORS.info },
  white: { color: THEME_COLORS.surface },
} as const;