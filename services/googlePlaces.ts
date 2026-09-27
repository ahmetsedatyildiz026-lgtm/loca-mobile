// LOCA - Google Places API Service
import { GooglePlaceData } from '../types';

// Google Places API yapılandırması
const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY || 'your_google_api_key';
const PLACES_API_BASE = 'https://maps.googleapis.com/maps/api/place';

export class GooglePlacesService {
  
  /**
   * Place ID ile detaylı mekan bilgisi getir
   */
  static async getPlaceDetails(placeId: string): Promise<GooglePlaceData | null> {
    try {
      const fields = [
        'place_id',
        'name', 
        'formatted_address',
        'geometry',
        'rating',
        'user_ratings_total',
        'price_level',
        'opening_hours',
        'photos',
        'formatted_phone_number',
        'website',
        'types'
      ].join(',');

      const url = `${PLACES_API_BASE}/details/json?place_id=${placeId}&fields=${fields}&key=${GOOGLE_API_KEY}&language=tr`;
      
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === 'OK' && data.result) {
        return data.result as GooglePlaceData;
      }

      console.warn('Google Places API error:', data.status, data.error_message);
      return null;
    } catch (error) {
      console.error('getPlaceDetails error:', error);
      return null;
    }
  }

  /**
   * Yakındaki mekanları ara (text search)
   */
  static async searchPlaces(
    query: string, 
    location?: { lat: number; lng: number }, 
    radius: number = 5000
  ): Promise<GooglePlaceData[]> {
    try {
      let url = `${PLACES_API_BASE}/textsearch/json?query=${encodeURIComponent(query)}&key=${GOOGLE_API_KEY}&language=tr`;

      if (location) {
        url += `&location=${location.lat},${location.lng}&radius=${radius}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.status === 'OK' && data.results) {
        return data.results as GooglePlaceData[];
      }

      console.warn('Google Places search error:', data.status, data.error_message);
      return [];
    } catch (error) {
      console.error('searchPlaces error:', error);
      return [];
    }
  }

  /**
   * Nearby search - koordinatlara göre yakın mekanlar
   */
  static async getNearbyPlaces(
    location: { lat: number; lng: number },
    radius: number = 2000,
    type: string = 'restaurant|cafe|bar'
  ): Promise<GooglePlaceData[]> {
    try {
      const url = `${PLACES_API_BASE}/nearbysearch/json?location=${location.lat},${location.lng}&radius=${radius}&type=${type}&key=${GOOGLE_API_KEY}&language=tr`;
      
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === 'OK' && data.results) {
        return data.results as GooglePlaceData[];
      }

      console.warn('Google Nearby search error:', data.status, data.error_message);
      return [];
    } catch (error) {
      console.error('getNearbyPlaces error:', error);
      return [];
    }
  }

  /**
   * Photo URL oluştur
   */
  static getPhotoUrl(photoReference: string, maxWidth: number = 400): string {
    return `${PLACES_API_BASE}/photo?maxwidth=${maxWidth}&photoreference=${photoReference}&key=${GOOGLE_API_KEY}`;
  }

  /**
   * İstanbul sınırları içinde mi kontrol et
   */
  static isInIstanbul(lat: number, lng: number): boolean {
    // İstanbul'un yaklaşık koordinat sınırları
    const istanbulBounds = {
      north: 41.322,
      south: 40.813,
      east: 29.361,
      west: 27.872
    };

    return (
      lat >= istanbulBounds.south &&
      lat <= istanbulBounds.north &&
      lng >= istanbulBounds.west &&
      lng <= istanbulBounds.east
    );
  }

  /**
   * İstanbul'daki popüler kategorilere göre ara
   */
  static async searchIstanbulPlaces(
    category: 'restaurant' | 'cafe' | 'bar' | 'night_club' | 'shopping_mall',
    district?: string
  ): Promise<GooglePlaceData[]> {
    try {
      let query = `${category} İstanbul`;
      if (district) {
        query += ` ${district}`;
      }

      // İstanbul merkezi koordinatları
      const istanbulCenter = { lat: 41.0082, lng: 28.9784 };

      return await this.searchPlaces(query, istanbulCenter, 25000); // 25km radius
    } catch (error) {
      console.error('searchIstanbulPlaces error:', error);
      return [];
    }
  }
}