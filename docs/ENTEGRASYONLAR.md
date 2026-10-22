# Google yorumları ve teklif formu

## Google yorumları

Elfsight hesabı ve widget kimliği henüz yok; sayfa gerçek Google İşletme Profili bağlantısını gösterir, puan/yorum üretmez.

22 Ekim 2026 tarihinde resmi fiyat sayfalarında incelenen seçenekler:

| Seçenek | Maliyet ve sınır | Değerlendirme |
|---|---|---|
| [Elfsight Google Reviews](https://elfsight.com/google-reviews-widget/pricing/) | Ücretsiz: 1 widget, ayda 200 görüntülenme; kota aşımında geçici devre dışı kalabilir | Kullanıcı tarafından seçilen başlangıç. Düşük trafikte uygun. |
| [Trustindex Single](https://www.trustindex.io/prices/) | 65 USD/yıl; sınırsız widget ve görüntülenme | Trafik arttığında değerlendirilebilir. WordPress ücretsiz eklentisi GitHub Pages için geçerli değildir. |
| [Google Places API](https://developers.google.com/maps/documentation/places/web-service/policies) | API ve faturalandırma kurulumu gerekir | Bu statik site için bakım ve kaynak gösterme sorumluluğu daha yüksek; başlangıçta önerilmedi. |

Elfsight'ta Google Reviews bileşeni oluşturulup ORSA Elektrik işletmesi seçilmeli. Mevcut place ID: `ChIJ4_tauUHFyhQRDrI8beDedm0`. İşletme adı ve adresi eşleştirilerek doğrulanmalı.

Kurulum kodundaki `elfsight-app-` sonrasındaki UUID, `assets/js/config.js` dosyasındaki `elfsightWidgetId` alanına yazılır. Site, ancak ziyaretçi yorumları yükle düğmesine basınca sağlayıcıya bağlanır. Google logosu, kaynak bağlantıları ve yorum sahiplerinin bilgileri gizlenmemeli veya CSS ile kaldırılmamalıdır. Widget oluşturulduktan sonra gerçek kayıt, kaynak gösterimi, kota ve mobil görünüm tekrar kontrol edilmelidir.

## Teklif formu

Şu an çalışır olan yollar:

- WhatsApp: form alanlarını mesaj taslağına aktarır; ziyaretçi WhatsApp'ta gönderir.
- E-posta: `Orsa2003@hotmail.com` adresine e-posta uygulamasında taslak hazırlar; ziyaretçi uygulamada gönderir.

Site hiçbir zaman taslak açılmasını başarılı teslim olarak göstermez, alanları temizlemez. Uygulama yüklü değilse telefon ve WhatsApp alternatifleri görünür.

Doğrudan e-posta teslimi için [Formspree](https://formspree.io/) üzerinde işletmeye ait doğrulanmış alıcıyla form oluşturulmalı. Gerçek `https://formspree.io/f/...` adresi `assets/js/config.js` içindeki `formEndpoint` alanına eklenir. Böylece e-posta düğmesi otomatik olarak POST gönderimine dönüşür. Başarı yalnızca servisin başarılı HTTP yanıtında gösterilir; hata halinde alanlar korunur. Gerçek hesap/endpoint yokken gönderim yapılmaz.

Etkinleştirildikten sonra alıcı doğrulaması, spam ayarları, gizlilik metni ve gerçek teslim testi tamamlanmalıdır. API sırrı veya e-posta parolası depoya yazılmaz.

## Google Analytics

`G-JCEXZLZX71` korunur. Yalnızca gerçek alan adında ve istatistik izni verildiğinde yüklenir. Yerel önizleme trafik oluşturmaz. Form alanları analytics olaylarına eklenmez. Rıza geri alındığında analytics devre dışı bırakılır.
