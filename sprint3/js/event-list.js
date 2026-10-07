// Ana sayfadaki "yaklaşan 2 etkinlik" ve etkinlikler.html'deki tam liste +
// arama/kategori filtresi, aynı modülden yönetiliyor.

import { events } from "./data.js";

function formatTarih(dateStr) {
  // data.js'teki tarih "GG-AA-YYYY" biçiminde saklanıyor.
  const [gun, ay, yil] = dateStr.split("-").map(Number);
  const tarih = new Date(yil, ay - 1, gun);
  return tarih.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function siralamaAnahtari(dateStr) {
  // "GG-AA-YYYY" -> "YYYY-AA-GG": metin olarak karşılaştırılınca
  // gerçek kronolojik sırayı versin diye (ay/gün sırası ters çevrildi).
  const [gun, ay, yil] = dateStr.split("-");
  return `${yil}-${ay}-${gun}`;
}

function createCard(event) {
  return `
    <article class="kart">
      <h2>${event.title}</h2>
      <p class="kategori">${event.category}</p>
      <p>${formatTarih(event.date)}, ${event.time}</p>
      <p>${event.location}</p>
      <a href="etkinlik-detay.html?id=${event.id}">Detayları gör</a>
    </article>`;
}

const list = document.querySelector("#etkinlik-listesi");

function render(dizi) {
  if (!list) return;
  if (dizi.length === 0) {
    list.innerHTML = `<p class="bos-mesaj">Aramanıza uygun etkinlik bulunamadı.</p>`;
    return;
  }
  list.innerHTML = dizi.map(createCard).join("");
}

function listeyiBasla() {
  if (!list) return;
  if (list.dataset.limit) {
    const yaklasan = [...events]
      .sort((a, b) =>
        siralamaAnahtari(a.date).localeCompare(siralamaAnahtari(b.date))
      )
      .slice(0, Number(list.dataset.limit));
    render(yaklasan);
  } else {
    render(events);
  }
}

listeyiBasla();

// --- Arama + kategori filtresi: sadece bu alanların olduğu sayfada çalışır ---
const filtreFormu = document.querySelector("#filtre-formu");
const arama = document.querySelector("#arama");
const kategoriFiltre = document.querySelector("#kategori-filtre");
const sonucSatiri = document.querySelector("#sonuc");

if (arama && kategoriFiltre && sonucSatiri) {
  const kategoriler = [...new Set(events.map((e) => e.category))];
  kategoriler.forEach((kategori) => {
    const option = document.createElement("option");
    option.value = kategori;
    option.textContent = kategori;
    kategoriFiltre.appendChild(option);
  });

  function filtrele() {
    const aranan = arama.value.toLocaleLowerCase("tr-TR").trim();
    const secilenKategori = kategoriFiltre.value;

    const sonuc = events.filter((e) => {
      const metinUyuyor = e.title.toLocaleLowerCase("tr-TR").includes(aranan);
      const kategoriUyuyor = secilenKategori === "" || e.category === secilenKategori;
      return metinUyuyor && kategoriUyuyor;
    });

    render(sonuc);
    sonucSatiri.textContent =
      sonuc.length === 0
        ? "Aramanıza uygun etkinlik bulunamadı."
        : `${sonuc.length} etkinlik listeleniyor.`;
  }

  arama.addEventListener("input", filtrele);
  kategoriFiltre.addEventListener("change", filtrele);
  filtreFormu?.addEventListener("submit", (e) => e.preventDefault());

  filtrele(); // sayfa ilk açıldığında da sayaç ve liste tutarlı olsun
}
