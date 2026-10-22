(() => {
  'use strict';
  const config = window.ORSA_CONFIG || {};
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#navigation');
  function closeMenu() { if (!menu || !nav) return; nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); }
  menu?.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open', open); });
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav?.classList.contains('open')) { closeMenu(); menu.focus(); } });
  window.matchMedia('(min-width:851px)').addEventListener('change', closeMenu);

  // Eski paylaşılmış blog/hizmet bağlantıları yeni gerçek sayfalara gider.
  const oldRoute = location.hash.match(/^#(blog|hizmet)\/([a-z0-9-]+)$/);
  const knownServices = ['elektrik-tesisati','elektrik-ariza','elektrik-pano-sistemleri','aydinlatma-sistemleri','guvenlik-kamera-sistemleri','uydu-sistemleri','goruntulu-diafon','network-data-sistemleri'];
  const knownBlogs = ['elektrik-tesisati-ne-zaman-yenilenmeli','guvenlik-kamerasi-secerken-nelere-dikkat-edilmeli','evlerde-elektrik-kacagi-nasil-anlasilir','sigorta-neden-surekli-atar','guvenlik-kamera-sistemlerinin-avantajlari','uydu-sinyali-neden-gider','elektrik-panosu-bakimi-neden-onemlidir','is-yerleri-icin-kamera-sistemi-nasil-secilir'];
  if (oldRoute && (oldRoute[1] === 'blog' ? knownBlogs : knownServices).includes(oldRoute[2])) location.replace(`${oldRoute[1] === 'blog' ? 'blog' : 'hizmetler'}/${oldRoute[2]}.html`);

  // İçerik varsayılan olarak görünür; JS/animasyon hatası içeriği gizlemez.
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-revealing'); observer.unobserve(entry.target); } }), { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  const dialog = document.querySelector('#project-dialog');
  let opener;
  document.querySelectorAll('[data-gallery]').forEach(button => button.addEventListener('click', () => {
    const card = button.closest('article');
    const img = card.querySelector('img');
    const target = dialog.querySelector('#project-image');
    target.src = img.src; target.alt = img.alt;
    dialog.querySelector('#project-title').textContent = card.querySelector('h3').textContent;
    dialog.querySelector('#project-type').textContent = card.querySelector('.eyebrow').textContent;
    dialog.querySelector('#project-description').textContent = card.querySelector('p:last-child').textContent;
    dialog.querySelector('.example-label').hidden = !card.querySelector('.example-label');
    opener = button; dialog.showModal(); document.body.style.overflow = 'hidden';
  }));
  dialog?.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', e => { const rect = dialog.getBoundingClientRect(); if (e.target === dialog && (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom)) dialog.close(); });
  dialog?.addEventListener('close', () => { document.body.style.overflow = ''; opener?.focus(); });

  const form = document.querySelector('#quote-form');
  const endpointReady = /^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(config.formEndpoint || '');
  if (form && endpointReady) {
    form.querySelector('[value="email"]').textContent = 'E-posta ile gönderin ↗';
    form.querySelector('.form-note').textContent = 'WhatsApp bir mesaj taslağı açar. E-posta seçeneği talebinizi form servisi üzerinden işletmeye iletir.';
  }
  form?.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const fields = new FormData(form);
    const text = `Merhaba ORSA Elektrik, teklif almak istiyorum.\n\nAd Soyad: ${fields.get('name')}\nTelefon: ${fields.get('phone')}\nE-posta: ${fields.get('email') || 'Belirtilmedi'}\nHizmet: ${fields.get('service')}\n\n${fields.get('message')}`;
    const channel = event.submitter?.value || 'whatsapp';
    const status = document.querySelector('#form-status');
    if (channel === 'email' && endpointReady) {
      const button = event.submitter; button.disabled = true; status.textContent = 'Talebiniz iletiliyor…';
      try {
        const response = await fetch(config.formEndpoint, { method: 'POST', body: fields, headers: { Accept: 'application/json' } });
        if (!response.ok) throw new Error('delivery');
        status.textContent = 'Talebiniz form servisi tarafından alındı. Teşekkür ederiz.';
        form.reset();
      } catch { status.textContent = 'Talep iletilemedi. Bilgileriniz korunuyor; WhatsApp veya telefon ile bize ulaşabilirsiniz.'; }
      finally { button.disabled = false; }
    } else if (channel === 'email') {
      status.textContent = 'E-posta uygulamanızda taslak açılıyor. Mesajı oradan göndermeniz gerekir. Uygulama açılmazsa WhatsApp seçeneğini kullanabilirsiniz.';
      location.href = `mailto:${config.email}?subject=${encodeURIComponent('ORSA Elektrik — Teklif Talebi')}&body=${encodeURIComponent(text)}`;
    } else {
      status.textContent = 'WhatsApp mesajınız hazırlanıyor. İletimi WhatsApp içindeki Gönder düğmesiyle tamamlayın.';
      window.open(`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    }
  });

  // İzin verilene kadar GA veya üçüncü taraf yorum betiği yüklenmez.
  let consent;
  try { consent = localStorage.getItem('orsa-analytics-consent'); } catch {}
  const panel = document.querySelector('.cookie-panel');
  let analyticsLoaded = false;
  function loadAnalytics() {
    if (analyticsLoaded || !/^G-[A-Z0-9]+$/.test(config.analyticsId || '') || !['orsaelektrik.com','www.orsaelektrik.com'].includes(location.hostname)) return;
    analyticsLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    window.gtag('config', config.analyticsId);
    const script = document.createElement('script'); script.async = true; script.src = `https://www.googletagmanager.com/gtag/js?id=${config.analyticsId}`; document.head.append(script);
  }
  if (consent === 'yes') loadAnalytics();
  if (!consent && panel) panel.showModal();
  document.querySelectorAll('[data-consent]').forEach(button => button.addEventListener('click', () => {
    consent = button.dataset.consent;
    try { localStorage.setItem('orsa-analytics-consent', consent); } catch {}
    panel.close();
    if (consent === 'yes') { window['ga-disable-' + config.analyticsId] = false; loadAnalytics(); window.gtag?.('consent','update',{analytics_storage:'granted'}); }
    else { window['ga-disable-' + config.analyticsId] = true; window.gtag?.('consent','update',{analytics_storage:'denied'}); }
  }));
  document.querySelectorAll('[data-cookie-settings]').forEach(button => button.addEventListener('click', () => { panel.showModal(); panel.querySelector('[data-consent]').focus(); }));

  panel?.querySelector('.cookie-close').addEventListener('click', () => panel.querySelector('[data-consent="no"]').click());
  panel?.addEventListener('cancel', event => { event.preventDefault(); panel.querySelector('[data-consent="no"]').click(); });

  const widgetRoot = document.querySelector('#google-reviews');
  if (widgetRoot && /^[a-f0-9-]{36}$/i.test(config.elfsightWidgetId || '')) {
    const button = document.createElement('button'); button.className = 'button outline'; button.textContent = 'Google yorumlarını burada yükleyin';
    const notice = document.createElement('p'); notice.textContent = 'Yorumları yüklediğinizde Elfsight hizmetine bağlanılır. Google kaynak bağlantıları ve yazar bilgileri bileşende gösterilir.';
    widgetRoot.append(notice,button);
    button.addEventListener('click', () => {
      button.remove(); notice.textContent = 'Google yorumları yükleniyor. Yüklenmezse yukarıdaki Google bağlantısını kullanabilirsiniz.';
      const container = document.createElement('div'); container.className = `elfsight-app-${config.elfsightWidgetId}`; container.setAttribute('data-elfsight-app-lazy',''); widgetRoot.append(container);
      const script = document.createElement('script'); script.src = 'https://elfsightcdn.com/platform.js'; script.async = true;
      script.onerror = () => { notice.textContent = 'Yorumlar şu anda yüklenemedi. Google bağlantısından inceleyebilirsiniz.'; };
      widgetRoot.append(script);
    }, { once: true });
  }
})();
