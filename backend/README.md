# Kampüs Etkinlikleri REST API (Sprint 9)

Bu proje, Süleyman Demirel Üniversitesi web geliştirme dersi kapsamında React frontend uygulamasının yanında çalışan Express tabanlı bir REST API sunucusudur.

## Çalıştırma Komutları

- Bağımlılıkları yükleme: `npm install`
- Örnek verileri yükleme: `npm run seed`
- Geliştirme modunda başlatma (`node --watch`): `npm run dev`
- Prod modunda başlatma: `npm start`

## Ortam Değişkenleri (.env)

Sunucu `.env` dosyasındaki port üzerinden çalışır (Varsayılan: `3000`). Örnek dosya için `.env.example` dosyasına bakınız.

## Tarih Biçimi

- API genelinde tarihler **`GG-AA-YYYY`** biçiminde (`15-10-2026` gibi) gönderilir ve döndürülür.
- Veritabanında gerçek `Date` nesnesi olarak tutulur ve sıralama/filtreleme buna göre yapılır.

## REST Sözleşmesi (API Endpoints)

| Method | Endpoint | Amaç | Başarılı Yanıt | Hata Yanıtı | Durum |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **GET** | `/health` | Sunucu sağlık ve öğrenci no kontrolü | `200 OK` | — | Çalışıyor |
| **GET** | `/events` | Etkinlikleri listele (`?search=` ve `?category=`, tarihe göre sıralı) | `200 OK` | — | Çalışıyor |
| **GET** | `/events/upcoming` | Bugün ve sonrasındaki yaklaşan etkinlikleri tarihe göre sıralı listele | `200 OK` | — | Çalışıyor |
| **GET** | `/events/:id` | ID'ye göre tek etkinlik getir (`GG-AA-YYYY`) | `200 OK` | `404 Not Found` | Çalışıyor |
| **POST** | `/events` | Yeni etkinlik oluştur (`GG-AA-YYYY`) | `201 Created` | `400 Bad Request` | Çalışıyor |
| **PATCH** | `/events/:id` | Etkinliği kısmen güncelle (`GG-AA-YYYY`) | `200 OK` | `400, 404` | Çalışıyor |
| **DELETE** | `/events/:id` | Etkinlik sil | `204 No Content` | `404 Not Found` | Çalışıyor |

### Hata Biçimi Örneği
Tüm hatalar standart bir JSON yapısıyla döner:
```json
{
  "error": {
    "message": "Event not found"
  }
}