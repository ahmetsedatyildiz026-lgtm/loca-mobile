# LOCA - İstanbul Mekan Keşif Uygulaması

**LOCA**, İstanbul'un 39 ilçesinden premium mekanları keşfetmenizi sağlayan hibrit mobil uygulama. Google Places API ile kendi özel veritabanımızı birleştiren gelişmiş mimari ile gerçek zamanlı mekan bilgileri ve özel atmosfer filtreleri sunar.

## 🏗️ Mimari & Teknoloji Yığını

### Hibrit Veri Mimarisi
- **Google Places API**: Canlı puan, çalışma saatleri, fotoğraflar, telefon numarası
- **LOCA Veritabanı**: Özel atmosfer etiketleri, gürültü seviyesi, vale bilgisi, ilçe kategorileri
- **1-to-1 Eşleşme**: `google_place_id` anahtarı ile mükemmel veri entegrasyonu

### Teknoloji Yığını
- **Frontend**: React Native + Expo 50
- **Navigation**: React Navigation v6
- **Veritabanı**: Supabase (Production) / MockService (Development)
- **API Entegrasyonu**: Google Places API
- **Konum Servisi**: Expo Location
- **State Management**: React Hooks + Custom Hooks
- **Tip Sistemi**: TypeScript (Strict mode)
- **Styling**: Custom Design System (Light Luxury)

## ✨ Özellikler

### 🎯 Gelişmiş Filtreleme Sistemi
- **39 İstanbul İlçesi**: Eksiksiz ilçe listesi ile coğrafi filtreleme
- **6 Atmosfer Modu**: Date, Aile, İçkili, İçkisiz, Çalışma, Açık Alan
- **Akıllı Arama**: Mekan adı, mahalle ve özel etiketlerde arama

### 🏆 Premium Mekan Özellikleri
- **Canlı Veri**: Google'dan gerçek zamanlı puan ve açık/kapalı durumu
- **Özel Rozetler**: Gürültü seviyesi, vale durumu, fiyat kategorisi
- **VIP Mekanlar**: Öne çıkan premium mekanlar
- **Mesafe Hesaplama**: Kullanıcı konumuna göre yakınlık

### 📱 Kullanıcı Deneyimi
- **Light Luxury Tema**: Warm Amber Gold (#D4A373) premium tasarım
- **Responsive UI**: Tablet ve telefon desteği
- **Akıcı Animasyonlar**: Micro-interactions ile premium his
- **Koyu/Açık Tema**: Sistem tercihine uyumlu (Şu anda Light tema aktif)

## 🚀 Kurulum & Geliştirme

### Gereksinimler
- Node.js >= 18.0.0
- npm >= 9.0.0
- Expo CLI
- React Native development environment

### Hızlı Başlangıç
```bash
# Repository klonla
git clone https://github.com/loca-team/loca-mobile.git
cd loca-mobile

# Bağımlılıkları yükle
npm install

# Development sunucusu başlat
npm start

# Platform bazında çalıştır
npm run ios     # iOS simulator
npm run android # Android emulator
npm run web     # Web browser
```

### Environment Yapılandırması
`.env` dosyası oluşturun:
```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
EXPO_PUBLIC_GOOGLE_API_KEY=your_google_places_api_key
```

## 🏛️ Proje Yapısı

```
LOCA/
├── components/          # UI Componentleri
│   ├── DistrictSelector.tsx    # 39 İlçe seçici
│   ├── ModeSelector.tsx        # Atmosfer filtreleri
│   ├── PlaceCard.tsx          # Premium mekan kartı
│   ├── SearchBar.tsx          # Akıllı arama
│   └── PlaceList.tsx          # Mekan listesi
├── screens/             # Ana ekranlar
│   ├── HomeScreen.tsx         # Ana keşif ekranı
│   └── PlaceDetailScreen.tsx  # Mekan detay sayfası
├── services/            # API Servisleri
│   ├── supabase.ts           # Supabase işlemleri
│   ├── googlePlaces.ts       # Google Places API
│   ├── hybridService.ts      # Hibrit veri birleştirme
│   └── mockService.ts        # Development mock API
├── hooks/               # Custom React Hooks
│   └── usePlaces.ts          # Mekan state management
├── data/                # Mock Data & Responses
│   ├── mockPlaces.ts         # 20+ gerçekçi İstanbul mekanı
│   └── googlePlacesResponses.ts # Mock Google API responses
├── types/               # TypeScript Type Definitions
│   └── index.ts              # Tüm interface ve enum'lar
├── styles/              # Design System
│   ├── typography.ts         # Font sistemi
│   ├── buttons.ts            # Buton stilleri
│   ├── inputs.ts             # Form elementleri
│   ├── layout.ts             # Layout utilities
│   └── animations.ts         # Animation sistemi
└── navigation/          # React Navigation
    └── AppNavigator.tsx      # Ana navigation setup
```

## 🎨 Design System

### Renk Paleti (Light Luxury)
```typescript
THEME_COLORS = {
  background: '#F8F9FA',     // Warm Cream
  surface: '#FFFFFF',        // Pure White
  primary: '#D4A373',        // Warm Amber Gold
  textPrimary: '#1A1D20',    // Deep Charcoal
  textSecondary: '#6C757D',  // Soft Pewter
}
```

### Tasarım Tokenleri
- **Border Radius**: 16px (Cards), 12px (Buttons), 8px (Inputs)
- **Spacing**: 4px, 8px, 16px, 24px, 32px system
- **Shadows**: Soft, elevated premium gölgeler
- **Typography**: SF Pro Display (iOS) / Roboto (Android)

## 📊 Veritabanı Şeması

### LOCA Places Tablosu
```sql
CREATE TABLE places (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  google_place_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  district TEXT NOT NULL, -- 39 İstanbul ilçesinden biri
  neighborhood TEXT,
  
  -- Atmosfer filtreleri
  is_date BOOLEAN DEFAULT false,
  is_family BOOLEAN DEFAULT false,
  has_alcohol BOOLEAN DEFAULT false,
  is_alcohol_free BOOLEAN DEFAULT false,
  is_work_friendly BOOLEAN DEFAULT false,
  has_outdoor BOOLEAN DEFAULT false,
  
  -- Detaylar
  noise_level TEXT CHECK (noise_level IN ('QUIET', 'MODERATE', 'LOUD')),
  valet_status TEXT CHECK (valet_status IN ('AVAILABLE', 'EASY_PARKING', 'HARD_PARKING')),
  price_tier TEXT CHECK (price_tier IN ('BUDGET', 'MODERATE', 'EXPENSIVE', 'VIP')),
  
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## 🧪 Test & Kalite

### Test Komutları
```bash
npm test              # Jest testleri çalıştır
npm run test:watch    # Test watch modu
npm run test:coverage # Coverage raporu

npm run lint          # ESLint code review
npm run lint:fix      # Otomatik düzeltmeler
npm run typecheck     # TypeScript tip kontrolü
npm run format        # Prettier code formatting
```

### Kod Kalite Araçları
- **ESLint**: React Native, TypeScript, Prettier entegrasyonu
- **Prettier**: Konsistent kod formatlama
- **TypeScript**: Strict mode ile tip güvenliği
- **Jest**: Unit ve integration testler

## 📱 Production Build

### EAS Build (Expo Application Services)
```bash
# Development build
eas build --profile development

# Production builds
eas build --platform android
eas build --platform ios
eas build --platform all

# Store submission
eas submit --platform android
eas submit --platform ios
```

### App Store Metadata
- **Bundle ID**: `com.locateam.loca`
- **Version**: 1.0.0
- **Minimum iOS**: 13.0
- **Minimum Android**: API 21 (Android 5.0)

## 🌟 Mock Data

Geliştirme sürecinde kullanılmak üzere 20+ gerçekçi İstanbul mekanı:
- **Nişantaşı**: House Café, Starbucks Reserve
- **Kadıköy**: Karga Bar, Moda Teras Café
- **Karaköy**: Karaköy Lokantası, Pandeli
- **Bebek**: Bebek Hotel, Bebek Balık
- **Ve daha fazlası...**

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: add amazing feature'`)
4. Branch'i push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

### Commit Konvansiyonları
- `feat:` - Yeni özellik
- `fix:` - Bug fix
- `docs:` - Dokümantasyon
- `style:` - Code formatting
- `refactor:` - Code refactoring
- `test:` - Test eklemeleri
- `chore:` - Build/çevre değişiklikleri

## 📄 Lisans

MIT License - Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 👥 Takım

**LOCA Development Team**
- Frontend Development: React Native + TypeScript
- Backend Integration: Supabase + Google Places API
- UI/UX Design: Light Luxury Design System
- Data Architecture: Hibrit veri mimarisi

---

**LOCA ile İstanbul'u keşfedin! 🏙️✨**