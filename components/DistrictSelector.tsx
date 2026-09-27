// LOCA - İstanbul İlçe Seçim Komponenti (39 İlçe Eksiksiz)
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { IstanbulDistrict, ISTANBUL_DISTRICTS, THEME_COLORS, DESIGN_TOKENS } from '../types';

interface DistrictSelectorProps {
  selectedDistricts: IstanbulDistrict[];
  onDistrictToggle: (district: IstanbulDistrict) => void;
  onClearAll: () => void;
  multiSelect?: boolean;
  placeholder?: string;
}

const { width } = Dimensions.get('window');

export const DistrictSelector: React.FC<DistrictSelectorProps> = ({
  selectedDistricts,
  onDistrictToggle,
  onClearAll,
  multiSelect = true,
  placeholder = "İlçe seçin..."
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  // İlçe filtreleme
  const filteredDistricts = ISTANBUL_DISTRICTS.filter(district =>
    district.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDistrictPress = useCallback((district: IstanbulDistrict) => {
    if (!multiSelect) {
      // Tek seçim modu - önceki seçimleri temizle
      onDistrictToggle(district);
      setIsExpanded(false);
    } else {
      // Çoklu seçim modu
      onDistrictToggle(district);
    }
  }, [multiSelect, onDistrictToggle]);

  const isSelected = useCallback((district: IstanbulDistrict) => {
    return selectedDistricts.includes(district);
  }, [selectedDistricts]);

  const getSelectedText = () => {
    if (selectedDistricts.length === 0) return placeholder;
    if (selectedDistricts.length === 1) return selectedDistricts[0];
    return `${selectedDistricts.length} ilçe seçildi`;
  };

  return (
    <View style={styles.container}>
      {/* Ana Seçim Butonu */}
      <TouchableOpacity
        style={styles.mainButton}
        onPress={() => setIsExpanded(!isExpanded)}
        activeOpacity={0.8}
      >
        <Text style={styles.mainButtonText}>{getSelectedText()}</Text>
        <Text style={styles.chevron}>{isExpanded ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {/* Açılır İlçe Listesi */}
      {isExpanded && (
        <View style={styles.dropdown}>
          {/* Arama Kutusu */}
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="İlçe ara..."
              placeholderTextColor={THEME_COLORS.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCapitalize="words"
            />
          </View>

          {/* Temizle Butonu */}
          {selectedDistricts.length > 0 && (
            <TouchableOpacity style={styles.clearButton} onPress={onClearAll}>
              <Text style={styles.clearButtonText}>Tümünü Temizle</Text>
            </TouchableOpacity>
          )}

          {/* İlçe Listesi */}
          <ScrollView 
            style={styles.districtList}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
          >
            {filteredDistricts.map((district) => {
              const selected = isSelected(district as IstanbulDistrict);
              
              return (
                <TouchableOpacity
                  key={district}
                  style={[
                    styles.districtItem,
                    selected && styles.districtItemSelected
                  ]}
                  onPress={() => handleDistrictPress(district as IstanbulDistrict)}
                  activeOpacity={0.7}
                >
                  <Text style={[
                    styles.districtText,
                    selected && styles.districtTextSelected
                  ]}>
                    {district}
                  </Text>
                  {selected && (
                    <View style={styles.checkmark}>
                      <Text style={styles.checkmarkText}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {filteredDistricts.length === 0 && (
            <View style={styles.noResults}>
              <Text style={styles.noResultsText}>
                "{searchQuery}" için sonuç bulunamadı
              </Text>
            </View>
          )}
        </View>
      )}

      {/* Hızlı Seçim Çipleri (Yatay Kaydırılabilir) */}
      {!isExpanded && selectedDistricts.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.quickChips}
          contentContainerStyle={styles.quickChipsContainer}
        >
          {selectedDistricts.map((district) => (
            <TouchableOpacity
              key={district}
              style={styles.chip}
              onPress={() => onDistrictToggle(district)}
              activeOpacity={0.8}
            >
              <Text style={styles.chipText}>{district}</Text>
              <Text style={styles.chipRemove}>×</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1000,
  },
  mainButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: THEME_COLORS.surface,
    paddingHorizontal: DESIGN_TOKENS.spacing.md,
    paddingVertical: DESIGN_TOKENS.spacing.sm + 4,
    borderRadius: DESIGN_TOKENS.borderRadius.button,
    borderWidth: 1,
    borderColor: THEME_COLORS.primary + '20',
    ...DESIGN_TOKENS.shadow,
  },
  mainButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: THEME_COLORS.textPrimary,
    flex: 1,
  },
  chevron: {
    fontSize: 14,
    color: THEME_COLORS.primary,
    marginLeft: DESIGN_TOKENS.spacing.sm,
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: THEME_COLORS.surface,
    borderRadius: DESIGN_TOKENS.borderRadius.card,
    marginTop: DESIGN_TOKENS.spacing.xs,
    maxHeight: 400,
    ...DESIGN_TOKENS.shadow,
    zIndex: 1001,
  },
  searchContainer: {
    padding: DESIGN_TOKENS.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: THEME_COLORS.background,
  },
  searchInput: {
    backgroundColor: THEME_COLORS.background,
    paddingHorizontal: DESIGN_TOKENS.spacing.md,
    paddingVertical: DESIGN_TOKENS.spacing.sm,
    borderRadius: DESIGN_TOKENS.borderRadius.input,
    fontSize: 16,
    color: THEME_COLORS.textPrimary,
  },
  clearButton: {
    alignItems: 'center',
    paddingVertical: DESIGN_TOKENS.spacing.sm,
    backgroundColor: THEME_COLORS.primary + '10',
    marginHorizontal: DESIGN_TOKENS.spacing.md,
    marginBottom: DESIGN_TOKENS.spacing.sm,
    borderRadius: DESIGN_TOKENS.borderRadius.input,
  },
  clearButtonText: {
    color: THEME_COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  districtList: {
    maxHeight: 300,
  },
  districtItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: DESIGN_TOKENS.spacing.md,
    paddingVertical: DESIGN_TOKENS.spacing.sm + 2,
    borderBottomWidth: 0.5,
    borderBottomColor: THEME_COLORS.background,
  },
  districtItemSelected: {
    backgroundColor: THEME_COLORS.primary + '08',
  },
  districtText: {
    fontSize: 15,
    color: THEME_COLORS.textPrimary,
    flex: 1,
  },
  districtTextSelected: {
    color: THEME_COLORS.primary,
    fontWeight: '600',
  },
  checkmark: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: THEME_COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: THEME_COLORS.surface,
    fontSize: 12,
    fontWeight: 'bold',
  },
  noResults: {
    padding: DESIGN_TOKENS.spacing.lg,
    alignItems: 'center',
  },
  noResultsText: {
    color: THEME_COLORS.textSecondary,
    fontSize: 14,
    fontStyle: 'italic',
  },
  quickChips: {
    marginTop: DESIGN_TOKENS.spacing.sm,
  },
  quickChipsContainer: {
    paddingHorizontal: DESIGN_TOKENS.spacing.xs,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME_COLORS.primary,
    paddingHorizontal: DESIGN_TOKENS.spacing.sm + 2,
    paddingVertical: DESIGN_TOKENS.spacing.xs + 2,
    borderRadius: 20,
    marginRight: DESIGN_TOKENS.spacing.xs,
  },
  chipText: {
    color: THEME_COLORS.surface,
    fontSize: 13,
    fontWeight: '500',
  },
  chipRemove: {
    color: THEME_COLORS.surface,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: DESIGN_TOKENS.spacing.xs,
  },
});