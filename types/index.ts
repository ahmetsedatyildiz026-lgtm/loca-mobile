// LOCA - Master TypeScript Definitions
// Bu dosya İstanbul'un 39 ilçesini ve LocaPlace şemasını eksiksiz tanımlar

// İSTANBUL İLÇE ENUMERATORİ - 39 İlçe Eksiksiz
export enum IstanbulDistrict {
  ADALAR = 'Adalar',
  ARNAVUTKOY = 'Arnavutköy',
  ATASEHIR = 'Ataşehir',
  AVCILAR = 'Avcılar',
  BAGCILAR = 'Bağcılar',
  BAHCELIEVLER = 'Bahçelievler',
  BAKIRKOY = 'Bakırköy',
  BASAKSEHIR = 'Başakşehir',
  BAYRAMPASA = 'Bayrampaşa',
  BESIKTAS = 'Beşiktaş',
  BEYKOZ = 'Beykoz',
  BEYLIKDUZU = 'Beylikdüzü',
  BEYOGLU = 'Beyoğlu',
  BUYUKCEKMECE = 'Büyükçekmece',
  CATALCA = 'Çatalca',
  CEKMEKOY = 'Çekmeköy',
  ESENLER = 'Esenler',
  ESENYURT = 'Esenyurt',
  EYUPSULTAN = 'Eyüpsultan',
  FATIH = 'Fatih',
  GAZIOSMANPASA = 'Gaziosmanpaşa',
  GUNGORENLULER = 'Güngören',
  KADIKOY = 'Kadıköy',
  KAGITHANE = 'Kağıthane',
  KARTAL = 'Kartal',
  KUCUKCEKMECE = 'Küçükçekmece',
  MALTEPE = 'Maltepe',
  PENDIK = 'Pendik',
  SANCAKTEPE = 'Sancaktepe',
  SARIYER = 'Sarıyer',
  SILIVRI = 'Silivri',
  SULTANBEYLI = 'Sultanbeyli',
  SULTANGAZI = 'Sultangazi',
  SILE = 'Şile',
  SISLI = 'Şişli',
  TUZLA = 'Tuzla',
  UMRANIYE = 'Ümraniye',
  USKUDAR = 'Üsküdar',
  ZEYTINBURNU = 'Zeytinburnu'
}

// İstanbul İlçeleri String Array (API ve Filtreleme için)
export const ISTANBUL_DISTRICTS: string[] = Object.values(IstanbulDistrict);

// GÜRÜLTÜ SEVİYESİ
export enum NoiseLevel {
  QUIET = 'QUIET',
  MODERATE = 'MODERATE', 
  LOUD = 'LOUD'
}

// VALE DURUMU
export enum ValetStatus {
  AVAILABLE = 'AVAILABLE',
  EASY_PARKING = 'EASY_PARKING',
  HARD_PARKING = 'HARD_PARKING'
}

// FİYAT KATEGORİSİ
export enum PriceTier {
  BUDGET = 'BUDGET',          // $
  MODERATE = 'MODERATE',      // $$
  EXPENSIVE = 'EXPENSIVE',    // $$$
  VIP = 'VIP'                // $$$$
}

// MOD FİLTRE TİPLERİ
export interface ModeFilters {
  is_date: boolean;           // Romantik / Loş atmosfer
  is_family: boolean;         // Aile dostu / Rahat
  has_alcohol: boolean;       // Alkol servisi var
  is_alcohol_free: boolean;   // Alkol servisi yok
  is_work_friendly: boolean;  // Laptop + WiFi dostu
  has_outdoor: boolean;       // Açık hava / Teras
}

// GOOGLE PLACES API RESPONSE INTERFACE
export interface GooglePlaceData {
  place_id: string;
  name: string;
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  rating?: number;
  user_ratings_total?: number;
  price_level?: number;
  opening_hours?: {
    open_now: boolean;
    weekday_text: string[];
  };
  photos?: Array<{
    photo_reference: string;
    height: number;
    width: number;
  }>;
  formatted_phone_number?: string;
  website?: string;
  types: string[];
}

// LOCA VERİTABANI ŞEMASI (SUPABASE/FIREBASE)
export interface LocaPlace extends ModeFilters {
  id: string;                 // UUID / Auto ID
  google_place_id: string;    // Google Places API Unique ID (1-to-1 relation)
  name: string;               // Mekan adı
  district: IstanbulDistrict; // İlçe (39'dan biri zorunlu)
  neighborhood?: string;      // Semt (Moda, Bebek, Nişantaşı vb.)
  
  // ATMOSFER VE DETAYLAR
  noise_level: NoiseLevel;    // Gürültü seviyesi
  valet_status: ValetStatus;  // Park durumu
  price_tier: PriceTier;      // Fiyat kategorisi
  
  // YÖNETİM
  is_featured: boolean;       // Öne çıkan / Sponsorlu
  created_at: string;         // ISO timestamp
  updated_at: string;         // ISO timestamp
}

// KOMBİNE LOCA + GOOGLE VERİSİ (UI İÇİN)
export interface EnrichedPlace extends LocaPlace {
  // Google Places'ten gelen canlı veri
  google_data?: GooglePlaceData;
  current_rating?: number;
  is_open_now?: boolean;
  formatted_address?: string;
  phone_number?: string;
  photos?: string[];
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// FİLTRE STATE INTERFACE
export interface FilterState {
  selectedDistricts: IstanbulDistrict[];
  selectedModes: Partial<ModeFilters>;
  priceRange: PriceTier[];
  noiseLevel?: NoiseLevel;
  sortBy: 'rating' | 'distance' | 'price' | 'featured';
}

// API RESPONSE TİPLERİ
export interface LocaApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  timestamp: string;
}

export interface PlaceSearchParams {
  districts?: IstanbulDistrict[];
  modes?: Partial<ModeFilters>;
  coordinates?: { lat: number; lng: number };
  radius?: number;
  limit?: number;
}

// NAVIGATION TİPLERİ
export type RootStackParamList = {
  Home: undefined;
  PlaceDetail: { placeId: string };
  Filter: undefined;
  Map: { places?: EnrichedPlace[] };
  Search: { query?: string };
};

// UTILITY TİPLER
export type PlaceID = string;
export type GooglePlaceID = string;

// ROZETLERDİTERİM BADGES
export interface PlaceBadge {
  id: string;
  label: string;
  icon: string;
  color: string;
  condition: (place: LocaPlace) => boolean;
}

// THEME COLORS (Light Luxury Design System)
export const THEME_COLORS = {
  background: '#F8F9FA',        // Warm Cream
  surface: '#FFFFFF',           // Pure White
  primary: '#D4A373',           // Warm Amber Gold
  textPrimary: '#1A1D20',       // Deep Charcoal
  textSecondary: '#6C757D',     // Soft Pewter
  success: '#20C997',           // Emerald
  warning: '#FFC107',           // Amber
  error: '#DC3545',             // Rose
  info: '#17A2B8'               // Teal
} as const;

export const DESIGN_TOKENS = {
  borderRadius: {
    card: 16,
    button: 12,
    input: 8
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32
  },
  shadow: {
    card: '0 4px 20px rgba(0,0,0,0.05)',
    elevated: '0 8px 32px rgba(0,0,0,0.08)'
  }
} as const;