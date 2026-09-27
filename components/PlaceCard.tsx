// LOCA - Premium Mekan Kartı Komponenti
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { 
  EnrichedPlace, 
  NoiseLevel, 
  ValetStatus, 
  PriceTier, 
  THEME_COLORS, 
  DESIGN_TOKENS 
} from '../types';

interface PlaceCardProps {
  place: EnrichedPlace;
  onPress: (place: EnrichedPlace) => void;
  showDistance?: boolean;
  distance?: number;
  variant?: 'default' | 'featured' | 'compact';
}

interface Badge {
  id: string;
  label: string;
  icon: string;
  color: string;
  bgColor: string;
}

const { width } = Dimensions.get('window');
const cardWidth = width - (DESIGN_TOKENS.spacing.md * 2);

export const PlaceCard: React.FC<PlaceCardProps> = ({
  place,
  onPress,
  showDistance,
  distance,
  variant = 'default'
}) => {

  // ROZET SİSTEMİ
  const getBadges = (): Badge[] => {
    const badges: Badge[] = [];

    // Gürültü seviyesi rozeti
    if (place.noise_level === NoiseLevel.QUIET) {
      badges.push({
        id: 'quiet',
        label: 'Sessiz',
        icon: '🔇',
        color: '#4CAF50',
        bgColor: '#4CAF50'
      });
    } else if (place.noise_level === NoiseLevel.LOUD) {
      badges.push({
        id: 'loud',
        label: 'Canlı',
        icon: '🔊',
        color: '#FF9800',
        bgColor: '#FF9800'
      });
    }

    // Alkol rozeti
    if (place.has_alcohol) {
      badges.push({
        id: 'alcohol',
        label: 'İçkili',
        icon: '🍷',
        color: '#9C27B0',
        bgColor: '#9C27B0'
      });
    }

    if (place.is_alcohol_free) {
      badges.push({
        id: 'alcohol_free',
        label: 'İçkisiz',
        icon: '☕',
        color: '#FF9800',
        bgColor: '#FF9800'
      });
    }

    // Vale rozeti
    if (place.valet_status === ValetStatus.AVAILABLE) {
      badges.push({
        id: 'valet',
        label: 'Vale',
        icon: '🚗',
        color: '#2196F3',
        bgColor: '#2196F3'
      });
    }

    // Date rozeti
    if (place.is_date) {
      badges.push({
        id: 'date',
        label: 'Romantik',
        icon: '💕',
        color: '#E91E63',
        bgColor: '#E91E63'
      });
    }

    // Aile rozeti
    if (place.is_family) {
      badges.push({
        id: 'family',
        label: 'Aile',
        icon: '👨‍👩‍👧‍👦',
        color: '#4CAF50',
        bgColor: '#4CAF50'
      });
    }

    // Çalışma rozeti
    if (place.is_work_friendly) {
      badges.push({
        id: 'work',
        label: 'Çalışma',
        icon: '💻',
        color: '#2196F3',
        bgColor: '#2196F3'
      });
    }

    // Açık alan rozeti
    if (place.has_outdoor) {
      badges.push({
        id: 'outdoor',
        label: 'Teras',
        icon: '🌿',
        color: '#8BC34A',
        bgColor: '#8BC34A'
      });
    }

    return badges.slice(0, 4); // Maksimum 4 rozet göster
  };

  // FİYAT GÖSTERGESI
  const getPriceDisplay = () => {
    switch (place.price_tier) {
      case PriceTier.BUDGET:
        return { text: '$', color: '#4CAF50' };
      case PriceTier.MODERATE:
        return { text: '$$', color: '#FF9800' };
      case PriceTier.EXPENSIVE:
        return { text: '$$$', color: '#F44336' };
      case PriceTier.VIP:
        return { text: '$$$$', color: '#9C27B0' };
      default:
        return { text: '$$', color: THEME_COLORS.textSecondary };
    }
  };

  const badges = getBadges();
  const priceDisplay = getPriceDisplay();
  const hasImage = place.photos && place.photos.length > 0;
  const isCompact = variant === 'compact';
  const isFeatured = variant === 'featured' || place.is_featured;

  return (
    <TouchableOpacity
      style={[
        styles.card,
        isFeatured && styles.featuredCard,
        isCompact && styles.compactCard
      ]}
      onPress={() => onPress(place)}
      activeOpacity={0.9}
    >
      {/* ÖNE ÇIKAN IŞIĞI */}
      {isFeatured && <View style={styles.featuredGlow} />}

      {/* FOTOĞRAF ALANI */}
      <View style={[styles.imageContainer, isCompact && styles.compactImageContainer]}>
        {hasImage ? (
          <Image
            source={{ uri: place.photos![0] }}
            style={styles.placeImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderIcon}>🏪</Text>
          </View>
        )}

        {/* ÖNE ÇIKAN ROZETİ */}
        {isFeatured && (
          <View style={styles.featuredBadge}>
            <Text style={styles.featuredBadgeText}>✨ VIP</Text>
          </View>
        )}

        {/* MESAFE */}
        {showDistance && distance !== undefined && (
          <View style={styles.distanceBadge}>
            <Text style={styles.distanceText}>{distance.toFixed(1)} km</Text>
          </View>
        )}

        {/* AÇIK/KAPALI DURUMU */}
        {place.is_open_now !== undefined && (
          <View style={[
            styles.statusBadge,
            place.is_open_now ? styles.openBadge : styles.closedBadge
          ]}>
            <View style={[
              styles.statusDot,
              place.is_open_now ? styles.openDot : styles.closedDot
            ]} />
            <Text style={[
              styles.statusText,
              place.is_open_now ? styles.openText : styles.closedText
            ]}>
              {place.is_open_now ? 'Açık' : 'Kapalı'}
            </Text>
          </View>
        )}
      </View>

      {/* İÇERİK ALANI */}
      <View style={[styles.content, isCompact && styles.compactContent]}>
        {/* BAŞLIK VE PUAN */}
        <View style={styles.header}>
          <Text style={styles.placeName} numberOfLines={isCompact ? 1 : 2}>
            {place.name}
          </Text>
          
          <View style={styles.ratingContainer}>
            {place.current_rating && (
              <>
                <Text style={styles.ratingIcon}>⭐</Text>
                <Text style={styles.ratingText}>
                  {place.current_rating.toFixed(1)}
                </Text>
              </>
            )}
          </View>
        </View>

        {/* KONUM VE FİYAT */}
        <View style={styles.location}>
          <Text style={styles.locationText} numberOfLines={1}>
            📍 {place.district}
            {place.neighborhood && `, ${place.neighborhood}`}
          </Text>
          <Text style={[styles.priceText, { color: priceDisplay.color }]}>
            {priceDisplay.text}
          </Text>
        </View>

        {/* ROZETLERDİR */}
        {!isCompact && badges.length > 0 && (
          <View style={styles.badgesContainer}>
            {badges.map((badge, index) => (
              <View key={badge.id} style={[styles.badge, { backgroundColor: badge.bgColor + '15' }]}>
                <Text style={styles.badgeIcon}>{badge.icon}</Text>
                <Text style={[styles.badgeLabel, { color: badge.color }]}>
                  {badge.label}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* KOMPAKT ROZET - Sadece ilk 2 */}
        {isCompact && badges.length > 0 && (
          <View style={styles.compactBadges}>
            {badges.slice(0, 2).map((badge) => (
              <Text key={badge.id} style={styles.compactBadgeIcon}>
                {badge.icon}
              </Text>
            ))}
            {badges.length > 2 && (
              <Text style={styles.moreBadges}>+{badges.length - 2}</Text>
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: THEME_COLORS.surface,
    borderRadius: DESIGN_TOKENS.borderRadius.card,
    marginHorizontal: DESIGN_TOKENS.spacing.md,
    marginBottom: DESIGN_TOKENS.spacing.md,
    overflow: 'hidden',
    ...DESIGN_TOKENS.shadow,
    width: cardWidth,
    position: 'relative',
  },
  featuredCard: {
    borderWidth: 2,
    borderColor: THEME_COLORS.primary,
    ...{
      elevation: 12,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 24,
    },
  },
  compactCard: {
    marginBottom: DESIGN_TOKENS.spacing.sm,
  },
  featuredGlow: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    backgroundColor: THEME_COLORS.primary + '20',
    borderRadius: DESIGN_TOKENS.borderRadius.card + 2,
    zIndex: -1,
  },
  imageContainer: {
    height: 200,
    position: 'relative',
  },
  compactImageContainer: {
    height: 140,
  },
  placeImage: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: THEME_COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderIcon: {
    fontSize: 48,
    opacity: 0.3,
  },
  featuredBadge: {
    position: 'absolute',
    top: DESIGN_TOKENS.spacing.sm,
    left: DESIGN_TOKENS.spacing.sm,
    backgroundColor: THEME_COLORS.primary,
    paddingHorizontal: DESIGN_TOKENS.spacing.sm,
    paddingVertical: DESIGN_TOKENS.spacing.xs,
    borderRadius: 20,
  },
  featuredBadgeText: {
    color: THEME_COLORS.surface,
    fontSize: 12,
    fontWeight: 'bold',
  },
  distanceBadge: {
    position: 'absolute',
    top: DESIGN_TOKENS.spacing.sm,
    right: DESIGN_TOKENS.spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: DESIGN_TOKENS.spacing.sm,
    paddingVertical: DESIGN_TOKENS.spacing.xs,
    borderRadius: 12,
  },
  distanceText: {
    color: THEME_COLORS.surface,
    fontSize: 12,
    fontWeight: '600',
  },
  statusBadge: {
    position: 'absolute',
    bottom: DESIGN_TOKENS.spacing.sm,
    right: DESIGN_TOKENS.spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: DESIGN_TOKENS.spacing.sm,
    paddingVertical: DESIGN_TOKENS.spacing.xs,
    borderRadius: 12,
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
    fontSize: 11,
    fontWeight: '600',
  },
  openText: {
    color: THEME_COLORS.surface,
  },
  closedText: {
    color: THEME_COLORS.surface,
  },
  content: {
    padding: DESIGN_TOKENS.spacing.md,
  },
  compactContent: {
    padding: DESIGN_TOKENS.spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: DESIGN_TOKENS.spacing.xs,
  },
  placeName: {
    fontSize: 18,
    fontWeight: '700',
    color: THEME_COLORS.textPrimary,
    flex: 1,
    marginRight: DESIGN_TOKENS.spacing.sm,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingIcon: {
    fontSize: 14,
    marginRight: 2,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME_COLORS.textPrimary,
  },
  location: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: DESIGN_TOKENS.spacing.sm,
  },
  locationText: {
    fontSize: 14,
    color: THEME_COLORS.textSecondary,
    flex: 1,
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: DESIGN_TOKENS.spacing.sm,
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: DESIGN_TOKENS.spacing.xs,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: DESIGN_TOKENS.spacing.sm,
    paddingVertical: DESIGN_TOKENS.spacing.xs / 2,
    borderRadius: 12,
  },
  badgeIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  badgeLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  compactBadges: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: DESIGN_TOKENS.spacing.xs,
  },
  compactBadgeIcon: {
    fontSize: 16,
    marginRight: DESIGN_TOKENS.spacing.xs,
  },
  moreBadges: {
    fontSize: 12,
    color: THEME_COLORS.textSecondary,
    fontWeight: '600',
  },
});