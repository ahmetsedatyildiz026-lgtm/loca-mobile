#!/bin/bash

# LOCA GitHub Upload Script
# Bu scripti çalıştırmadan önce:
# 1. GitHub'da loca-mobile repository'sini oluşturun
# 2. Personal Access Token alın

echo "🚀 LOCA GitHub'a yükleniyor..."

# Git konfigürasyonu
echo "📝 Git kullanıcı bilgileri ayarlanıyor..."
git config --global user.name "Ahmet Sedat Yıldız"
git config --global user.email "ahmetsedatyildiz026@gmail.com"

# Repository başlat
echo "📁 Git repository başlatılıyor..."
git init

# Dosyaları ekle
echo "📄 Dosyalar ekleniyor..."
git add .

# Commit yap
echo "💾 İlk commit yapılıyor..."
git commit -m "feat: LOCA İstanbul mekan keşif uygulaması

✨ Özellikler:
- React Native + Expo hibrit uygulama
- Google Places API + Supabase entegrasyonu
- 39 İstanbul ilçesi filtreleme sistemi
- Premium UI componentleri (Light Luxury tema)
- 20+ mock İstanbul mekanı
- Production-ready kod yapısı

🏗️ Teknik Stack:
- TypeScript (Strict mode)
- React Navigation v6
- Custom hooks ile state management
- Comprehensive design system
- Jest testing setup
- ESLint/Prettier configuration

📱 Çalışma Yöntemleri:
- Expo Go ile mobil test
- Web browser versiyonu
- iOS/Android simulator desteği

🎯 Kullanıma hazır production build!"

# Branch ayarla
echo "🌟 Ana branch ayarlanıyor..."
git branch -M main

# Remote ekle (kullanıcı GitHub username'ini güncellemeli)
echo "🔗 GitHub remote ekleniyor..."
echo "⚠️  ÖNEMLİ: GitHub repository URL'inizi kontrol edin!"
echo "📝 Expected: https://github.com/ahmetsedatyildiz026-lgtm/loca-mobile.git"

read -p "GitHub repository URL'iniz doğru mu? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    git remote add origin https://github.com/ahmetsedatyildiz026-lgtm/loca-mobile.git
    
    # Push et
    echo "📤 GitHub'a yükleniyor..."
    echo "🔐 Personal Access Token'inizi girin (şifre değil!)"
    git push -u origin main
    
    echo "✅ LOCA başarıyla GitHub'a yüklendi!"
    echo "🌐 Repository: https://github.com/ahmetsedatyildiz026-lgtm/loca-mobile"
    echo "📱 README.md dosyasında tüm kullanım kılavuzu var!"
else
    echo "❌ Önce GitHub'da repository oluşturun ve URL'i kontrol edin"
fi