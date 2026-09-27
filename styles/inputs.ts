// LOCA - Input Styles (Light Luxury Design System)
import { StyleSheet } from 'react-native';
import { THEME_COLORS, DESIGN_TOKENS } from '../types';
import { TYPOGRAPHY } from './typography';

export const INPUT_STYLES = StyleSheet.create({
  // Base Input Container
  inputContainer: {
    marginBottom: DESIGN_TOKENS.spacing.md,
  },

  // Input Label
  inputLabel: {
    ...TYPOGRAPHY.label,
    marginBottom: DESIGN_TOKENS.spacing.xs,
    color: THEME_COLORS.textPrimary,
  },
  inputLabelRequired: {
    color: THEME_COLORS.error,
  },

  // Base Input Style
  baseInput: {
    backgroundColor: THEME_COLORS.surface,
    borderRadius: DESIGN_TOKENS.borderRadius.input,
    borderWidth: 1,
    borderColor: THEME_COLORS.textSecondary + '30',
    paddingHorizontal: DESIGN_TOKENS.spacing.md,
    paddingVertical: DESIGN_TOKENS.spacing.sm + 2,
    fontSize: 16,
    color: THEME_COLORS.textPrimary,
    fontFamily: 'System',
    ...DESIGN_TOKENS.shadow,
  },

  // Input States
  inputFocused: {
    borderColor: THEME_COLORS.primary,
    borderWidth: 2,
    ...{
      elevation: 4,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      shadowColor: THEME_COLORS.primary,
    },
  },
  inputError: {
    borderColor: THEME_COLORS.error,
    borderWidth: 2,
  },
  inputSuccess: {
    borderColor: THEME_COLORS.success,
    borderWidth: 2,
  },
  inputDisabled: {
    backgroundColor: THEME_COLORS.background,
    color: THEME_COLORS.textSecondary,
    opacity: 0.6,
  },

  // Input Sizes
  inputSmall: {
    paddingHorizontal: DESIGN_TOKENS.spacing.sm,
    paddingVertical: DESIGN_TOKENS.spacing.xs + 2,
    fontSize: 14,
  },
  inputLarge: {
    paddingHorizontal: DESIGN_TOKENS.spacing.lg,
    paddingVertical: DESIGN_TOKENS.spacing.md,
    fontSize: 18,
  },

  // Search Input
  searchInput: {
    backgroundColor: THEME_COLORS.background,
    borderRadius: DESIGN_TOKENS.borderRadius.button,
    borderColor: 'transparent',
    paddingLeft: DESIGN_TOKENS.spacing.xl + 8, // Space for search icon
  },
  searchInputContainer: {
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    left: DESIGN_TOKENS.spacing.md,
    top: '50%',
    marginTop: -10, // Half icon height
    zIndex: 1,
  },

  // Input with Icon
  inputWithIcon: {
    paddingLeft: DESIGN_TOKENS.spacing.xl + 8,
  },
  inputWithIconRight: {
    paddingRight: DESIGN_TOKENS.spacing.xl + 8,
  },
  inputIconLeft: {
    position: 'absolute',
    left: DESIGN_TOKENS.spacing.md,
    top: '50%',
    marginTop: -10,
    zIndex: 1,
  },
  inputIconRight: {
    position: 'absolute',
    right: DESIGN_TOKENS.spacing.md,
    top: '50%',
    marginTop: -10,
    zIndex: 1,
  },

  // Textarea
  textarea: {
    minHeight: 100,
    paddingTop: DESIGN_TOKENS.spacing.md,
    textAlignVertical: 'top',
  },

  // Floating Label Input
  floatingLabelContainer: {
    position: 'relative',
    marginBottom: DESIGN_TOKENS.spacing.md,
  },
  floatingLabelInput: {
    paddingTop: DESIGN_TOKENS.spacing.lg,
  },
  floatingLabel: {
    position: 'absolute',
    left: DESIGN_TOKENS.spacing.md,
    color: THEME_COLORS.textSecondary,
    fontSize: 16,
    backgroundColor: THEME_COLORS.surface,
    paddingHorizontal: 4,
  },
  floatingLabelActive: {
    top: -8,
    fontSize: 12,
    color: THEME_COLORS.primary,
  },

  // Input Group (Multiple inputs in row)
  inputGroup: {
    flexDirection: 'row',
    gap: DESIGN_TOKENS.spacing.sm,
  },
  inputGroupItem: {
    flex: 1,
  },

  // Help Text
  inputHelpText: {
    ...TYPOGRAPHY.caption,
    marginTop: DESIGN_TOKENS.spacing.xs,
    color: THEME_COLORS.textSecondary,
  },
  inputErrorText: {
    color: THEME_COLORS.error,
  },
  inputSuccessText: {
    color: THEME_COLORS.success,
  },

  // Select/Picker Input
  selectInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectPlaceholder: {
    color: THEME_COLORS.textSecondary,
  },
  selectChevron: {
    color: THEME_COLORS.textSecondary,
    fontSize: 16,
  },

  // Checkbox Input Container
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: DESIGN_TOKENS.spacing.sm,
  },
  checkboxLabel: {
    ...TYPOGRAPHY.body,
    flex: 1,
    marginLeft: DESIGN_TOKENS.spacing.sm,
  },

  // Radio Button Container
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: DESIGN_TOKENS.spacing.sm,
  },
  radioLabel: {
    ...TYPOGRAPHY.body,
    flex: 1,
    marginLeft: DESIGN_TOKENS.spacing.sm,
  },

  // Switch Container
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: DESIGN_TOKENS.spacing.sm,
  },
  switchLabel: {
    ...TYPOGRAPHY.body,
    flex: 1,
  },

  // Date Picker Input
  datePickerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  datePickerText: {
    color: THEME_COLORS.textPrimary,
  },
  datePickerPlaceholder: {
    color: THEME_COLORS.textSecondary,
  },

  // File Upload Input
  fileUploadInput: {
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: THEME_COLORS.primary + '40',
    backgroundColor: THEME_COLORS.primary + '05',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  fileUploadInputActive: {
    borderColor: THEME_COLORS.primary,
    backgroundColor: THEME_COLORS.primary + '10',
  },
  fileUploadIcon: {
    fontSize: 32,
    color: THEME_COLORS.primary,
    marginBottom: DESIGN_TOKENS.spacing.sm,
  },
  fileUploadText: {
    ...TYPOGRAPHY.body,
    color: THEME_COLORS.textPrimary,
    textAlign: 'center',
  },
  fileUploadSubtext: {
    ...TYPOGRAPHY.caption,
    color: THEME_COLORS.textSecondary,
    textAlign: 'center',
    marginTop: DESIGN_TOKENS.spacing.xs,
  },

  // Slider Input
  sliderContainer: {
    paddingVertical: DESIGN_TOKENS.spacing.md,
  },
  sliderTrack: {
    height: 4,
    backgroundColor: THEME_COLORS.background,
    borderRadius: 2,
  },
  sliderThumb: {
    width: 24,
    height: 24,
    backgroundColor: THEME_COLORS.primary,
    borderRadius: 12,
    ...DESIGN_TOKENS.shadow,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: DESIGN_TOKENS.spacing.xs,
  },
  sliderLabel: {
    ...TYPOGRAPHY.caption,
    color: THEME_COLORS.textSecondary,
  },

  // Rating Input
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: DESIGN_TOKENS.spacing.sm,
  },
  ratingStar: {
    fontSize: 24,
    color: THEME_COLORS.textSecondary + '40',
    marginRight: DESIGN_TOKENS.spacing.xs / 2,
  },
  ratingStarActive: {
    color: '#FFD700', // Gold color for stars
  },

  // Tags Input
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: DESIGN_TOKENS.spacing.xs,
    paddingVertical: DESIGN_TOKENS.spacing.sm,
  },
  tag: {
    backgroundColor: THEME_COLORS.primary + '15',
    paddingHorizontal: DESIGN_TOKENS.spacing.sm,
    paddingVertical: DESIGN_TOKENS.spacing.xs / 2,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagText: {
    ...TYPOGRAPHY.labelSmall,
    color: THEME_COLORS.primary,
    marginRight: DESIGN_TOKENS.spacing.xs / 2,
  },
  tagRemove: {
    color: THEME_COLORS.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Premium Input Style (VIP)
  premiumInput: {
    borderColor: THEME_COLORS.primary,
    borderWidth: 2,
    backgroundColor: THEME_COLORS.surface,
    ...{
      elevation: 6,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      shadowColor: THEME_COLORS.primary,
    },
  },
  premiumInputLabel: {
    ...TYPOGRAPHY.accent,
    fontWeight: '600',
  },
});