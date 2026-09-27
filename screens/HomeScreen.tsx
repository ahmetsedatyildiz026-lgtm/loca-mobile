// LOCA - Ana Ekran (Home Screen)
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  RefreshControl,
  Alert,
} from 'react-native';
import {
  SearchBar,
  DistrictSelector,
  ModeSelector,
  PlaceList,
} from '../components';
import { 
  useFeaturedPlaces, 
  useSearchPlaces, 
  useFilterState,
  useNearbyPlaces 
} from '../hooks/usePlaces';
import { 
  EnrichedPlace, 
  IstanbulDistrict,
  THEME_COLORS,
  DESIGN_TOKENS 
} from '../types';
import { 
  LAYOUT_STYLES, 
  TYPOGRAPHY,
  GLOBAL_STYLES 
} from '../styles';
import * as Location from 'expo-location';

interface HomeScreenProps {
  navigation: any; // React Navigation prop
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  // State Management
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Custom Hooks
  const { 
    places: featuredPlaces, 
    loading: featuredLoading, 
    error: featuredError,
    refetch: refetchFeatured 
  } = useFeaturedPlaces();

  const {
    places: searchResults,
    loading: searchLoading,
    searchPlaces
  } = useSearchPlaces();

  const {
    places: nearbyPlaces,
    loading: nearbyLoading,
    fetchNearby
  } = useNearbyPlaces(userLocation, 5);

  const {
    filterState,
    updateDistricts,
    toggleMode,
    clearFilters,
    hasActiveFilters
  } = useFilterState();

  // Location Permission & Fetching
  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        setUserLocation({
          lat: location.coords.latitude,
          lng: location.coords.longitude
        });
      }
    } catch (error) {
      console.warn('Location permission denied:', error);
    }
  };

  // Search Handler
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query.length > 2) {
      const searchParams = {
        districts: filterState.selectedDistricts,
        modes: filterState.selectedModes,
        limit: 20
      };
      searchPlaces(searchParams);
    }
  };

  // Filter Handlers
  const handleDistrictToggle = (district: IstanbulDistrict) => {
    const newDistricts = filterState.selectedDistricts.includes(district)
      ? filterState.selectedDistricts.filter(d => d !== district)
      : [...filterState.selectedDistricts, district];
    
    updateDistricts(newDistricts);
    triggerSearch();
  };

  const handleModeToggle = (mode: any) => {
    toggleMode(mode);
    triggerSearch();
  };

  const triggerSearch = () => {
    if (hasActiveFilters || searchQuery.length > 2) {
      const searchParams = {
        districts: filterState.selectedDistricts,
        modes: filterState.selectedModes,
        limit: 20
      };
      searchPlaces(searchParams);
    }
  };

  // Navigation Handlers
  const handlePlacePress = (place: EnrichedPlace) => {
    navigation.navigate('PlaceDetail', { placeId: place.id });
  };

  const handleFilterPress = () => {
    setShowFilters(!showFilters);
  };

  // Refresh Handler
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refetchFeatured();
      if (userLocation) {
        await fetchNearby(userLocation, 5);
      }
    } finally {
      setRefreshing(false);
    }
  };

  // Determine which places to show
  const getDisplayPlaces = () => {
    if (searchQuery.length > 2 || hasActiveFilters) {
      return searchResults;
    }
    if (userLocation && nearbyPlaces.length > 0) {
      return nearbyPlaces.slice(0, 10);
    }
    return featuredPlaces;
  };

  const displayPlaces = getDisplayPlaces();
  const isLoading = featuredLoading || searchLoading || nearbyLoading;

  return (
    <View style={LAYOUT_STYLES.container}>
      <StatusBar backgroundColor={THEME_COLORS.primary} barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>LOCA</Text>
        <Text style={styles.headerSubtitle}>İstanbul'u Keşfet</Text>
      </View>

      {/* Search Bar */}
      <SearchBar
        onSearchChange={handleSearchChange}
        onSearchSubmit={(query) => handleSearchChange(query)}
        onFilterPress={handleFilterPress}
        hasActiveFilters={hasActiveFilters}
        placeholder="Mekan, mahalle ara..."
      />

      <ScrollView
        style={LAYOUT_STYLES.scrollContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[THEME_COLORS.primary]}
            tintColor={THEME_COLORS.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* District Filter (Always visible, collapsible) */}
        <View style={styles.section}>
          <DistrictSelector
            selectedDistricts={filterState.selectedDistricts}
            onDistrictToggle={handleDistrictToggle}
            onClearAll={() => {
              updateDistricts([]);
              triggerSearch();
            }}
            multiSelect={true}
          />
        </View>

        {/* Mode Filter (Expandable) */}
        {showFilters && (
          <View style={styles.section}>
            <ModeSelector
              selectedModes={filterState.selectedModes}
              onModeToggle={handleModeToggle}
              onClearAll={() => {
                clearFilters();
                setSearchQuery('');
              }}
              horizontal={true}
            />
          </View>
        )}

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <View style={styles.filterSummary}>
            <Text style={styles.filterSummaryText}>
              {filterState.selectedDistricts.length} ilçe, {' '}
              {Object.values(filterState.selectedModes).filter(Boolean).length} atmosfer seçildi
            </Text>
          </View>
        )}

        {/* Section Title */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {searchQuery.length > 2 
              ? `"${searchQuery}" için sonuçlar`
              : hasActiveFilters 
                ? 'Filtreli Sonuçlar'
                : userLocation && nearbyPlaces.length > 0
                  ? 'Yakınınızdaki Mekanlar'
                  : 'Öne Çıkan Mekanlar'
            }
          </Text>
          {displayPlaces.length > 0 && (
            <Text style={styles.sectionCount}>
              {displayPlaces.length} mekan
            </Text>
          )}
        </View>

        {/* Place List */}
        <PlaceList
          places={displayPlaces}
          loading={isLoading}
          error={featuredError}
          onPlacePress={handlePlacePress}
          onRefresh={onRefresh}
          showDistance={userLocation !== null}
          userLocation={userLocation || undefined}
          variant="default"
          emptyMessage={
            searchQuery.length > 2 
              ? `"${searchQuery}" için sonuç bulunamadı`
              : hasActiveFilters
                ? 'Seçtiğiniz filtrelere uygun mekan bulunamadı'
                : 'Henüz mekan bulunamadı'
          }
        />

        {/* Footer Space */}
        <View style={styles.footerSpace} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: THEME_COLORS.primary,
    paddingHorizontal: DESIGN_TOKENS.spacing.md,
    paddingTop: DESIGN_TOKENS.spacing.lg,
    paddingBottom: DESIGN_TOKENS.spacing.md,
    alignItems: 'center',
  },
  headerTitle: {
    ...TYPOGRAPHY.h2,
    color: THEME_COLORS.surface,
    fontWeight: '900',
    letterSpacing: 2,
  },
  headerSubtitle: {
    ...TYPOGRAPHY.body,
    color: THEME_COLORS.surface + 'DD',
    marginTop: DESIGN_TOKENS.spacing.xs / 2,
  },
  section: {
    marginVertical: DESIGN_TOKENS.spacing.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: DESIGN_TOKENS.spacing.md,
    marginTop: DESIGN_TOKENS.spacing.lg,
    marginBottom: DESIGN_TOKENS.spacing.sm,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h5,
    color: THEME_COLORS.textPrimary,
    flex: 1,
  },
  sectionCount: {
    ...TYPOGRAPHY.caption,
    color: THEME_COLORS.textSecondary,
    backgroundColor: THEME_COLORS.primary + '10',
    paddingHorizontal: DESIGN_TOKENS.spacing.sm,
    paddingVertical: DESIGN_TOKENS.spacing.xs / 2,
    borderRadius: 12,
  },
  filterSummary: {
    backgroundColor: THEME_COLORS.primary + '10',
    marginHorizontal: DESIGN_TOKENS.spacing.md,
    paddingHorizontal: DESIGN_TOKENS.spacing.md,
    paddingVertical: DESIGN_TOKENS.spacing.sm,
    borderRadius: DESIGN_TOKENS.borderRadius.input,
    borderLeftWidth: 3,
    borderLeftColor: THEME_COLORS.primary,
  },
  filterSummaryText: {
    ...TYPOGRAPHY.labelSmall,
    color: THEME_COLORS.primary,
    fontWeight: '600',
  },
  footerSpace: {
    height: DESIGN_TOKENS.spacing.xl * 2,
  },
});