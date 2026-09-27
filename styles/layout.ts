// LOCA - Layout Styles (Light Luxury Design System)
import { StyleSheet, StatusBar, Platform, Dimensions } from 'react-native';
import { THEME_COLORS, DESIGN_TOKENS } from '../types';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 0;

export const LAYOUT_STYLES = StyleSheet.create({
  // Container Layouts
  container: {
    flex: 1,
    backgroundColor: THEME_COLORS.background,
  },
  safeContainer: {
    flex: 1,
    backgroundColor: THEME_COLORS.background,
    paddingTop: STATUS_BAR_HEIGHT,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: THEME_COLORS.background,
  },

  // Content Containers
  content: {
    flex: 1,
    paddingHorizontal: DESIGN_TOKENS.spacing.md,
  },
  centeredContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: DESIGN_TOKENS.spacing.md,
  },
  paddedContent: {
    paddingHorizontal: DESIGN_TOKENS.spacing.lg,
    paddingVertical: DESIGN_TOKENS.spacing.md,
  },

  // Header Layouts
  header: {
    backgroundColor: THEME_COLORS.surface,
    paddingHorizontal: DESIGN_TOKENS.spacing.md,
    paddingVertical: DESIGN_TOKENS.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...DESIGN_TOKENS.shadow,
    zIndex: 1000,
  },
  headerTitle: {
    flex: 1,
    alignItems: 'center',
  },
  headerLeft: {
    minWidth: 50,
    alignItems: 'flex-start',
  },
  headerRight: {
    minWidth: 50,
    alignItems: 'flex-end',
  },

  // Navigation Layouts
  tabBar: {
    backgroundColor: THEME_COLORS.surface,
    flexDirection: 'row',
    paddingVertical: DESIGN_TOKENS.spacing.sm,
    paddingBottom: Platform.OS === 'ios' ? DESIGN_TOKENS.spacing.lg : DESIGN_TOKENS.spacing.sm,
    ...DESIGN_TOKENS.shadow,
    borderTopWidth: 1,
    borderTopColor: THEME_COLORS.background,
  },
  tabBarItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: DESIGN_TOKENS.spacing.sm,
  },

  // Card Layouts
  card: {
    backgroundColor: THEME_COLORS.surface,
    borderRadius: DESIGN_TOKENS.borderRadius.card,
    marginHorizontal: DESIGN_TOKENS.spacing.md,
    marginVertical: DESIGN_TOKENS.spacing.sm,
    padding: DESIGN_TOKENS.spacing.md,
    ...DESIGN_TOKENS.shadow,
  },
  cardElevated: {
    ...DESIGN_TOKENS.shadow,
    ...{
      elevation: 8,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
    },
  },
  cardFlat: {
    elevation: 0,
    shadowOpacity: 0,
    borderWidth: 1,
    borderColor: THEME_COLORS.textSecondary + '20',
  },

  // List Layouts
  listContainer: {
    flex: 1,
    backgroundColor: THEME_COLORS.background,
  },
  listItem: {
    backgroundColor: THEME_COLORS.surface,
    paddingHorizontal: DESIGN_TOKENS.spacing.md,
    paddingVertical: DESIGN_TOKENS.spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: THEME_COLORS.background,
  },
  listItemFirst: {
    borderTopLeftRadius: DESIGN_TOKENS.borderRadius.card,
    borderTopRightRadius: DESIGN_TOKENS.borderRadius.card,
  },
  listItemLast: {
    borderBottomLeftRadius: DESIGN_TOKENS.borderRadius.card,
    borderBottomRightRadius: DESIGN_TOKENS.borderRadius.card,
    borderBottomWidth: 0,
  },

  // Grid Layouts
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -DESIGN_TOKENS.spacing.sm / 2,
  },
  gridItem2: {
    width: '50%',
    paddingHorizontal: DESIGN_TOKENS.spacing.sm / 2,
  },
  gridItem3: {
    width: '33.333%',
    paddingHorizontal: DESIGN_TOKENS.spacing.sm / 2,
  },
  gridItem4: {
    width: '25%',
    paddingHorizontal: DESIGN_TOKENS.spacing.sm / 2,
  },

  // Flexbox Utilities
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  alignCenter: {
    alignItems: 'center',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  spaceAround: {
    justifyContent: 'space-around',
  },
  spaceEvenly: {
    justifyContent: 'space-evenly',
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  flex3: {
    flex: 3,
  },

  // Positioning
  absolute: {
    position: 'absolute',
  },
  relative: {
    position: 'relative',
  },
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
  },
  absoluteTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  absoluteBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },

  // Spacing Utilities
  marginXS: {
    margin: DESIGN_TOKENS.spacing.xs,
  },
  marginSM: {
    margin: DESIGN_TOKENS.spacing.sm,
  },
  marginMD: {
    margin: DESIGN_TOKENS.spacing.md,
  },
  marginLG: {
    margin: DESIGN_TOKENS.spacing.lg,
  },
  marginXL: {
    margin: DESIGN_TOKENS.spacing.xl,
  },
  
  paddingXS: {
    padding: DESIGN_TOKENS.spacing.xs,
  },
  paddingSM: {
    padding: DESIGN_TOKENS.spacing.sm,
  },
  paddingMD: {
    padding: DESIGN_TOKENS.spacing.md,
  },
  paddingLG: {
    padding: DESIGN_TOKENS.spacing.lg,
  },
  paddingXL: {
    padding: DESIGN_TOKENS.spacing.xl,
  },

  // Horizontal Spacing
  marginHorizontalXS: {
    marginHorizontal: DESIGN_TOKENS.spacing.xs,
  },
  marginHorizontalSM: {
    marginHorizontal: DESIGN_TOKENS.spacing.sm,
  },
  marginHorizontalMD: {
    marginHorizontal: DESIGN_TOKENS.spacing.md,
  },
  marginHorizontalLG: {
    marginHorizontal: DESIGN_TOKENS.spacing.lg,
  },
  
  paddingHorizontalXS: {
    paddingHorizontal: DESIGN_TOKENS.spacing.xs,
  },
  paddingHorizontalSM: {
    paddingHorizontal: DESIGN_TOKENS.spacing.sm,
  },
  paddingHorizontalMD: {
    paddingHorizontal: DESIGN_TOKENS.spacing.md,
  },
  paddingHorizontalLG: {
    paddingHorizontal: DESIGN_TOKENS.spacing.lg,
  },

  // Vertical Spacing
  marginVerticalXS: {
    marginVertical: DESIGN_TOKENS.spacing.xs,
  },
  marginVerticalSM: {
    marginVertical: DESIGN_TOKENS.spacing.sm,
  },
  marginVerticalMD: {
    marginVertical: DESIGN_TOKENS.spacing.md,
  },
  marginVerticalLG: {
    marginVertical: DESIGN_TOKENS.spacing.lg,
  },
  
  paddingVerticalXS: {
    paddingVertical: DESIGN_TOKENS.spacing.xs,
  },
  paddingVerticalSM: {
    paddingVertical: DESIGN_TOKENS.spacing.sm,
  },
  paddingVerticalMD: {
    paddingVertical: DESIGN_TOKENS.spacing.md,
  },
  paddingVerticalLG: {
    paddingVertical: DESIGN_TOKENS.spacing.lg,
  },

  // Modal/Overlay Layouts
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: THEME_COLORS.surface,
    borderRadius: DESIGN_TOKENS.borderRadius.card,
    marginHorizontal: DESIGN_TOKENS.spacing.lg,
    maxHeight: SCREEN_HEIGHT * 0.8,
    ...DESIGN_TOKENS.shadow,
  },
  modalHeader: {
    borderBottomWidth: 1,
    borderBottomColor: THEME_COLORS.background,
    paddingHorizontal: DESIGN_TOKENS.spacing.lg,
    paddingVertical: DESIGN_TOKENS.spacing.md,
  },
  modalContent: {
    paddingHorizontal: DESIGN_TOKENS.spacing.lg,
    paddingVertical: DESIGN_TOKENS.spacing.md,
  },
  modalFooter: {
    borderTopWidth: 1,
    borderTopColor: THEME_COLORS.background,
    paddingHorizontal: DESIGN_TOKENS.spacing.lg,
    paddingVertical: DESIGN_TOKENS.spacing.md,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: DESIGN_TOKENS.spacing.sm,
  },

  // Bottom Sheet
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: THEME_COLORS.surface,
    borderTopLeftRadius: DESIGN_TOKENS.borderRadius.card * 2,
    borderTopRightRadius: DESIGN_TOKENS.borderRadius.card * 2,
    paddingTop: DESIGN_TOKENS.spacing.sm,
    ...DESIGN_TOKENS.shadow,
    ...{
      elevation: 16,
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.15,
      shadowRadius: 16,
    },
  },
  bottomSheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: THEME_COLORS.textSecondary + '40',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: DESIGN_TOKENS.spacing.md,
  },

  // Dividers
  divider: {
    height: 1,
    backgroundColor: THEME_COLORS.background,
    marginVertical: DESIGN_TOKENS.spacing.md,
  },
  dividerVertical: {
    width: 1,
    backgroundColor: THEME_COLORS.background,
    marginHorizontal: DESIGN_TOKENS.spacing.md,
  },

  // Full Screen Layouts
  fullScreen: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  halfScreen: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 2,
  },

  // Premium Container (VIP)
  premiumContainer: {
    backgroundColor: THEME_COLORS.surface,
    borderWidth: 2,
    borderColor: THEME_COLORS.primary,
    borderRadius: DESIGN_TOKENS.borderRadius.card,
    padding: DESIGN_TOKENS.spacing.lg,
    ...{
      elevation: 8,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 12,
      shadowColor: THEME_COLORS.primary,
    },
  },

  // Loading States
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME_COLORS.background,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
});