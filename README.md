# ORSA Elektrik

Türkçe, statik HTML/CSS/JavaScript sitesi. GitHub Pages için kök dizin yayını ve CNAME korunmuştur. Yayın için build veya paket kurulumu gerekmez.

## Dosyalar
- index.html: ana sayfa.
- hizmetler/: sekiz hizmet sayfası.
- blog/: sekiz mevcut yazı ve arşiv.
- assets/images/: WebP fotoğraflar, küçük sürümler, işletmenin arka plansız logosu; SOURCES.md lisans/kaynak bilgileri.
- assets/css/site.css: duyarlı tasarım.
- assets/js/config.js: GA kimliği, telefon, e-posta ve isteğe bağlı widget/form kimlikleri.
- content/: hizmet, blog ve proje metinleri.
- scripts/build.py: içerikten HTML üretir; yalnızca geliştirme için Python + Pillow gerektirir.
- scripts/check.py: bağlantı, görsel, H1, JSON-LD, sitemap kontrolü.

## Fotoğraf ve proje ekleme
Fotoğrafları assets/images içine anlamlı bir adla WebP olarak koyun; aynı adın -640.webp sürümünü de ekleyin. content/projects.json içindeki title, type, description ve image alanları galeriyi belirler. Gerçek Orsa fotoğrafında example false olmalıdır. Ardından python scripts/build.py ve python scripts/check.py çalıştırılır. Aynı fotoğrafı yenilemek için aynı adlı dosyaların değiştirilmesi yeterlidir. Kullanıcı fotoğraf ve açıklamaları sohbette ileterek bu işlemi kod yazmadan yaptırabilir.

## Form ve Google yorumları
WhatsApp ve e-posta seçenekleri gerçek mesaj taslakları açar; ziyaretçi ilgili uygulamada gönderir. Sahte teslim mesajı gösterilmez. Doğrudan e-posta teslimi için doğrulanmış Formspree endpoint'i, gerçek Google yorumları için seçilen ücretsiz Elfsight widget kimliği bekleniyor. Ayrıntılar docs/ENTEGRASYONLAR.md içinde.

## Yerel önizleme
python -m http.server 8765 --bind 127.0.0.1
Önizleme alanında Analytics yüklenmez. Canlı sitede G-JCEXZLZX71, ziyaretçinin izni sonrası yüklenir.

## Güvenli yayın
Yedek dal: backup/before-premium-redesign-2026-10-22
Çalışma dalı: design/premium-redesign-2026-10-22
Başlangıç commit: 2edcba7c0f5921d9398fa16a0c4db1155825aafb
Ana dala birleştirmeden tasarım onayı alınmalıdır. Alan adı/DNS veya Pages ayarı değiştirilmemiştir. Mevcut alternatif vercel.json korunmuştur.
