// LOCA - Button Styles (Light Luxury Design System)
import { StyleSheet } from 'react-native';
import { THEME_COLORS, DESIGN_TOKENS } from '../types';
import { TYPOGRAPHY } from './typography';

export const BUTTON_STYLES = StyleSheet.create({
  // Base Button Styles
  baseButton: {
    borderRadius: DESIGN_TOKENS.borderRadius.button,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    ...DESIGN_TOKENS.shadow,
  },

  // Primary Button
  primaryButton: {
    backgroundColor: THEME_COLORS.primary,
    paddingHorizontal: DESIGN_TOKENS.spacing.lg,
    paddingVertical: DESIGN_TOKENS.spacing.md,
  },
  primaryButtonText: {
    ...TYPOGRAPHY.button,
    color: THEME_COLORS.surface,
  },

  // Secondary Button
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: THEME_COLORS.primary,
    paddingHorizontal: DESIGN_TOKENS.spacing.lg,
    paddingVertical: DESIGN_TOKENS.spacing.md - 2, // -2 for border
  },
  secondaryButtonText: {
    ...TYPOGRAPHY.button,
    color: THEME_COLORS.primary,
  },

  // Tertiary Button
  tertiaryButton: {
    backgroundColor: THEME_COLORS.primary + '10',
    paddingHorizontal: DESIGN_TOKENS.spacing.lg,
    paddingVertical: DESIGN_TOKENS.spacing.md,
  },
  tertiaryButtonText: {
    ...TYPOGRAPHY.button,
    color: THEME_COLORS.primary,
  },

  // Ghost Button
  ghostButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: DESIGN_TOKENS.spacing.lg,
    paddingVertical: DESIGN_TOKENS.spacing.md,
  },
  ghostButtonText: {
    ...TYPOGRAPHY.button,
    color: THEME_COLORS.textPrimary,
  },

  // Surface Button (Elevated)
  surfaceButton: {
    backgroundColor: THEME_COLORS.surface,
    paddingHorizontal: DESIGN_TOKENS.spacing.lg,
    paddingVertical: DESIGN_TOKENS.spacing.md,
    ...DESIGN_TOKENS.shadow,
  },
  surfaceButtonText: {
    ...TYPOGRAPHY.button,
    color: THEME_COLORS.textPrimary,
  },

  // Danger Button
  dangerButton: {
    backgroundColor: THEME_COLORS.error,
    paddingHorizontal: DESIGN_TOKENS.spacing.lg,
    paddingVertical: DESIGN_TOKENS.spacing.md,
  },
  dangerButtonText: {
    ...TYPOGRAPHY.button,
    color: THEME_COLORS.surface,
  },

  // Success Button
  successButton: {
    backgroundColor: THEME_COLORS.success,
    paddingHorizontal: DESIGN_TOKENS.spacing.lg,
    paddingVertical: DESIGN_TOKENS.spacing.md,
  },
  successButtonText: {
    ...TYPOGRAPHY.button,
    color: THEME_COLORS.surface,
  },

  // Size Variants
  largeButton: {
    paddingHorizontal: DESIGN_TOKENS.spacing.xl,
    paddingVertical: DESIGN_TOKENS.spacing.lg,
    minHeight: 56,
  },
  largeButtonText: {
    ...TYPOGRAPHY.buttonLarge,
  },

  smallButton: {
    paddingHorizontal: DESIGN_TOKENS.spacing.md,
    paddingVertical: DESIGN_TOKENS.spacing.sm,
    minHeight: 36,
  },
  smallButtonText: {
    ...TYPOGRAPHY.buttonSmall,
  },

  // Icon Button
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: THEME_COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...DESIGN_TOKENS.shadow,
  },
  iconButtonSmall: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  iconButtonLarge: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },

  // Floating Action Button
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: THEME_COLORS.primary,
    position: 'absolute',
    bottom: DESIGN_TOKENS.spacing.xl,
    right: DESIGN_TOKENS.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...{
      elevation: 8,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      shadowColor: THEME_COLORS.primary,
    },
  },

  // Chip/Tag Button
  chipButton: {
    backgroundColor: THEME_COLORS.surface,
    borderRadius: 20,
    paddingHorizontal: DESIGN_TOKENS.spacing.md,
    paddingVertical: DESIGN_TOKENS.spacing.xs + 2,
    borderWidth: 1,
    borderColor: THEME_COLORS.primary + '30',
  },
  chipButtonActive: {
    backgroundColor: THEME_COLORS.primary,
    borderColor: THEME_COLORS.primary,
  },
  chipButtonText: {
    ...TYPOGRAPHY.labelSmall,
    color: THEME_COLORS.textSecondary,
  },
  chipButtonActiveText: {
    color: THEME_COLORS.surface,
  },

  // Disabled States
  disabledButton: {
    backgroundColor: THEME_COLORS.textSecondary + '30',
    elevation: 0,
    shadowOpacity: 0,
  },
  disabledButtonText: {
    color: THEME_COLORS.textSecondary,
  },

  // Loading States
  loadingButton: {
    opacity: 0.7,
  },

  // Button dengan Icon
  buttonWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonIcon: {
    marginRight: DESIGN_TOKENS.spacing.xs,
  },
  buttonIconRight: {
    marginLeft: DESIGN_TOKENS.spacing.xs,
    marginRight: 0,
  },

  // Premium Button (VIP)
  premiumButton: {
    backgroundColor: `linear-gradient(135deg, ${THEME_COLORS.primary}, #E8B86D)`,
    paddingHorizontal: DESIGN_TOKENS.spacing.lg,
    paddingVertical: DESIGN_TOKENS.spacing.md,
    ...{
      elevation: 8,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 12,
      shadowColor: THEME_COLORS.primary,
    },
  },
  premiumButtonText: {
    ...TYPOGRAPHY.button,
    color: THEME_COLORS.surface,
    fontWeight: '700',
  },

  // Social Media Buttons
  socialButton: {
    backgroundColor: THEME_COLORS.surface,
    borderWidth: 1,
    borderColor: THEME_COLORS.textSecondary + '20',
    paddingHorizontal: DESIGN_TOKENS.spacing.lg,
    paddingVertical: DESIGN_TOKENS.spacing.md,
  },
  googleButton: {
    borderColor: '#DB4437',
  },
  facebookButton: {
    borderColor: '#4267B2',
  },
  appleButton: {
    backgroundColor: THEME_COLORS.textPrimary,
    borderColor: THEME_COLORS.textPrimary,
  },
  appleButtonText: {
    color: THEME_COLORS.surface,
  },

  // Toggle Button
  toggleButton: {
    backgroundColor: THEME_COLORS.surface,
    borderWidth: 2,
    borderColor: THEME_COLORS.primary + '20',
    paddingHorizontal: DESIGN_TOKENS.spacing.md,
    paddingVertical: DESIGN_TOKENS.spacing.sm,
    borderRadius: DESIGN_TOKENS.borderRadius.input,
  },
  toggleButtonActive: {
    backgroundColor: THEME_COLORS.primary + '10',
    borderColor: THEME_COLORS.primary,
  },
  toggleButtonText: {
    ...TYPOGRAPHY.label,
    color: THEME_COLORS.textSecondary,
  },
  toggleButtonActiveText: {
    color: THEME_COLORS.primary,
    fontWeight: '600',
  },

  // Radio Button Style
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: THEME_COLORS.primary + '40',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: DESIGN_TOKENS.spacing.sm,
  },
  radioButtonActive: {
    borderColor: THEME_COLORS.primary,
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: THEME_COLORS.primary,
  },

  // Checkbox Style
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: DESIGN_TOKENS.borderRadius.input / 2,
    borderWidth: 2,
    borderColor: THEME_COLORS.primary + '40',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: DESIGN_TOKENS.spacing.sm,
  },
  checkboxActive: {
    backgroundColor: THEME_COLORS.primary,
    borderColor: THEME_COLORS.primary,
  },
  checkboxIcon: {
    color: THEME_COLORS.surface,
    fontSize: 12,
    fontWeight: 'bold',
  },
});