// LOCA - Hybrid Service (Google Places + LOCA Database)
// Bu servis Google Places API ile LOCA veritabanını birleştirir

import { LocaDataService } from './supabase';
import { GooglePlacesService } from './googlePlaces';
import {
  LocaPlace,
  EnrichedPlace,
  IstanbulDistrict,
  PlaceSearchParams,
  LocaApiResponse,
  FilterState
} from '../types';

export class LocaHybridService {
  
  /**
   * LOCA mekanını Google verisiyle zenginleştir
   */
  static async enrichPlace(locaPlace: LocaPlace): Promise<EnrichedPlace> {
    try {
      const googleData = await GooglePlacesService.getPlaceDetails(locaPlace.google_place_id);
      
      const enrichedPlace: EnrichedPlace = {
        ...locaPlace,
        google_data: googleData || undefined,
        current_rating: googleData?.rating,
        is_open_now: googleData?.opening_hours?.open_now,
        formatted_address: googleData?.formatted_address,
        phone_number: googleData?.formatted_phone_number,
        photos: googleData?.photos?.map(photo => 
          GooglePlacesService.getPhotoUrl(photo.photo_reference, 800)
        ),
        coordinates: googleData ? {
          lat: googleData.geometry.location.lat,
          lng: googleData.geometry.location.lng
        } : undefined
      };

      return enrichedPlace;
    } catch (error) {
      console.error('enrichPlace error:', error);
      // Hata durumunda Google verisi olmadan geri döndür
      return {
        ...locaPlace
      };
    }
  }

  /**
   * Birden fazla LOCA mekanını paralel olarak zenginleştir
   */
  static async enrichMultiplePlaces(locaPlaces: LocaPlace[]): Promise<EnrichedPlace[]> {
    try {
      const enrichPromises = locaPlaces.map(place => this.enrichPlace(place));
      const enrichedPlaces = await Promise.allSettled(enrichPromises);

      return enrichedPlaces.map((result, index) => {
        if (result.status === 'fulfilled') {
          return result.value;
        } else {
          console.error(`Failed to enrich place ${locaPlaces[index].name}:`, result.reason);
          // Hata durumunda temel veriyi döndür
          return { ...locaPlaces[index] };
        }
      });
    } catch (error) {
      console.error('enrichMultiplePlaces error:', error);
      return locaPlaces.map(place => ({ ...place }));
    }
  }

  /**
   * İlçeye göre zenginleştirilmiş mekanları getir
   */
  static async getEnrichedPlacesByDistrict(district: IstanbulDistrict): Promise<LocaApiResponse<EnrichedPlace[]>> {
    try {
      const locaResponse = await LocaDataService.getPlacesByDistrict(district);
      
      if (!locaResponse.success || !locaResponse.data) {
        return {
          success: false,
          data: [],
          error: locaResponse.error || 'No places found',
          timestamp: new Date().toISOString()
        };
      }

      const enrichedPlaces = await this.enrichMultiplePlaces(locaResponse.data);

      return {
        success: true,
        data: enrichedPlaces,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('getEnrichedPlacesByDistrict error:', error);
      return {
        success: false,
        data: [],
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Filtreye göre zenginleştirilmiş mekanları getir
   */
  static async searchEnrichedPlaces(params: PlaceSearchParams): Promise<LocaApiResponse<EnrichedPlace[]>> {
    try {
      const locaResponse = await LocaDataService.searchPlaces(params);
      
      if (!locaResponse.success || !locaResponse.data) {
        return {
          success: false,
          data: [],
          error: locaResponse.error || 'No places found',
          timestamp: new Date().toISOString()
        };
      }

      const enrichedPlaces = await this.enrichMultiplePlaces(locaResponse.data);

      return {
        success: true,
        data: enrichedPlaces,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('searchEnrichedPlaces error:', error);
      return {
        success: false,
        data: [],
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Tek ID ile zenginleştirilmiş mekan detayı getir
   */
  static async getEnrichedPlaceById(id: string): Promise<LocaApiResponse<EnrichedPlace | null>> {
    try {
      const locaResponse = await LocaDataService.getPlaceById(id);
      
      if (!locaResponse.success || !locaResponse.data) {
        return {
          success: false,
          data: null,
          error: locaResponse.error || 'Place not found',
          timestamp: new Date().toISOString()
        };
      }

      const enrichedPlace = await this.enrichPlace(locaResponse.data);

      return {
        success: true,
        data: enrichedPlace,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('getEnrichedPlaceById error:', error);
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Öne çıkan mekanları zenginleştirilmiş olarak getir
   */
  static async getFeaturedEnrichedPlaces(): Promise<LocaApiResponse<EnrichedPlace[]>> {
    try {
      const locaResponse = await LocaDataService.getFeaturedPlaces();
      
      if (!locaResponse.success || !locaResponse.data) {
        return {
          success: false,
          data: [],
          error: locaResponse.error || 'No featured places found',
          timestamp: new Date().toISOString()
        };
      }

      const enrichedPlaces = await this.enrichMultiplePlaces(locaResponse.data);

      return {
        success: true,
        data: enrichedPlaces,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('getFeaturedEnrichedPlaces error:', error);
      return {
        success: false,
        data: [],
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Yakında olan mekanları bul (koordinat tabanlı)
   */
  static async getNearbyEnrichedPlaces(
    userCoords: { lat: number; lng: number },
    radiusKm: number = 5
  ): Promise<LocaApiResponse<EnrichedPlace[]>> {
    try {
      // Önce tüm LOCA mekanlarını al
      const locaResponse = await LocaDataService.getAllPlaces();
      
      if (!locaResponse.success || !locaResponse.data) {
        return {
          success: false,
          data: [],
          error: locaResponse.error || 'No places found',
          timestamp: new Date().toISOString()
        };
      }

      // Mekanları zenginleştir
      const enrichedPlaces = await this.enrichMultiplePlaces(locaResponse.data);

      // Koordinatı olan mekanları filtrele ve mesafeye göre sırala
      const nearbyPlaces = enrichedPlaces
        .filter(place => place.coordinates)
        .map(place => ({
          ...place,
          distance: this.calculateDistance(
            userCoords.lat, 
            userCoords.lng,
            place.coordinates!.lat,
            place.coordinates!.lng
          )
        }))
        .filter(place => place.distance <= radiusKm)
        .sort((a, b) => a.distance - b.distance);

      return {
        success: true,
        data: nearbyPlaces,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('getNearbyEnrichedPlaces error:', error);
      return {
        success: false,
        data: [],
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Haversine formülü ile mesafe hesapla (km)
   */
  private static calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371; // Dünya yarıçapı (km)
    const dLat = this.deg2rad(lat2 - lat1);
    const dLng = this.deg2rad(lng2 - lng1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  private static deg2rad(deg: number): number {
    return deg * (Math.PI/180);
  }

  /**
   * Filter state'i PlaceSearchParams'a çevir
   */
  static filterStateToSearchParams(filterState: FilterState): PlaceSearchParams {
    return {
      districts: filterState.selectedDistricts.length > 0 ? filterState.selectedDistricts : undefined,
      modes: Object.keys(filterState.selectedModes).length > 0 ? filterState.selectedModes : undefined,
      limit: 50 // Varsayılan limit
    };
  }
}