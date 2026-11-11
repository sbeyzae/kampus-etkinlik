# Kampüs Etkinlikleri REST API (Sprint 7)

Bu proje, Süleyman Demirel Üniversitesi web geliştirme dersi kapsamında React frontend uygulamasının yanında çalışan Express tabanlı bir REST API sunucusudur.

## Çalıştırma Komutları

- Bağımlılıkları yükleme: `npm install`
- Geliştirme modunda başlatma (`node --watch`): `npm run dev`
- Prod modunda başlatma: `npm start`

## Ortam Değişkenleri (.env)

Sunucu `.env` dosyasındaki port üzerinden çalışır (Varsayılan: `3000`). Örnek dosya için `.env.example` dosyasına bakınız.

## REST Sözleşmesi (API Endpoints)

| Method | Endpoint | Amaç | Başarılı Yanıt | Hata Yanıtı | Durum |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **GET** | `/health` | Sunucu sağlık ve öğrenci no kontrolü | `200 OK` | — | Bu sprint |
| **GET** | `/events` | Tüm etkinlikleri listele (isteğe bağlı `?category=`) | `200 OK` | — | Bu sprint |
| **GET** | `/events/:id` | ID'ye göre tek etkinlik getir | `200 OK` | `404 Not Found` | Bu sprint |
| **POST** | `/events` | Yeni etkinlik oluştur | `201 Created` | `400 Bad Request` | Bu sprint |
| **PATCH** | `/events/:id` | Etkinlik güncelle | `200 OK` | `400, 404` | Sprint 9 |
| **DELETE** | `/events/:id` | Etkinlik sil | `204 No Content` | `404 Not Found` | Sprint 9 |

### Hata Biçimi Örneği
Tüm hatalar standart bir JSON yapısıyla döner:
```json
{
  "error": {
    "message": "Event not found"
  }
}