// LOCA - Mod Seçici Komponenti (Date, Aile, İçkili, İçkisiz, Çalışma)
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { ModeFilters, THEME_COLORS, DESIGN_TOKENS } from '../types';

interface ModeItem {
  key: keyof ModeFilters;
  label: string;
  icon: string;
  description: string;
  color: string;
}

interface ModeSelectorProps {
  selectedModes: Partial<ModeFilters>;
  onModeToggle: (mode: keyof ModeFilters) => void;
  onClearAll: () => void;
  horizontal?: boolean;
}

// MOD TANIMLARI
const MODES: ModeItem[] = [
  {
    key: 'is_date',
    label: 'Date',
    icon: '💕',
    description: 'Romantik, loş atmosfer',
    color: '#E91E63'
  },
  {
    key: 'is_family',
    label: 'Aile',
    icon: '👨‍👩‍👧‍👦',
    description: 'Aileye uygun, rahat',
    color: '#4CAF50'
  },
  {
    key: 'has_alcohol',
    label: 'İçkili',
    icon: '🍷',
    description: 'Alkol servisi var',
    color: '#9C27B0'
  },
  {
    key: 'is_alcohol_free',
    label: 'İçkisiz',
    icon: '☕',
    description: 'Alkol servisi yok',
    color: '#FF9800'
  },
  {
    key: 'is_work_friendly',
    label: 'Çalışma',
    icon: '💻',
    description: 'Laptop, WiFi dostu',
    color: '#2196F3'
  },
  {
    key: 'has_outdoor',
    label: 'Açık Alan',
    icon: '🌿',
    description: 'Teras, bahçe, manzara',
    color: '#8BC34A'
  }
];

export const ModeSelector: React.FC<ModeSelectorProps> = ({
  selectedModes,
  onModeToggle,
  onClearAll,
  horizontal = true
}) => {
  const selectedCount = Object.values(selectedModes).filter(Boolean).length;
  const hasSelection = selectedCount > 0;

  const renderModeItem = (mode: ModeItem) => {
    const isSelected = selectedModes[mode.key] === true;
    
    return (
      <TouchableOpacity
        key={mode.key}
        style={[
          styles.modeItem,
          isSelected && [styles.modeItemSelected, { borderColor: mode.color }],
          horizontal && styles.modeItemHorizontal
        ]}
        onPress={() => onModeToggle(mode.key)}
        activeOpacity={0.8}
      >
        {/* İkon ve Seçim Göstergesi */}
        <View style={styles.modeIconContainer}>
          <Text style={styles.modeIcon}>{mode.icon}</Text>
          {isSelected && (
            <View style={[styles.selectedIndicator, { backgroundColor: mode.color }]}>
              <Text style={styles.selectedIndicatorText}>✓</Text>
            </View>
          )}
        </View>

        {/* Mod Bilgileri */}
        <View style={styles.modeInfo}>
          <Text style={[
            styles.modeLabel,
            isSelected && { color: mode.color }
          ]}>
            {mode.label}
          </Text>
          <Text style={styles.modeDescription}>
            {mode.description}
          </Text>
        </View>

        {/* Seçim Durumu (Mobil için) */}
        <View style={[
          styles.selectionBorder,
          isSelected && { backgroundColor: mode.color + '15' }
        ]} />
      </TouchableOpacity>
    );
  };

  if (horizontal) {
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Atmosfer Seçin</Text>
          {hasSelection && (
            <TouchableOpacity onPress={onClearAll} style={styles.clearButton}>
              <Text style={styles.clearButtonText}>Temizle ({selectedCount})</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Yatay Mod Listesi */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
          contentContainerStyle={styles.horizontalContainer}
        >
          {MODES.map(renderModeItem)}
        </ScrollView>

        {/* Seçim Özeti */}
        {hasSelection && (
          <View style={styles.selectionSummary}>
            <Text style={styles.summaryText}>
              {selectedCount} atmosfer seçildi
            </Text>
          </View>
        )}
      </View>
    );
  }

  // Dikey Liste
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Atmosfer Filtreleri</Text>
        {hasSelection && (
          <TouchableOpacity onPress={onClearAll} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Temizle</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Dikey Mod Listesi */}
      <View style={styles.verticalContainer}>
        {MODES.map(renderModeItem)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: DESIGN_TOKENS.spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: DESIGN_TOKENS.spacing.md,
    marginBottom: DESIGN_TOKENS.spacing.md,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: THEME_COLORS.textPrimary,
  },
  clearButton: {
    backgroundColor: THEME_COLORS.primary + '10',
    paddingHorizontal: DESIGN_TOKENS.spacing.sm,
    paddingVertical: DESIGN_TOKENS.spacing.xs,
    borderRadius: DESIGN_TOKENS.borderRadius.input,
  },
  clearButtonText: {
    color: THEME_COLORS.primary,
    fontSize: 13,
    fontWeight: '600',
  },
  horizontalScroll: {
    flexGrow: 0,
  },
  horizontalContainer: {
    paddingHorizontal: DESIGN_TOKENS.spacing.md,
    paddingRight: DESIGN_TOKENS.spacing.xl,
  },
  verticalContainer: {
    paddingHorizontal: DESIGN_TOKENS.spacing.md,
  },
  modeItem: {
    backgroundColor: THEME_COLORS.surface,
    borderRadius: DESIGN_TOKENS.borderRadius.card,
    padding: DESIGN_TOKENS.spacing.md,
    marginBottom: DESIGN_TOKENS.spacing.sm,
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
    overflow: 'hidden',
    ...DESIGN_TOKENS.shadow,
  },
  modeItemHorizontal: {
    width: 160,
    marginRight: DESIGN_TOKENS.spacing.sm,
    marginBottom: 0,
  },
  modeItemSelected: {
    backgroundColor: THEME_COLORS.surface,
    borderColor: THEME_COLORS.primary,
    transform: [{ scale: 1.02 }],
  },
  modeIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: DESIGN_TOKENS.spacing.xs,
  },
  modeIcon: {
    fontSize: 32,
  },
  selectedIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedIndicatorText: {
    color: THEME_COLORS.surface,
    fontSize: 12,
    fontWeight: 'bold',
  },
  modeInfo: {
    flex: 1,
  },
  modeLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: THEME_COLORS.textPrimary,
    marginBottom: DESIGN_TOKENS.spacing.xs / 2,
  },
  modeDescription: {
    fontSize: 13,
    color: THEME_COLORS.textSecondary,
    lineHeight: 18,
  },
  selectionBorder: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: 'transparent',
  },
  selectionSummary: {
    marginTop: DESIGN_TOKENS.spacing.sm,
    paddingHorizontal: DESIGN_TOKENS.spacing.md,
    alignItems: 'center',
  },
  summaryText: {
    fontSize: 14,
    color: THEME_COLORS.primary,
    fontWeight: '600',
    backgroundColor: THEME_COLORS.primary + '10',
    paddingHorizontal: DESIGN_TOKENS.spacing.md,
    paddingVertical: DESIGN_TOKENS.spacing.xs,
    borderRadius: 20,
  },
});