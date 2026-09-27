// LOCA - Mekan Listesi Komponenti
import React, { useState, useCallback } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { PlaceCard } from './PlaceCard';
import { EnrichedPlace, THEME_COLORS, DESIGN_TOKENS } from '../types';

interface PlaceListProps {
  places: EnrichedPlace[];
  loading?: boolean;
  error?: string | null;
  onPlacePress: (place: EnrichedPlace) => void;
  onRefresh?: () => void;
  showDistance?: boolean;
  userLocation?: { lat: number; lng: number };
  emptyMessage?: string;
  variant?: 'default' | 'featured' | 'compact';
  horizontal?: boolean;
  showLoadMore?: boolean;
  onLoadMore?: () => void;
  loadingMore?: boolean;
}

export const PlaceList: React.FC<PlaceListProps> = ({
  places,
  loading = false,
  error,
  onPlacePress,
  onRefresh,
  showDistance = false,
  userLocation,
  emptyMessage = "Henüz mekan bulunamadı",
  variant = 'default',
  horizontal = false,
  showLoadMore = false,
  onLoadMore,
  loadingMore = false,
}) => {
  const [refreshing, setRefreshing] = useState(false);

  // Mesafe hesaplama
  const calculateDistance = useCallback((place: EnrichedPlace): number | undefined => {
    if (!showDistance || !userLocation || !place.coordinates) {
      return undefined;
    }

    const R = 6371; // Earth radius in km
    const dLat = (place.coordinates.lat - userLocation.lat) * Math.PI / 180;
    const dLng = (place.coordinates.lng - userLocation.lng) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(userLocation.lat * Math.PI / 180) * Math.cos(place.coordinates.lat * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }, [showDistance, userLocation]);

  // Pull to refresh handler
  const handleRefresh = useCallback(async () => {
    if (!onRefresh) return;
    
    setRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setRefreshing(false);
    }
  }, [onRefresh]);

  // Load more handler
  const handleLoadMore = useCallback(() => {
    if (!loadingMore && onLoadMore) {
      onLoadMore();
    }
  }, [loadingMore, onLoadMore]);

  // Render single place item
  const renderPlaceItem = useCallback(({ item, index }: { item: EnrichedPlace; index: number }) => {
    const distance = calculateDistance(item);
    
    return (
      <View style={[
        styles.itemContainer,
        horizontal && styles.horizontalItem,
        index === 0 && horizontal && styles.firstHorizontalItem,
        index === places.length - 1 && horizontal && styles.lastHorizontalItem
      ]}>
        <PlaceCard
          place={item}
          onPress={onPlacePress}
          showDistance={showDistance}
          distance={distance}
          variant={variant}
        />
      </View>
    );
  }, [calculateDistance, onPlacePress, showDistance, variant, horizontal, places.length]);

  // Loading footer component
  const renderFooter = useCallback(() => {
    if (!showLoadMore || !loadingMore) return null;

    return (
      <View style={styles.loadingFooter}>
        <ActivityIndicator size="small" color={THEME_COLORS.primary} />
        <Text style={styles.loadingText}>Daha fazla mekan yükleniyor...</Text>
      </View>
    );
  }, [showLoadMore, loadingMore]);

  // Empty state component
  const renderEmptyComponent = useCallback(() => {
    if (loading) return null;

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🔍</Text>
        <Text style={styles.emptyTitle}>
          {error ? 'Bir hata oluştu' : 'Mekan bulunamadı'}
        </Text>
        <Text style={styles.emptyMessage}>
          {error || emptyMessage}
        </Text>
        {error && onRefresh && (
          <TouchableOpacity style={styles.retryButton} onPress={onRefresh}>
            <Text style={styles.retryButtonText}>Tekrar Dene</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }, [loading, error, emptyMessage, onRefresh]);

  // Loading component
  if (loading && places.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={THEME_COLORS.primary} />
        <Text style={styles.loadingText}>Mekanlar yükleniyor...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={places}
      renderItem={renderPlaceItem}
      keyExtractor={(item, index) => item.id || index.toString()}
      horizontal={horizontal}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={!horizontal}
      contentContainerStyle={[
        styles.listContainer,
        horizontal && styles.horizontalListContainer,
        places.length === 0 && styles.emptyListContainer
      ]}
      style={[styles.list, horizontal && styles.horizontalList]}
      
      // Pull to refresh
      refreshControl={onRefresh && !horizontal ? (
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          colors={[THEME_COLORS.primary]}
          tintColor={THEME_COLORS.primary}
          title="Yenileniyor..."
          titleColor={THEME_COLORS.textSecondary}
        />
      ) : undefined}
      
      // Infinite scroll
      onEndReached={showLoadMore && !horizontal ? handleLoadMore : undefined}
      onEndReachedThreshold={0.1}
      ListFooterComponent={renderFooter}
      
      // Empty state
      ListEmptyComponent={renderEmptyComponent}
      
      // Performance optimization
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      windowSize={10}
      initialNumToRender={5}
      getItemLayout={horizontal ? undefined : (data, index) => ({
        length: variant === 'compact' ? 180 : 320,
        offset: (variant === 'compact' ? 180 : 320) * index,
        index,
      })}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: THEME_COLORS.background,
  },
  horizontalList: {
    flexGrow: 0,
  },
  listContainer: {
    paddingBottom: DESIGN_TOKENS.spacing.xl,
  },
  horizontalListContainer: {
    paddingHorizontal: DESIGN_TOKENS.spacing.sm,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  itemContainer: {
    // Default vertical styling applied in PlaceCard
  },
  horizontalItem: {
    width: 280,
    marginHorizontal: DESIGN_TOKENS.spacing.xs,
  },
  firstHorizontalItem: {
    marginLeft: DESIGN_TOKENS.spacing.md,
  },
  lastHorizontalItem: {
    marginRight: DESIGN_TOKENS.spacing.md,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME_COLORS.background,
    paddingVertical: DESIGN_TOKENS.spacing.xl,
  },
  loadingText: {
    marginTop: DESIGN_TOKENS.spacing.md,
    fontSize: 16,
    color: THEME_COLORS.textSecondary,
    textAlign: 'center',
  },
  loadingFooter: {
    padding: DESIGN_TOKENS.spacing.lg,
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: DESIGN_TOKENS.spacing.xl,
    paddingVertical: DESIGN_TOKENS.spacing.xl * 2,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: DESIGN_TOKENS.spacing.lg,
    opacity: 0.3,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: THEME_COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: DESIGN_TOKENS.spacing.sm,
  },
  emptyMessage: {
    fontSize: 16,
    color: THEME_COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: DESIGN_TOKENS.spacing.lg,
  },
  retryButton: {
    backgroundColor: THEME_COLORS.primary,
    paddingHorizontal: DESIGN_TOKENS.spacing.lg,
    paddingVertical: DESIGN_TOKENS.spacing.md,
    borderRadius: DESIGN_TOKENS.borderRadius.button,
    ...DESIGN_TOKENS.shadow,
  },
  retryButtonText: {
    color: THEME_COLORS.surface,
    fontSize: 16,
    fontWeight: '600',
  },
});