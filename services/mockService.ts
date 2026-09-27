// LOCA - Mock Service (Development için)
// Production'da gerçek API'lerin yerine kullanılabilir

import { 
  MOCK_PLACES, 
  MOCK_GOOGLE_RESPONSES, 
  getMockPlaceById,
  getMockPlacesByDistrict,
  getMockGoogleResponse
} from '../data';
import {
  LocaPlace,
  EnrichedPlace,
  IstanbulDistrict,
  PlaceSearchParams,
  LocaApiResponse,
  GooglePlaceData
} from '../types';

// Mock delay simülasyonu
const mockDelay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

export class MockLocaService {
  
  /**
   * Tüm mock mekanları getir
   */
  static async getAllPlaces(): Promise<LocaApiResponse<LocaPlace[]>> {
    await mockDelay(300);
    
    return {
      success: true,
      data: MOCK_PLACES,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * ID ile mock mekan getir
   */
  static async getPlaceById(id: string): Promise<LocaApiResponse<LocaPlace | null>> {
    await mockDelay(200);
    
    const place = getMockPlaceById(id);
    
    return {
      success: true,
      data: place || null,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * İlçeye göre mock mekanları getir
   */
  static async getPlacesByDistrict(district: IstanbulDistrict): Promise<LocaApiResponse<LocaPlace[]>> {
    await mockDelay(400);
    
    const places = getMockPlacesByDistrict(district);
    
    return {
      success: true,
      data: places,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Gelişmiş mock arama
   */
  static async searchPlaces(params: PlaceSearchParams): Promise<LocaApiResponse<LocaPlace[]>> {
    await mockDelay(600);
    
    let results = [...MOCK_PLACES];

    // İlçe filtresi
    if (params.districts && params.districts.length > 0) {
      results = results.filter(place => params.districts!.includes(place.district));
    }

    // Mod filtreleri
    if (params.modes) {
      Object.entries(params.modes).forEach(([key, value]) => {
        if (value === true) {
          results = results.filter(place => (place as any)[key] === true);
        }
      });
    }

    // Öne çıkan mekanları başa al
    results.sort((a, b) => {
      if (a.is_featured && !b.is_featured) return -1;
      if (!a.is_featured && b.is_featured) return 1;
      return 0;
    });

    // Limit
    if (params.limit) {
      results = results.slice(0, params.limit);
    }

    return {
      success: true,
      data: results,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Öne çıkan mock mekanları getir
   */
  static async getFeaturedPlaces(): Promise<LocaApiResponse<LocaPlace[]>> {
    await mockDelay(350);
    
    const featured = MOCK_PLACES.filter(place => place.is_featured);
    
    return {
      success: true,
      data: featured,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Mock Google Places verisi getir
   */
  static async getGooglePlaceDetails(placeId: string): Promise<GooglePlaceData | null> {
    await mockDelay(800); // Google API daha yavaş
    
    return getMockGoogleResponse(placeId);
  }

  /**
   * Mock zenginleştirilmiş mekan
   */
  static async getEnrichedPlace(locaPlace: LocaPlace): Promise<EnrichedPlace> {
    const googleData = await this.getGooglePlaceDetails(locaPlace.google_place_id);
    
    const enrichedPlace: EnrichedPlace = {
      ...locaPlace,
      google_data: googleData || undefined,
      current_rating: googleData?.rating,
      is_open_now: googleData?.opening_hours?.open_now,
      formatted_address: googleData?.formatted_address,
      phone_number: googleData?.formatted_phone_number,
      photos: googleData?.photos?.map(photo => 
        `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${photo.photo_reference}&key=MOCK_KEY`
      ),
      coordinates: googleData ? {
        lat: googleData.geometry.location.lat,
        lng: googleData.geometry.location.lng
      } : undefined
    };

    return enrichedPlace;
  }

  /**
   * Birden fazla zenginleştirilmiş mekan
   */
  static async getEnrichedPlaces(locaPlaces: LocaPlace[]): Promise<EnrichedPlace[]> {
    // Paralel işlem simülasyonu
    const enrichPromises = locaPlaces.map(place => this.getEnrichedPlace(place));
    return await Promise.all(enrichPromises);
  }

  /**
   * Rastgele hata simülasyonu (Test için)
   */
  static async getPlacesWithRandomError(): Promise<LocaApiResponse<LocaPlace[]>> {
    await mockDelay(1000);
    
    // %20 olasılıkla hata döndür
    if (Math.random() < 0.2) {
      return {
        success: false,
        data: [],
        error: 'Mock network error - please try again',
        timestamp: new Date().toISOString()
      };
    }
    
    return {
      success: true,
      data: MOCK_PLACES.slice(0, 5),
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Sayfalama simülasyonu
   */
  static async getPlacesPaginated(page: number = 1, limit: number = 10): Promise<LocaApiResponse<{
    places: LocaPlace[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  }>> {
    await mockDelay(500);
    
    const totalItems = MOCK_PLACES.length;
    const totalPages = Math.ceil(totalItems / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const places = MOCK_PLACES.slice(startIndex, endIndex);
    
    return {
      success: true,
      data: {
        places,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        }
      },
      timestamp: new Date().toISOString()
    };
  }

  /**
   * İstatistik mock verisi
   */
  static async getStats(): Promise<LocaApiResponse<{
    totalPlaces: number;
    featuredCount: number;
    districtCount: number;
    averageRating: number;
    topDistricts: { district: string; count: number }[];
  }>> {
    await mockDelay(200);
    
    const districtCounts = MOCK_PLACES.reduce((acc, place) => {
      acc[place.district] = (acc[place.district] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const topDistricts = Object.entries(districtCounts)
      .map(([district, count]) => ({ district, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
    
    return {
      success: true,
      data: {
        totalPlaces: MOCK_PLACES.length,
        featuredCount: MOCK_PLACES.filter(p => p.is_featured).length,
        districtCount: Object.keys(districtCounts).length,
        averageRating: 4.2, // Mock ortalama
        topDistricts
      },
      timestamp: new Date().toISOString()
    };
  }
}