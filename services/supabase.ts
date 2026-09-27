// LOCA - Supabase Client & Database Operations
import { createClient } from '@supabase/supabase-js';
import {
  LocaPlace,
  EnrichedPlace,
  IstanbulDistrict,
  FilterState,
  PlaceSearchParams,
  LocaApiResponse
} from '../types';

// Supabase yapılandırması
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || 'your_supabase_url';
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'your_supabase_key';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// LOCA VERİTABANI İŞLEMLERİ
export class LocaDataService {
  
  /**
   * Tüm mekanları getir (filtresiz)
   */
  static async getAllPlaces(): Promise<LocaApiResponse<LocaPlace[]>> {
    try {
      const { data, error } = await supabase
        .from('places')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return {
        success: true,
        data: data || [],
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('getAllPlaces error:', error);
      return {
        success: false,
        data: [],
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * İlçeye göre mekanları filtrele
   */
  static async getPlacesByDistrict(district: IstanbulDistrict): Promise<LocaApiResponse<LocaPlace[]>> {
    try {
      const { data, error } = await supabase
        .from('places')
        .select('*')
        .eq('district', district)
        .order('is_featured', { ascending: false });

      if (error) throw error;

      return {
        success: true,
        data: data || [],
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('getPlacesByDistrict error:', error);
      return {
        success: false,
        data: [],
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Gelişmiş filtreleme ve arama
   */
  static async searchPlaces(params: PlaceSearchParams): Promise<LocaApiResponse<LocaPlace[]>> {
    try {
      let query = supabase.from('places').select('*');

      // İlçe filtresi
      if (params.districts && params.districts.length > 0) {
        query = query.in('district', params.districts);
      }

      // Mod filtreleri
      if (params.modes) {
        Object.entries(params.modes).forEach(([key, value]) => {
          if (value === true) {
            query = query.eq(key, true);
          }
        });
      }

      // Sıralama (öne çıkan mekanlar önce)
      query = query.order('is_featured', { ascending: false });
      query = query.order('created_at', { ascending: false });

      // Limit
      if (params.limit) {
        query = query.limit(params.limit);
      }

      const { data, error } = await query;

      if (error) throw error;

      return {
        success: true,
        data: data || [],
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('searchPlaces error:', error);
      return {
        success: false,
        data: [],
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * ID ile tek mekan getir
   */
  static async getPlaceById(id: string): Promise<LocaApiResponse<LocaPlace | null>> {
    try {
      const { data, error } = await supabase
        .from('places')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      return {
        success: true,
        data: data,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('getPlaceById error:', error);
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Google Place ID ile LOCA verisi getir
   */
  static async getPlaceByGoogleId(googlePlaceId: string): Promise<LocaApiResponse<LocaPlace | null>> {
    try {
      const { data, error } = await supabase
        .from('places')
        .select('*')
        .eq('google_place_id', googlePlaceId)
        .single();

      if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows

      return {
        success: true,
        data: data || null,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('getPlaceByGoogleId error:', error);
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Öne çıkan mekanları getir
   */
  static async getFeaturedPlaces(): Promise<LocaApiResponse<LocaPlace[]>> {
    try {
      const { data, error } = await supabase
        .from('places')
        .select('*')
        .eq('is_featured', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return {
        success: true,
        data: data || [],
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('getFeaturedPlaces error:', error);
      return {
        success: false,
        data: [],
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Yeni mekan ekle
   */
  static async createPlace(place: Omit<LocaPlace, 'id' | 'created_at' | 'updated_at'>): Promise<LocaApiResponse<LocaPlace>> {
    try {
      const newPlace = {
        ...place,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('places')
        .insert(newPlace)
        .select()
        .single();

      if (error) throw error;

      return {
        success: true,
        data: data,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('createPlace error:', error);
      return {
        success: false,
        data: {} as LocaPlace,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      };
    }
  }
}