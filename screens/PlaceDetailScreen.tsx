// LOCA - Mekan Detay Ekranı
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  Share,
  Dimensions,
} from 'react-native';
import { usePlaceDetail } from '../hooks/usePlaces';
import {
  EnrichedPlace,
  NoiseLevel,
  ValetStatus,
  PriceTier,
  THEME_COLORS,
  DESIGN_TOKENS
} from '../types';
import {
  LAYOUT_STYLES,
  TYPOGRAPHY,
  BUTTON_STYLES,
  GLOBAL_STYLES
} from '../styles';

interface PlaceDetailScreenProps {
  route: {
    params: {
      placeId: string;
    };
  };
  navigation: any;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const PlaceDetailScreen: React.FC<PlaceDetailScreenProps> = ({
  route,
  navigation
}) => {
  const { placeId } = route.params;
  const { place, loading, error, refetch } = usePlaceDetail(placeId);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    navigation.setOptions({
      title: place?.name || 'Mekan Detayı',
      headerStyle: {
        backgroundColor: THEME_COLORS.primary,
      },
      headerTintColor: THEME_COLORS.surface,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    });
  }, [place, navigation]);

  // Helper Functions
  const getNoiseLabel = (level: NoiseLevel): string => {
    switch (level) {
      case NoiseLevel.QUIET: return 'Sessiz 🔇';
      case NoiseLevel.MODERATE: return 'Orta 🔊';
      case NoiseLevel.LOUD: return 'Canlı 📢';
      default: return 'Bilinmiyor';
    }
  };

  const getValetLabel = (status: ValetStatus): string => {
    switch (status) {
      case ValetStatus.AVAILABLE: return 'Vale Var 🚗';
      case ValetStatus.EASY_PARKING: return 'Kolay Park 🅿️';
      case ValetStatus.HARD_PARKING: return 'Zor Park 🚫';
      default: return 'Bilinmiyor';
    }
  };

  const getPriceLabel = (tier: PriceTier): { text: string; color: string; description: string } => {
    switch (tier) {
      case PriceTier.BUDGET:
        return { text: '$', color: '#4CAF50', description: 'Ekonomik' };
      case PriceTier.MODERATE:
        return { text: '$$', color: '#FF9800', description: 'Orta' };
      case PriceTier.EXPENSIVE:
        return { text: '$$$', color: '#F44336', description: 'Pahalı' };
      case PriceTier.VIP:
        return { text: '$$$$', color: '#9C27B0', description: 'Lüks' };
      default:
        return { text: '$$', color: THEME_COLORS.textSecondary, description: 'Bilinmiyor' };
    }
  };

  // Action Handlers
  const handleCall = () => {
    if (place?.phone_number) {
      Linking.openURL(`tel:${place.phone_number}`);
    }
  };

  const handleDirections = () => {
    if (place?.coordinates) {
      const url = `https://maps.google.com/?q=${place.coordinates.lat},${place.coordinates.lng}`;
      Linking.openURL(url);
    }
  };

  const handleShare = async () => {
    if (place) {
      try {
        await Share.share({
          message: `${place.name} - LOCA'da keşfettim!\n${place.formatted_address}`,
          title: place.name,
        });
      } catch (error) {
        console.error('Share error:', error);
      }
    }
  };

  const handleWebsite = () => {
    if (place?.google_data?.website) {
      Linking.openURL(place.google_data.website);
    }
  };

  if (loading) {
    return (
      <View style={[LAYOUT_STYLES.container, LAYOUT_STYLES.center]}>
        <Text style={TYPOGRAPHY.body}>Mekan detayları yükleniyor...</Text>
      </View>
    );
  }

  if (error || !place) {
    return (
      <View style={[LAYOUT_STYLES.container, LAYOUT_STYLES.center]}>
        <Text style={[TYPOGRAPHY.h6, { color: THEME_COLORS.error }]}>
          Mekan bulunamadı
        </Text>
        <Text style={[TYPOGRAPHY.body, { textAlign: 'center', marginTop: 8 }]}>
          {error || 'Bu mekanın detayları yüklenemedi.'}
        </Text>
        <TouchableOpacity
          style={[BUTTON_STYLES.baseButton, BUTTON_STYLES.primaryButton, { marginTop: 16 }]}
          onPress={refetch}
        >
          <Text style={BUTTON_STYLES.primaryButtonText}>Tekrar Dene</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const priceInfo = getPriceLabel(place.price_tier);
  const hasPhotos = place.photos && place.photos.length > 0;

  return (
    <ScrollView style={LAYOUT_STYLES.container} showsVerticalScrollIndicator={false}>
      {/* Hero Image Section */}
      {hasPhotos && (
        <View style={styles.imageSection}>
          <Image
            source={{ uri: place.photos![selectedImageIndex] }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          
          {/* Image Indicators */}
          {place.photos!.length > 1 && (
            <View style={styles.imageIndicators}>
              {place.photos!.map((_, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.indicator,
                    selectedImageIndex === index && styles.indicatorActive
                  ]}
                  onPress={() => setSelectedImageIndex(index)}
                />
              ))}
            </View>
          )}

          {/* Featured Badge */}
          {place.is_featured && (
            <View style={styles.featuredBadge}>
              <Text style={styles.featuredBadgeText}>✨ VIP</Text>
            </View>
          )}

          {/* Status Badge */}
          {place.is_open_now !== undefined && (
            <View style={[
              styles.statusBadge,
              place.is_open_now ? styles.openBadge : styles.closedBadge
            ]}>
              <View style={[
                styles.statusDot,
                place.is_open_now ? styles.openDot : styles.closedDot
              ]} />
              <Text style={styles.statusText}>
                {place.is_open_now ? 'Açık' : 'Kapalı'}
              </Text>
            </View>
          )}
        </View>
      )}

      {/* Content */}
      <View style={styles.content}>
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.placeName}>{place.name}</Text>
          
          <View style={styles.ratingPriceRow}>
            {place.current_rating && (
              <View style={styles.rating}>
                <Text style={styles.ratingIcon}>⭐</Text>
                <Text style={styles.ratingText}>
                  {place.current_rating.toFixed(1)}
                </Text>
              </View>
            )}
            
            <View style={styles.priceContainer}>
              <Text style={[styles.priceText, { color: priceInfo.color }]}>
                {priceInfo.text}
              </Text>
              <Text style={styles.priceDescription}>
                {priceInfo.description}
              </Text>
            </View>
          </View>
        </View>

        {/* Location */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📍 Konum</Text>
          <Text style={styles.locationText}>
            {place.district}
            {place.neighborhood && `, ${place.neighborhood}`}
          </Text>
          {place.formatted_address && (
            <Text style={styles.addressText}>{place.formatted_address}</Text>
          )}
        </View>

        {/* Atmosphere Tags */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✨ Atmosfer</Text>
          <View style={styles.tagsContainer}>
            {place.is_date && <View style={styles.tag}><Text style={styles.tagText}>💕 Romantik</Text></View>}
            {place.is_family && <View style={styles.tag}><Text style={styles.tagText}>👨‍👩‍👧‍👦 Aile</Text></View>}
            {place.has_alcohol && <View style={styles.tag}><Text style={styles.tagText}>🍷 İçkili</Text></View>}
            {place.is_alcohol_free && <View style={styles.tag}><Text style={styles.tagText}>☕ İçkisiz</Text></View>}
            {place.is_work_friendly && <View style={styles.tag}><Text style={styles.tagText}>💻 Çalışma</Text></View>}
            {place.has_outdoor && <View style={styles.tag}><Text style={styles.tagText}>🌿 Teras</Text></View>}
          </View>
        </View>

        {/* Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ℹ️ Detaylar</Text>
          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Gürültü Seviyesi</Text>
              <Text style={styles.detailValue}>{getNoiseLabel(place.noise_level)}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Park Durumu</Text>
              <Text style={styles.detailValue}>{getValetLabel(place.valet_status)}</Text>
            </View>
          </View>
        </View>

        {/* Working Hours */}
        {place.google_data?.opening_hours?.weekday_text && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🕐 Çalışma Saatleri</Text>
            {place.google_data.opening_hours.weekday_text.map((day, index) => (
              <Text key={index} style={styles.workingHoursText}>
                {day}
              </Text>
            ))}
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          {place.phone_number && (
            <TouchableOpacity
              style={[BUTTON_STYLES.baseButton, BUTTON_STYLES.primaryButton, styles.actionButton]}
              onPress={handleCall}
            >
              <Text style={BUTTON_STYLES.primaryButtonText}>📞 Ara</Text>
            </TouchableOpacity>
          )}

          {place.coordinates && (
            <TouchableOpacity
              style={[BUTTON_STYLES.baseButton, BUTTON_STYLES.secondaryButton, styles.actionButton]}
              onPress={handleDirections}
            >
              <Text style={BUTTON_STYLES.secondaryButtonText}>🧭 Yol Tarifi</Text>
            </TouchableOpacity>
          )}

          {place.google_data?.website && (
            <TouchableOpacity
              style={[BUTTON_STYLES.baseButton, BUTTON_STYLES.tertiaryButton, styles.actionButton]}
              onPress={handleWebsite}
            >
              <Text style={BUTTON_STYLES.tertiaryButtonText}>🌐 Website</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[BUTTON_STYLES.baseButton, BUTTON_STYLES.ghostButton, styles.actionButton]}
            onPress={handleShare}
          >
            <Text style={BUTTON_STYLES.ghostButtonText}>📤 Paylaş</Text>
          </TouchableOpacity>
        </View>

        {/* Footer Space */}
        <View style={styles.footerSpace} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageSection: {
    position: 'relative',
  },
  heroImage: {
    width: SCREEN_WIDTH,
    height: 300,
  },
  imageIndicators: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  indicatorActive: {
    backgroundColor: THEME_COLORS.surface,
  },
  featuredBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: THEME_COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  featuredBadgeText: {
    color: THEME_COLORS.surface,
    fontSize: 12,
    fontWeight: 'bold',
  },
  statusBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.95)',
  },
  openBadge: {
    backgroundColor: 'rgba(76, 175, 80, 0.95)',
  },
  closedBadge: {
    backgroundColor: 'rgba(244, 67, 54, 0.95)',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  openDot: {
    backgroundColor: THEME_COLORS.surface,
  },
  closedDot: {
    backgroundColor: THEME_COLORS.surface,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME_COLORS.surface,
  },
  content: {
    padding: DESIGN_TOKENS.spacing.md,
  },
  titleSection: {
    marginBottom: DESIGN_TOKENS.spacing.lg,
  },
  placeName: {
    ...TYPOGRAPHY.h3,
    marginBottom: DESIGN_TOKENS.spacing.sm,
  },
  ratingPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  ratingText: {
    ...TYPOGRAPHY.labelLarge,
    fontWeight: '600',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  priceDescription: {
    ...TYPOGRAPHY.caption,
    color: THEME_COLORS.textSecondary,
  },
  section: {
    marginBottom: DESIGN_TOKENS.spacing.lg,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h6,
    marginBottom: DESIGN_TOKENS.spacing.sm,
  },
  locationText: {
    ...TYPOGRAPHY.labelLarge,
    color: THEME_COLORS.primary,
    marginBottom: DESIGN_TOKENS.spacing.xs,
  },
  addressText: {
    ...TYPOGRAPHY.body,
    color: THEME_COLORS.textSecondary,
    lineHeight: 22,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: DESIGN_TOKENS.spacing.sm,
  },
  tag: {
    backgroundColor: THEME_COLORS.primary + '15',
    paddingHorizontal: DESIGN_TOKENS.spacing.sm,
    paddingVertical: DESIGN_TOKENS.spacing.xs,
    borderRadius: 20,
  },
  tagText: {
    ...TYPOGRAPHY.labelSmall,
    color: THEME_COLORS.primary,
    fontWeight: '600',
  },
  detailsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flex: 1,
    marginRight: DESIGN_TOKENS.spacing.sm,
  },
  detailLabel: {
    ...TYPOGRAPHY.caption,
    color: THEME_COLORS.textSecondary,
    marginBottom: DESIGN_TOKENS.spacing.xs / 2,
  },
  detailValue: {
    ...TYPOGRAPHY.label,
    color: THEME_COLORS.textPrimary,
  },
  workingHoursText: {
    ...TYPOGRAPHY.body,
    color: THEME_COLORS.textSecondary,
    marginBottom: DESIGN_TOKENS.spacing.xs,
  },
  actionsContainer: {
    gap: DESIGN_TOKENS.spacing.sm,
  },
  actionButton: {
    marginBottom: DESIGN_TOKENS.spacing.sm,
  },
  footerSpace: {
    height: DESIGN_TOKENS.spacing.xl,
  },
});