> Canlı adres: `https://...vercel.app` — Vercel'de yayına aldıktan sonra bu satırı güncelle.

# Kampüs Etkinlikleri

**Beyza Eryiğit · 2211011030**

Kampüs Etkinlikleri uygulaması. Sprint 1'de sadece HTML iskeleti kuruldu;
Sprint 2'de CSS giydirildi (responsive, mobil öncelikli); Sprint 3'te
sayfalar sabit veriden (data.js) JavaScript ile üretilir hâle geldi.

## Sprint 1 — HTML ve Git

- `sprint1/index.html` — Ana sayfa
- `sprint1/etkinlikler.html` — Etkinlik listesi
- `sprint1/etkinlik-detay.html` — Etkinlik detay sayfası
- `sprint1/etkinlik-ekle.html` — Yeni etkinlik ekleme formu
- `sprint1/etkinlik-guncelle.html` — Etkinlik güncelleme formu

Etiket: `sprint-01`

## Sprint 2 — CSS ve Responsive Tasarım

Sprint 1 ile aynı 5 sayfa; `sprint2/css/2211011030.css` her sayfaya bağlı.

- `--no: 2211011030` → `--ton: mod(var(--no), 360)` = **110**
- Font: numaranın son hanesi (0) → **Arial**
- Etkinlik kartları `section > article` + grid (telefonda tek sütun)
- Etkinlik detayında afiş solda / künye sağda (≥700px), telefonda alt alta

Etiket: `sprint-02`

## Sprint 3 — JavaScript ve DOM

Sprint 2 ile aynı 5 sayfa; artık `sprint3/js/` altında 4 modül var:

- `data.js` — 6 etkinliğin tutulduğu tek veri kaynağı (dışa aktarılan `events` dizisi)
- `event-list.js` — kartları veriden üretir; `index.html` (yaklaşan 2) ve
  `etkinlikler.html` (tümü + arama/kategori filtresi) aynı modülü kullanır
- `event-detail.js` — adresteki `?id=` değerine göre doğru etkinliği açar
- `event-form.js` — ekleme ve güncelleme formlarını yakalar, doğrular,
  sonucu ekranda gösterir (bu sprintte hiçbir şey kalıcı kaydedilmez)

Menüden **Güncelle** linki kaldırıldı; güncelleme sayfasına sadece detay
sayfasındaki "Bu etkinliği güncelle" butonuyla gidiliyor.

Etiket: `sprint-03`

## Canlı adres

> Vercel'de yayına aldıktan sonra buraya ekleyin: `https://...vercel.app`
> (Sprint 3 için Vercel Root Directory ayarını `sprint3` yapmayı unutma.)
