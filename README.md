# ORSA Elektrik — Kurumsal Web Sitesi

Tek dosyalık, framework gerektirmeyen statik bir web sitesi (`index.html` içinde HTML/CSS/JS bir arada). Build adımı yoktur; olduğu gibi yayınlanır.

## Proje Yapısı

```
orsa-elektrik-web/
├── index.html      # Sitenin tamamı (yapı + stil + script)
├── package.json    # Lokalde önizleme için (deploy için zorunlu değil)
├── vercel.json     # Vercel yapılandırması
├── .gitignore
└── README.md
```

## Lokalde Çalıştırma (opsiyonel)

Node.js kuruluysa:

```bash
npm install
npm run dev
```

Tarayıcıda `http://localhost:3000` adresini açın. İsterseniz Node kullanmadan da `index.html` dosyasını doğrudan tarayıcıda açabilirsiniz.

## GitHub'a Yükleme

**Yöntem A — Web arayüzünden (terminal bilmeden):**
1. [github.com](https://github.com) → sağ üstten **New repository**.
2. Repo adı: `orsa-elektrik-web`, **Public** veya **Private** seçin → **Create repository**.
3. Açılan sayfada **"uploading an existing file"** linkine tıklayın.
4. Bu klasördeki tüm dosyaları (index.html, package.json, vercel.json, .gitignore, README.md) sürükleyip bırakın.
5. Alt kısımda **Commit changes** butonuna basın.

**Yöntem B — Terminal ile (git kuruluysa):**
```bash
cd orsa-elektrik-web
git init
git add .
git commit -m "İlk sürüm: ORSA Elektrik web sitesi"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADIN/orsa-elektrik-web.git
git push -u origin main
```

## Vercel'de Yayınlama

1. [vercel.com](https://vercel.com) adresine gidin, **GitHub hesabınızla** giriş yapın.
2. Panelde **Add New → Project**.
3. Az önce oluşturduğunuz `orsa-elektrik-web` reposunu seçip **Import** deyin.
4. Vercel bunun statik bir site olduğunu otomatik algılar; **Framework Preset: Other**, Build Command ve Output Directory alanlarını **boş** bırakabilirsiniz.
5. **Deploy** butonuna basın. 30-60 saniye içinde `https://orsa-elektrik-web.vercel.app` gibi bir adres alırsınız.

### Kendi alan adınızı bağlamak (opsiyonel)
Vercel proje sayfasında **Settings → Domains** kısmından kendi alan adınızı (örn. `orsaelektrik.com`) ekleyip, alan adı sağlayıcınızda gösterilen DNS kayıtlarını girmeniz yeterlidir.

## Güncelleme Yapmak İsterseniz
`index.html` içindeki metin, telefon numarası, adres veya renkleri değiştirdikten sonra GitHub'a tekrar push ettiğinizde (veya web arayüzünden dosyayı güncellediğinizde), Vercel siteyi otomatik olarak yeniden yayınlar.

## Notlar
- İletişim formu şu an yalnızca istemci tarafında bir onay mesajı gösteriyor; gerçek e-posta/CRM entegrasyonu için bir form servisi (Formspree, Web3Forms vb.) veya bir backend eklenmesi gerekir.
- Google Haritalar bağlantısı gerçek işletme kaydına yönlendiriyor (Maltepe/İstanbul).
