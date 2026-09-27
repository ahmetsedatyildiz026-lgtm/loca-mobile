// LOCA - Mock Google Places API Responses
// Her mock mekan için Google Places API response'u

import { GooglePlaceData } from '../types';

export const MOCK_GOOGLE_RESPONSES: Record<string, GooglePlaceData> = {
  // House Café Nişantaşı
  'ChIJN1t_tDeuEmsRUsoyG83frY4': {
    place_id: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
    name: 'House Café Nişantaşı',
    formatted_address: 'Teşvikiye, Sak Sok. No:18, 34365 Şişli/İstanbul, Türkiye',
    geometry: {
      location: {
        lat: 41.048191,
        lng: 29.001546
      }
    },
    rating: 4.3,
    user_ratings_total: 1285,
    price_level: 3,
    opening_hours: {
      open_now: true,
      weekday_text: [
        'Pazartesi: 08:00–01:00',
        'Salı: 08:00–01:00',
        'Çarşamba: 08:00–01:00',
        'Perşembe: 08:00–01:00',
        'Cuma: 08:00–01:00',
        'Cumartesi: 08:00–01:00',
        'Pazar: 08:00–01:00'
      ]
    },
    photos: [
      {
        photo_reference: 'ATplDJa7_YoLWjXlWqFt8_Z9rKvU7jVq1T2yGHFh4rF3k6mHN8JL',
        height: 3024,
        width: 4032
      }
    ],
    formatted_phone_number: '+90 212 227 26 99',
    website: 'https://www.housecafe.com.tr/',
    types: ['restaurant', 'cafe', 'food', 'point_of_interest', 'establishment']
  },

  // Starbucks Reserve Nişantaşı
  'ChIJd8BlQ2BZwokRAFQo7De14P0': {
    place_id: 'ChIJd8BlQ2BZwokRAFQo7De14P0',
    name: 'Starbucks Reserve Nişantaşı',
    formatted_address: 'Teşvikiye, Abdi İpekçi Cd. No:8, 34365 Şişli/İstanbul, Türkiye',
    geometry: {
      location: {
        lat: 41.048584,
        lng: 29.002178
      }
    },
    rating: 4.1,
    user_ratings_total: 892,
    price_level: 2,
    opening_hours: {
      open_now: true,
      weekday_text: [
        'Pazartesi: 07:00–23:00',
        'Salı: 07:00–23:00',
        'Çarşamba: 07:00–23:00',
        'Perşembe: 07:00–23:00',
        'Cuma: 07:00–23:00',
        'Cumartesi: 07:00–23:00',
        'Pazar: 07:00–23:00'
      ]
    },
    photos: [
      {
        photo_reference: 'ATplDJZLFKGJ8HfNq2R1X4E5zT3P7wQ8vE9mC6xA2U1s4bK9Y',
        height: 4032,
        width: 3024
      }
    ],
    formatted_phone_number: '+90 212 296 15 15',
    website: 'https://www.starbucks.com.tr/',
    types: ['cafe', 'food', 'point_of_interest', 'establishment']
  },

  // Karga Bar
  'ChIJOwg_06VPwokRYv534QaPC8g': {
    place_id: 'ChIJOwg_06VPwokRYv534QaPC8g',
    name: 'Karga Bar',
    formatted_address: 'Caferağa, Kadife Sk. No:16, 34710 Kadıköy/İstanbul, Türkiye',
    geometry: {
      location: {
        lat: 40.987456,
        lng: 29.025847
      }
    },
    rating: 4.5,
    user_ratings_total: 2156,
    price_level: 2,
    opening_hours: {
      open_now: false,
      weekday_text: [
        'Pazartesi: 19:00–02:00',
        'Salı: 19:00–02:00',
        'Çarşamba: 19:00–02:00',
        'Perşembe: 19:00–02:00',
        'Cuma: 19:00–03:00',
        'Cumartesi: 19:00–03:00',
        'Pazar: Kapalı'
      ]
    },
    photos: [
      {
        photo_reference: 'ATplDJY4R2M8NqE5wV9X3Z7K1P6tF8bG2sA4C9eH5jL0iU',
        height: 3024,
        width: 4032
      }
    ],
    formatted_phone_number: '+90 216 449 13 25',
    types: ['bar', 'night_club', 'point_of_interest', 'establishment']
  },

  // Moda Teras Café
  'ChIJrTLr-GyuEmsRBfy61i59si0': {
    place_id: 'ChIJrTLr-GyuEmsRBfy61i59si0',
    name: 'Moda Teras Café',
    formatted_address: 'Caferağa, Moda Cd. No:84, 34710 Kadıköy/İstanbul, Türkiye',
    geometry: {
      location: {
        lat: 40.987123,
        lng: 29.025194
      }
    },
    rating: 4.2,
    user_ratings_total: 756,
    price_level: 2,
    opening_hours: {
      open_now: true,
      weekday_text: [
        'Pazartesi: 09:00–23:00',
        'Salı: 09:00–23:00',
        'Çarşamba: 09:00–23:00',
        'Perşembe: 09:00–23:00',
        'Cuma: 09:00–24:00',
        'Cumartesi: 09:00–24:00',
        'Pazar: 09:00–23:00'
      ]
    },
    photos: [
      {
        photo_reference: 'ATplDJW7Q5K2Hx8F9E1R6V3M4bG7sP0nA9cZ8jL2iU5y',
        height: 4032,
        width: 3024
      }
    ],
    formatted_phone_number: '+90 216 336 20 85',
    website: 'https://modaterascafe.com/',
    types: ['cafe', 'restaurant', 'point_of_interest', 'establishment']
  },

  // Karaköy Lokantası
  'ChIJ2WeffIuyyhQRBIs9jxjyOGM': {
    place_id: 'ChIJ2WeffIuyyhQRBIs9jxjyOGM',
    name: 'Karaköy Lokantası',
    formatted_address: 'Kemankeş Karamustafa Paşa, Kemankeş Cd. No:37A, 34425 Beyoğlu/İstanbul, Türkiye',
    geometry: {
      location: {
        lat: 41.024567,
        lng: 28.974892
      }
    },
    rating: 4.6,
    user_ratings_total: 3421,
    price_level: 4,
    opening_hours: {
      open_now: true,
      weekday_text: [
        'Pazartesi: 12:00–15:00, 19:00–01:00',
        'Salı: 12:00–15:00, 19:00–01:00',
        'Çarşamba: 12:00–15:00, 19:00–01:00',
        'Perşembe: 12:00–15:00, 19:00–01:00',
        'Cuma: 12:00–15:00, 19:00–01:00',
        'Cumartesi: 12:00–15:00, 19:00–01:00',
        'Pazar: 12:00–15:00, 19:00–01:00'
      ]
    },
    photos: [
      {
        photo_reference: 'ATplDJX9T3N7M5Q2H8F4K1B6vP0cE9sG7jA2L8iU4y6z',
        height: 3024,
        width: 4032
      }
    ],
    formatted_phone_number: '+90 212 292 44 55',
    website: 'https://www.karakoylokantasi.com/',
    types: ['restaurant', 'food', 'point_of_interest', 'establishment']
  },

  // Pandeli Restaurant
  'ChIJN3F_tDeuEmsRUsoyG834rY9': {
    place_id: 'ChIJN3F_tDeuEmsRUsoyG834rY9',
    name: 'Pandeli Restaurant',
    formatted_address: 'Eminönü, Mısır Çarşısı No:1, 34116 Fatih/İstanbul, Türkiye',
    geometry: {
      location: {
        lat: 41.016789,
        lng: 28.971234
      }
    },
    rating: 4.4,
    user_ratings_total: 2089,
    price_level: 3,
    opening_hours: {
      open_now: true,
      weekday_text: [
        'Pazartesi: 12:00–17:00',
        'Salı: 12:00–17:00',
        'Çarşamba: 12:00–17:00',
        'Perşembe: 12:00–17:00',
        'Cuma: 12:00–17:00',
        'Cumartesi: 12:00–17:00',
        'Pazar: Kapalı'
      ]
    },
    photos: [
      {
        photo_reference: 'ATplDJV8S4M6L2Q5H1F9K3B7vP2cE0sG8jA5L7iU3y9z',
        height: 4032,
        width: 3024
      }
    ],
    formatted_phone_number: '+90 212 527 39 09',
    website: 'https://www.pandeli.com.tr/',
    types: ['restaurant', 'food', 'point_of_interest', 'establishment']
  },

  // Gloria Jean's Coffees Mecidiyeköy
  'ChIJd8BlQ2BZwokRAFQo7De14P9': {
    place_id: 'ChIJd8BlQ2BZwokRAFQo7De14P9',
    name: "Gloria Jean's Coffees Mecidiyeköy",
    formatted_address: 'Mecidiyeköy, Büyükdere Cd. No:171, 34394 Şişli/İstanbul, Türkiye',
    geometry: {
      location: {
        lat: 41.058942,
        lng: 28.989765
      }
    },
    rating: 3.9,
    user_ratings_total: 634,
    price_level: 1,
    opening_hours: {
      open_now: true,
      weekday_text: [
        'Pazartesi: 07:00–22:00',
        'Salı: 07:00–22:00',
        'Çarşamba: 07:00–22:00',
        'Perşembe: 07:00–22:00',
        'Cuma: 07:00–22:00',
        'Cumartesi: 07:00–22:00',
        'Pazar: 08:00–22:00'
      ]
    },
    photos: [
      {
        photo_reference: 'ATplDJU7R3M5N8Q4H2F6K9B1vP5cE7sG3jA8L4iU1y2z',
        height: 3024,
        width: 4032
      }
    ],
    formatted_phone_number: '+90 212 217 89 90',
    website: 'https://www.gloriajeans.com.tr/',
    types: ['cafe', 'food', 'point_of_interest', 'establishment']
  },

  // Bebek Hotel by The Stay Collection
  'ChIJOwg_06VPwokRYv534QaPC8k': {
    place_id: 'ChIJOwg_06VPwokRYv534QaPC8k',
    name: 'Bebek Hotel by The Stay Collection',
    formatted_address: 'Bebek, Cevdet Paşa Cd. No:34, 34342 Beşiktaş/İstanbul, Türkiye',
    geometry: {
      location: {
        lat: 41.084567,
        lng: 29.043891
      }
    },
    rating: 4.7,
    user_ratings_total: 1867,
    price_level: 4,
    opening_hours: {
      open_now: true,
      weekday_text: [
        'Pazartesi: 07:00–23:00',
        'Salı: 07:00–23:00',
        'Çarşamba: 07:00–23:00',
        'Perşembe: 07:00–23:00',
        'Cuma: 07:00–23:00',
        'Cumartesi: 07:00–23:00',
        'Pazar: 07:00–23:00'
      ]
    },
    photos: [
      {
        photo_reference: 'ATplDJT6Q2M4N7Q3H5F8K2B4vP8cE6sG1jA7L3iU9y1z',
        height: 4032,
        width: 3024
      }
    ],
    formatted_phone_number: '+90 212 358 20 00',
    website: 'https://www.thestaycollection.com/bebek-hotel/',
    types: ['lodging', 'restaurant', 'bar', 'point_of_interest', 'establishment']
  },

  // Bebek Balık Restaurant
  'ChIJrTLr-GyuEmsRBfy61i59si9': {
    place_id: 'ChIJrTLr-GyuEmsRBfy61i59si9',
    name: 'Bebek Balık Restaurant',
    formatted_address: 'Bebek, Bebek Cd. No:5, 34342 Beşiktaş/İstanbul, Türkiye',
    geometry: {
      location: {
        lat: 41.084123,
        lng: 29.043456
      }
    },
    rating: 4.3,
    user_ratings_total: 1245,
    price_level: 3,
    opening_hours: {
      open_now: true,
      weekday_text: [
        'Pazartesi: 12:00–24:00',
        'Salı: 12:00–24:00',
        'Çarşamba: 12:00–24:00',
        'Perşembe: 12:00–24:00',
        'Cuma: 12:00–24:00',
        'Cumartesi: 12:00–24:00',
        'Pazar: 12:00–24:00'
      ]
    },
    photos: [
      {
        photo_reference: 'ATplDJS5P1M3N6Q2H4F7K1B3vP7cE5sG9jA6L2iU8y3z',
        height: 3024,
        width: 4032
      }
    ],
    formatted_phone_number: '+90 212 263 30 00',
    types: ['restaurant', 'food', 'point_of_interest', 'establishment']
  },

  // Starbucks Ataşehir Bulvarı
  'ChIJ2WeffIuyyhQRBIs9jxjyOGP': {
    place_id: 'ChIJ2WeffIuyyhQRBIs9jxjyOGP',
    name: 'Starbucks Ataşehir Bulvarı',
    formatted_address: 'Ataşehir Blv. No:40, 34746 Ataşehir/İstanbul, Türkiye',
    geometry: {
      location: {
        lat: 40.988734,
        lng: 29.118567
      }
    },
    rating: 4.0,
    user_ratings_total: 978,
    price_level: 2,
    opening_hours: {
      open_now: true,
      weekday_text: [
        'Pazartesi: 06:30–23:00',
        'Salı: 06:30–23:00',
        'Çarşamba: 06:30–23:00',
        'Perşembe: 06:30–23:00',
        'Cuma: 06:30–23:00',
        'Cumartesi: 07:00–23:00',
        'Pazar: 07:00–23:00'
      ]
    },
    photos: [
      {
        photo_reference: 'ATplDJR4O9M2N5Q1H3F6K9B2vP6cE4sG8jA5L1iU7y4z',
        height: 4032,
        width: 3024
      }
    ],
    formatted_phone_number: '+90 216 576 89 90',
    website: 'https://www.starbucks.com.tr/',
    types: ['cafe', 'food', 'point_of_interest', 'establishment']
  }
};

// Utility fonksiyonu
export const getMockGoogleResponse = (googlePlaceId: string): GooglePlaceData | null => {
  return MOCK_GOOGLE_RESPONSES[googlePlaceId] || null;
};