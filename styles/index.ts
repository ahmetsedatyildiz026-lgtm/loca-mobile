// LOCA - Style System Index (Light Luxury Design System)
// Central export for all styling utilities

export * from './typography';
export * from './buttons';
export * from './inputs';
export * from './layout';
export * from './animations';

// Re-export design tokens for convenience
export { THEME_COLORS, DESIGN_TOKENS } from '../types';

// Global Style Utilities
import { StyleSheet } from 'react-native';
import { THEME_COLORS } from '../types';

export const GLOBAL_STYLES = StyleSheet.create({
  // Shadow utilities
  shadowLight: {
    elevation: 2,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowColor: '#000',
  },
  shadowMedium: {
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowColor: '#000',
  },
  shadowHeavy: {
    elevation: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowColor: '#000',
  },

  // Border utilities
  borderLight: {
    borderWidth: 1,
    borderColor: THEME_COLORS.textSecondary + '20',
  },
  borderMedium: {
    borderWidth: 1,
    borderColor: THEME_COLORS.textSecondary + '40',
  },
  borderPrimary: {
    borderWidth: 1,
    borderColor: THEME_COLORS.primary,
  },

  // Background utilities
  backgroundPrimary: {
    backgroundColor: THEME_COLORS.primary,
  },
  backgroundSurface: {
    backgroundColor: THEME_COLORS.surface,
  },
  backgroundLight: {
    backgroundColor: THEME_COLORS.background,
  },

  // Text color utilities
  textPrimary: {
    color: THEME_COLORS.textPrimary,
  },
  textSecondary: {
    color: THEME_COLORS.textSecondary,
  },
  textAccent: {
    color: THEME_COLORS.primary,
  },
  textWhite: {
    color: THEME_COLORS.surface,
  },

  // Common states
  disabled: {
    opacity: 0.6,
  },
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
});

// Style mixins for common patterns
export const STYLE_MIXINS = {
  // Card with premium styling
  premiumCard: {
    backgroundColor: THEME_COLORS.surface,
    borderRadius: 16,
    padding: 20,
    ...GLOBAL_STYLES.shadowHeavy,
    borderWidth: 2,
    borderColor: THEME_COLORS.primary + '20',
  },

  // Floating button
  floatingButton: {
    position: 'absolute' as const,
    bottom: 24,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: THEME_COLORS.primary,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    ...GLOBAL_STYLES.shadowHeavy,
  },

  // Glass morphism effect
  glassMorphism: {
    backgroundColor: THEME_COLORS.surface + 'CC',
    backdropFilter: 'blur(20px)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: THEME_COLORS.surface + '40',
  },

  // Gradient background
  gradientBackground: {
    backgroundColor: THEME_COLORS.primary,
    // Note: For actual gradients, use LinearGradient component
  },
} as const;

// Responsive breakpoints (for tablet/desktop support)
export const BREAKPOINTS = {
  small: 0,
  medium: 768,
  large: 1024,
  xlarge: 1280,
} as const;

// Helper function for responsive styles
export const responsive = {
  isTablet: (width: number) => width >= BREAKPOINTS.medium,
  isDesktop: (width: number) => width >= BREAKPOINTS.large,
  getColumns: (width: number) => {
    if (width >= BREAKPOINTS.large) return 4;
    if (width >= BREAKPOINTS.medium) return 3;
    return 2;
  },
};