// LOCA - Arama Çubuğu Komponenti
import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Text,
} from 'react-native';
import { THEME_COLORS, DESIGN_TOKENS } from '../types';

interface SearchBarProps {
  placeholder?: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: (query: string) => void;
  onFilterPress?: () => void;
  showFilterButton?: boolean;
  hasActiveFilters?: boolean;
  autoFocus?: boolean;
  debounceMs?: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Mekan, mahalle ara...",
  onSearchChange,
  onSearchSubmit,
  onFilterPress,
  showFilterButton = true,
  hasActiveFilters = false,
  autoFocus = false,
  debounceMs = 300
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);
  
  // Animasyon değerleri
  const focusAnimation = useState(new Animated.Value(0))[0];
  const filterAnimation = useState(new Animated.Value(hasActiveFilters ? 1 : 0))[0];

  // Focus animasyonu
  useEffect(() => {
    Animated.timing(focusAnimation, {
      toValue: isFocused ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, focusAnimation]);

  // Filter animasyonu
  useEffect(() => {
    Animated.timing(filterAnimation, {
      toValue: hasActiveFilters ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [hasActiveFilters, filterAnimation]);

  // Debounced arama
  useEffect(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeout = setTimeout(() => {
      onSearchChange(query);
    }, debounceMs);

    setDebounceTimeout(timeout);

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [query, debounceMs]); // onSearchChange'i dependency array'den çıkardık

  const handleTextChange = (text: string) => {
    setQuery(text);
  };

  const handleSubmit = () => {
    onSearchSubmit(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearchChange('');
  };

  const borderColor = focusAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [THEME_COLORS.primary + '20', THEME_COLORS.primary],
  });

  const filterBackgroundColor = filterAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [THEME_COLORS.surface, THEME_COLORS.primary],
  });

  const filterTextColor = filterAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [THEME_COLORS.textSecondary, THEME_COLORS.surface],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.searchContainer, { borderColor }]}>
        {/* Arama İkonu */}
        <View style={styles.searchIcon}>
          <Text style={styles.iconText}>🔍</Text>
        </View>

        {/* Arama Input'u */}
        <TextInput
          style={styles.searchInput}
          placeholder={placeholder}
          placeholderTextColor={THEME_COLORS.textSecondary}
          value={query}
          onChangeText={handleTextChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onSubmitEditing={handleSubmit}
          autoFocus={autoFocus}
          returnKeyType="search"
          autoCapitalize="words"
          autoCorrect={false}
        />

        {/* Temizle Butonu */}
        {query.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClear}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={styles.clearButtonText}>✕</Text>
          </TouchableOpacity>
        )}
      </Animated.View>

      {/* Filtre Butonu */}
      {showFilterButton && (
        <TouchableOpacity
          style={styles.filterButtonContainer}
          onPress={onFilterPress}
          activeOpacity={0.8}
        >
          <Animated.View 
            style={[
              styles.filterButton, 
              { backgroundColor: filterBackgroundColor }
            ]}
          >
            <Text style={styles.filterIcon}>⚙️</Text>
            <Animated.Text style={[styles.filterText, { color: filterTextColor }]}>
              Filtre
            </Animated.Text>
            
            {/* Aktif filtre göstergesi */}
            {hasActiveFilters && (
              <View style={styles.filterIndicator}>
                <Text style={styles.filterIndicatorText}>●</Text>
              </View>
            )}
          </Animated.View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: DESIGN_TOKENS.spacing.md,
    paddingVertical: DESIGN_TOKENS.spacing.sm,
    backgroundColor: THEME_COLORS.background,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME_COLORS.surface,
    borderRadius: DESIGN_TOKENS.borderRadius.button,
    paddingHorizontal: DESIGN_TOKENS.spacing.md,
    borderWidth: 2,
    borderColor: THEME_COLORS.primary + '20',
    ...DESIGN_TOKENS.shadow,
  },
  searchIcon: {
    marginRight: DESIGN_TOKENS.spacing.sm,
  },
  iconText: {
    fontSize: 18,
    opacity: 0.6,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: THEME_COLORS.textPrimary,
    paddingVertical: DESIGN_TOKENS.spacing.sm + 2,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  clearButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME_COLORS.textSecondary + '20',
    borderRadius: 12,
    marginLeft: DESIGN_TOKENS.spacing.xs,
  },
  clearButtonText: {
    fontSize: 12,
    color: THEME_COLORS.textSecondary,
    fontWeight: 'bold',
  },
  filterButtonContainer: {
    marginLeft: DESIGN_TOKENS.spacing.sm,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME_COLORS.surface,
    paddingHorizontal: DESIGN_TOKENS.spacing.sm + 2,
    paddingVertical: DESIGN_TOKENS.spacing.sm + 2,
    borderRadius: DESIGN_TOKENS.borderRadius.button,
    ...DESIGN_TOKENS.shadow,
    position: 'relative',
  },
  filterIcon: {
    fontSize: 16,
    marginRight: DESIGN_TOKENS.spacing.xs,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME_COLORS.textSecondary,
  },
  filterIndicator: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: THEME_COLORS.error,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterIndicatorText: {
    fontSize: 8,
    color: THEME_COLORS.surface,
    fontWeight: 'bold',
  },
});