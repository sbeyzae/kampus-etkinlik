// Adres çubuğundaki ?id= değerine göre doğru etkinliği bulup
// detay sayfasını dolduruyor. id yoksa / bulunamazsa hata kutusu gösteriyor.

import { events } from "./data.js";

function formatTarih(dateStr) {
  const [gun, ay, yil] = dateStr.split("-").map(Number);
  const tarih = new Date(yil, ay - 1, gun);
  return tarih.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const container = document.querySelector("#detay");

if (container) {
  const id = new URLSearchParams(location.search).get("id");
  const event = events.find((e) => e.id === id);

  if (!event) {
    document.title = "Kampüs Etkinlikleri - Etkinlik bulunamadı";
    container.innerHTML = `
      <div class="hata-kutusu">
        <h1>Etkinlik bulunamadı</h1>
        <p>"${id ?? ""}" numaralı bir etkinlik yok. Listeden bir etkinlik seçin.</p>
        <a href="etkinlikler.html" class="buton">← Listeye dön</a>
      </div>`;
  } else {
    document.title = `Kampüs Etkinlikleri - ${event.title}`;
    container.innerHTML = `
      <article>
        <h1>${event.title}</h1>

        <div class="detay-icerik">
          <figure>
            <img src="images/afis.jpg" alt="${event.title} etkinlik afişi">
            <figcaption>${event.title} afişi</figcaption>
          </figure>

          <dl>
            <dt>Tarih</dt>
            <dd>${formatTarih(event.date)}, ${event.time}</dd>
            <dt>Yer</dt>
            <dd>${event.location}</dd>
            <dt>Kategori</dt>
            <dd>${event.category}</dd>
            <dt>Kontenjan</dt>
            <dd>${event.capacity} kişi</dd>
          </dl>
        </div>

        <h2>Açıklama</h2>
        <p>${event.description}</p>

        <a href="etkinlikler.html">← Listeye dön</a>
        <a href="etkinlik-guncelle.html?id=${event.id}" class="buton">Bu etkinliği güncelle</a>
      </article>`;
  }
}
