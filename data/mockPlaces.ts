// LOCA - Mock Database (İstanbul'un 39 İlçesinden Gerçekçi Mekan Verileri)
import { 
  LocaPlace, 
  IstanbulDistrict, 
  NoiseLevel, 
  ValetStatus, 
  PriceTier 
} from '../types';

export const MOCK_PLACES: LocaPlace[] = [
  // BEŞİKTAŞ - NIŞANTAŞı
  {
    id: '1',
    google_place_id: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
    name: 'House Café Nişantaşı',
    district: IstanbulDistrict.BESIKTAS,
    neighborhood: 'Nişantaşı',
    is_date: true,
    is_family: true,
    has_alcohol: true,
    is_alcohol_free: false,
    is_work_friendly: true,
    has_outdoor: true,
    noise_level: NoiseLevel.MODERATE,
    valet_status: ValetStatus.AVAILABLE,
    price_tier: PriceTier.EXPENSIVE,
    is_featured: true,
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    google_place_id: 'ChIJd8BlQ2BZwokRAFQo7De14P0',
    name: 'Starbucks Reserve Nişantaşı',
    district: IstanbulDistrict.BESIKTAS,
    neighborhood: 'Nişantaşı',
    is_date: false,
    is_family: true,
    has_alcohol: false,
    is_alcohol_free: true,
    is_work_friendly: true,
    has_outdoor: false,
    noise_level: NoiseLevel.MODERATE,
    valet_status: ValetStatus.HARD_PARKING,
    price_tier: PriceTier.MODERATE,
    is_featured: false,
    created_at: '2024-01-16T09:15:00Z',
    updated_at: '2024-01-16T09:15:00Z'
  },

  // KADIKOY - MODA
  {
    id: '3',
    google_place_id: 'ChIJOwg_06VPwokRYv534QaPC8g',
    name: 'Karga Bar',
    district: IstanbulDistrict.KADIKOY,
    neighborhood: 'Moda',
    is_date: true,
    is_family: false,
    has_alcohol: true,
    is_alcohol_free: false,
    is_work_friendly: false,
    has_outdoor: false,
    noise_level: NoiseLevel.LOUD,
    valet_status: ValetStatus.HARD_PARKING,
    price_tier: PriceTier.MODERATE,
    is_featured: false,
    created_at: '2024-01-17T20:45:00Z',
    updated_at: '2024-01-17T20:45:00Z'
  },
  {
    id: '4',
    google_place_id: 'ChIJrTLr-GyuEmsRBfy61i59si0',
    name: 'Moda Teras Café',
    district: IstanbulDistrict.KADIKOY,
    neighborhood: 'Moda',
    is_date: true,
    is_family: true,
    has_alcohol: true,
    is_alcohol_free: true,
    is_work_friendly: true,
    has_outdoor: true,
    noise_level: NoiseLevel.QUIET,
    valet_status: ValetStatus.EASY_PARKING,
    price_tier: PriceTier.MODERATE,
    is_featured: true,
    created_at: '2024-01-18T11:20:00Z',
    updated_at: '2024-01-18T11:20:00Z'
  },

  // BEYOĞLU - KARAKÖY
  {
    id: '5',
    google_place_id: 'ChIJ2WeffIuyyhQRBIs9jxjyOGM',
    name: 'Karaköy Lokantası',
    district: IstanbulDistrict.BEYOGLU,
    neighborhood: 'Karaköy',
    is_date: true,
    is_family: true,
    has_alcohol: true,
    is_alcohol_free: false,
    is_work_friendly: false,
    has_outdoor: false,
    noise_level: NoiseLevel.MODERATE,
    valet_status: ValetStatus.AVAILABLE,
    price_tier: PriceTier.VIP,
    is_featured: true,
    created_at: '2024-01-19T19:00:00Z',
    updated_at: '2024-01-19T19:00:00Z'
  },
  {
    id: '6',
    google_place_id: 'ChIJN3F_tDeuEmsRUsoyG834rY9',
    name: 'Pandeli Restaurant',
    district: IstanbulDistrict.BEYOGLU,
    neighborhood: 'Eminönü',
    is_date: true,
    is_family: true,
    has_alcohol: false,
    is_alcohol_free: true,
    is_work_friendly: false,
    has_outdoor: false,
    noise_level: NoiseLevel.QUIET,
    valet_status: ValetStatus.HARD_PARKING,
    price_tier: PriceTier.EXPENSIVE,
    is_featured: true,
    created_at: '2024-01-20T12:30:00Z',
    updated_at: '2024-01-20T12:30:00Z'
  },

  // ŞİŞLİ - MECİDİYEKÖY
  {
    id: '7',
    google_place_id: 'ChIJd8BlQ2BZwokRAFQo7De14P9',
    name: 'Gloria Jean\'s Coffees Mecidiyeköy',
    district: IstanbulDistrict.SISLI,
    neighborhood: 'Mecidiyeköy',
    is_date: false,
    is_family: true,
    has_alcohol: false,
    is_alcohol_free: true,
    is_work_friendly: true,
    has_outdoor: false,
    noise_level: NoiseLevel.MODERATE,
    valet_status: ValetStatus.AVAILABLE,
    price_tier: PriceTier.BUDGET,
    is_featured: false,
    created_at: '2024-01-21T08:45:00Z',
    updated_at: '2024-01-21T08:45:00Z'
  },

  // SARIYER - BEBEK
  {
    id: '8',
    google_place_id: 'ChIJOwg_06VPwokRYv534QaPC8k',
    name: 'Bebek Hotel by The Stay Collection',
    district: IstanbulDistrict.SARIYER,
    neighborhood: 'Bebek',
    is_date: true,
    is_family: true,
    has_alcohol: true,
    is_alcohol_free: false,
    is_work_friendly: false,
    has_outdoor: true,
    noise_level: NoiseLevel.QUIET,
    valet_status: ValetStatus.AVAILABLE,
    price_tier: PriceTier.VIP,
    is_featured: true,
    created_at: '2024-01-22T17:15:00Z',
    updated_at: '2024-01-22T17:15:00Z'
  },
  {
    id: '9',
    google_place_id: 'ChIJrTLr-GyuEmsRBfy61i59si9',
    name: 'Bebek Balık Restaurant',
    district: IstanbulDistrict.SARIYER,
    neighborhood: 'Bebek',
    is_date: true,
    is_family: true,
    has_alcohol: true,
    is_alcohol_free: false,
    is_work_friendly: false,
    has_outdoor: true,
    noise_level: NoiseLevel.MODERATE,
    valet_status: ValetStatus.AVAILABLE,
    price_tier: PriceTier.EXPENSIVE,
    is_featured: false,
    created_at: '2024-01-23T19:30:00Z',
    updated_at: '2024-01-23T19:30:00Z'
  },

  // ATAŞEHIR - ATAŞEHIR MERKEZ
  {
    id: '10',
    google_place_id: 'ChIJ2WeffIuyyhQRBIs9jxjyOGP',
    name: 'Starbucks Ataşehir Bulvarı',
    district: IstanbulDistrict.ATASEHIR,
    neighborhood: 'Ataşehir Merkez',
    is_date: false,
    is_family: true,
    has_alcohol: false,
    is_alcohol_free: true,
    is_work_friendly: true,
    has_outdoor: true,
    noise_level: NoiseLevel.MODERATE,
    valet_status: ValetStatus.EASY_PARKING,
    price_tier: PriceTier.MODERATE,
    is_featured: false,
    created_at: '2024-01-24T09:00:00Z',
    updated_at: '2024-01-24T09:00:00Z'
  },

  // ÜSKÜDAR - ÇENGELKÖY
  {
    id: '11',
    google_place_id: 'ChIJN3F_tDeuEmsRUsoyG834rZ2',
    name: 'Çengelköy Çınarı',
    district: IstanbulDistrict.USKUDAR,
    neighborhood: 'Çengelköy',
    is_date: true,
    is_family: true,
    has_alcohol: false,
    is_alcohol_free: true,
    is_work_friendly: true,
    has_outdoor: true,
    noise_level: NoiseLevel.QUIET,
    valet_status: ValetStatus.EASY_PARKING,
    price_tier: PriceTier.BUDGET,
    is_featured: false,
    created_at: '2024-01-25T14:20:00Z',
    updated_at: '2024-01-25T14:20:00Z'
  },

  // FATİH - SULTANAHMETzilir
  {
    id: '12',
    google_place_id: 'ChIJd8BlQ2BZwokRAFQo7De14Q1',
    name: 'Pandeli Osmanli Restaurant',
    district: IstanbulDistrict.FATIH,
    neighborhood: 'Sultanahmet',
    is_date: true,
    is_family: true,
    has_alcohol: false,
    is_alcohol_free: true,
    is_work_friendly: false,
    has_outdoor: false,
    noise_level: NoiseLevel.QUIET,
    valet_status: ValetStatus.HARD_PARKING,
    price_tier: PriceTier.EXPENSIVE,
    is_featured: true,
    created_at: '2024-01-26T13:45:00Z',
    updated_at: '2024-01-26T13:45:00Z'
  },

  // MALTEPE - MALTEPE MERKEZ
  {
    id: '13',
    google_place_id: 'ChIJOwg_06VPwokRYv534QaPC8m',
    name: 'Kahve Dünyası Maltepe Park',
    district: IstanbulDistrict.MALTEPE,
    neighborhood: 'Maltepe Merkez',
    is_date: false,
    is_family: true,
    has_alcohol: false,
    is_alcohol_free: true,
    is_work_friendly: true,
    has_outdoor: false,
    noise_level: NoiseLevel.MODERATE,
    valet_status: ValetStatus.EASY_PARKING,
    price_tier: PriceTier.BUDGET,
    is_featured: false,
    created_at: '2024-01-27T10:15:00Z',
    updated_at: '2024-01-27T10:15:00Z'
  },

  // BAKIRKOY - ATAKÖY
  {
    id: '14',
    google_place_id: 'ChIJrTLr-GyuEmsRBfy61i59si3',
    name: 'Ataköy Marina Restaurant',
    district: IstanbulDistrict.BAKIRKOY,
    neighborhood: 'Ataköy',
    is_date: true,
    is_family: true,
    has_alcohol: true,
    is_alcohol_free: false,
    is_work_friendly: false,
    has_outdoor: true,
    noise_level: NoiseLevel.MODERATE,
    valet_status: ValetStatus.AVAILABLE,
    price_tier: PriceTier.EXPENSIVE,
    is_featured: false,
    created_at: '2024-01-28T18:20:00Z',
    updated_at: '2024-01-28T18:20:00Z'
  },

  // BEYLIKDÜZÜ - BEYLIKDÜZÜ MERKEZ
  {
    id: '15',
    google_place_id: 'ChIJ2WeffIuyyhQRBIs9jxjyOGQ',
    name: 'Marmara Park AVM Food Court',
    district: IstanbulDistrict.BEYLIKDUZU,
    neighborhood: 'Beylikdüzü Merkez',
    is_date: false,
    is_family: true,
    has_alcohol: false,
    is_alcohol_free: true,
    is_work_friendly: true,
    has_outdoor: false,
    noise_level: NoiseLevel.LOUD,
    valet_status: ValetStatus.EASY_PARKING,
    price_tier: PriceTier.BUDGET,
    is_featured: false,
    created_at: '2024-01-29T12:00:00Z',
    updated_at: '2024-01-29T12:00:00Z'
  },

  // KARTAL - KARTAL MERKEZ
  {
    id: '16',
    google_place_id: 'ChIJN3F_tDeuEmsRUsoyG834rZ4',
    name: 'Dragos Seafood Restaurant',
    district: IstanbulDistrict.KARTAL,
    neighborhood: 'Dragos',
    is_date: true,
    is_family: true,
    has_alcohol: true,
    is_alcohol_free: false,
    is_work_friendly: false,
    has_outdoor: true,
    noise_level: NoiseLevel.MODERATE,
    valet_status: ValetStatus.AVAILABLE,
    price_tier: PriceTier.EXPENSIVE,
    is_featured: true,
    created_at: '2024-01-30T19:45:00Z',
    updated_at: '2024-01-30T19:45:00Z'
  },

  // TUZLA - TUZLA MERKEZ
  {
    id: '17',
    google_place_id: 'ChIJd8BlQ2BZwokRAFQo7De14Q3',
    name: 'Tuzla Marina Café',
    district: IstanbulDistrict.TUZLA,
    neighborhood: 'Tuzla Merkez',
    is_date: false,
    is_family: true,
    has_alcohol: false,
    is_alcohol_free: true,
    is_work_friendly: true,
    has_outdoor: true,
    noise_level: NoiseLevel.QUIET,
    valet_status: ValetStatus.EASY_PARKING,
    price_tier: PriceTier.MODERATE,
    is_featured: false,
    created_at: '2024-01-31T11:30:00Z',
    updated_at: '2024-01-31T11:30:00Z'
  },

  // BAŞAKŞEHIR - BAŞAKŞEHIR MERKEZ
  {
    id: '18',
    google_place_id: 'ChIJOwg_06VPwokRYv534QaPC8n',
    name: 'Mall of İstanbul Food Hall',
    district: IstanbulDistrict.BASAKSEHIR,
    neighborhood: 'Başakşehir Merkez',
    is_date: false,
    is_family: true,
    has_alcohol: false,
    is_alcohol_free: true,
    is_work_friendly: true,
    has_outdoor: false,
    noise_level: NoiseLevel.LOUD,
    valet_status: ValetStatus.EASY_PARKING,
    price_tier: PriceTier.MODERATE,
    is_featured: false,
    created_at: '2024-02-01T15:15:00Z',
    updated_at: '2024-02-01T15:15:00Z'
  },

  // AVCILAR - AVCІLAR MERKEZ
  {
    id: '19',
    google_place_id: 'ChIJrTLr-GyuEmsRBfy61i59si4',
    name: 'Avcılar Sahil Restaurant',
    district: IstanbulDistrict.AVCILAR,
    neighborhood: 'Avcılar Merkez',
    is_date: true,
    is_family: true,
    has_alcohol: true,
    is_alcohol_free: false,
    is_work_friendly: false,
    has_outdoor: true,
    noise_level: NoiseLevel.MODERATE,
    valet_status: ValetStatus.EASY_PARKING,
    price_tier: PriceTier.MODERATE,
    is_featured: false,
    created_at: '2024-02-02T16:40:00Z',
    updated_at: '2024-02-02T16:40:00Z'
  },

  // ESENLER - ESENLER MERKEZ
  {
    id: '20',
    google_place_id: 'ChIJ2WeffIuyyhQRBIs9jxjyOGR',
    name: 'Esenler Kebap House',
    district: IstanbulDistrict.ESENLER,
    neighborhood: 'Esenler Merkez',
    is_date: false,
    is_family: true,
    has_alcohol: false,
    is_alcohol_free: true,
    is_work_friendly: false,
    has_outdoor: false,
    noise_level: NoiseLevel.MODERATE,
    valet_status: ValetStatus.HARD_PARKING,
    price_tier: PriceTier.BUDGET,
    is_featured: false,
    created_at: '2024-02-03T13:25:00Z',
    updated_at: '2024-02-03T13:25:00Z'
  }
];

// İstatistikler ve yardımcı fonksiyonlar
export const MOCK_STATS = {
  totalPlaces: MOCK_PLACES.length,
  featuredCount: MOCK_PLACES.filter(p => p.is_featured).length,
  districtCount: new Set(MOCK_PLACES.map(p => p.district)).size,
  
  // Atmosfer dağılımı
  atmosphereStats: {
    date: MOCK_PLACES.filter(p => p.is_date).length,
    family: MOCK_PLACES.filter(p => p.is_family).length,
    alcohol: MOCK_PLACES.filter(p => p.has_alcohol).length,
    alcoholFree: MOCK_PLACES.filter(p => p.is_alcohol_free).length,
    workFriendly: MOCK_PLACES.filter(p => p.is_work_friendly).length,
    outdoor: MOCK_PLACES.filter(p => p.has_outdoor).length,
  },

  // Fiyat dağılımı
  priceStats: {
    budget: MOCK_PLACES.filter(p => p.price_tier === PriceTier.BUDGET).length,
    moderate: MOCK_PLACES.filter(p => p.price_tier === PriceTier.MODERATE).length,
    expensive: MOCK_PLACES.filter(p => p.price_tier === PriceTier.EXPENSIVE).length,
    vip: MOCK_PLACES.filter(p => p.price_tier === PriceTier.VIP).length,
  }
};

// Utility fonksiyonları
export const getMockPlaceById = (id: string): LocaPlace | undefined => {
  return MOCK_PLACES.find(place => place.id === id);
};

export const getMockPlacesByDistrict = (district: IstanbulDistrict): LocaPlace[] => {
  return MOCK_PLACES.filter(place => place.district === district);
};

export const getFeaturedMockPlaces = (): LocaPlace[] => {
  return MOCK_PLACES.filter(place => place.is_featured);
};

export const getRandomMockPlaces = (count: number = 5): LocaPlace[] => {
  const shuffled = [...MOCK_PLACES].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};