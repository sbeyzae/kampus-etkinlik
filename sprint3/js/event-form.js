// Hem etkinlik-ekle.html hem etkinlik-guncelle.html bu modülü kullanır.
// Form, data-mode="guncelle" işaretine göre davranışını değiştirir.

import { events } from "./data.js";

const form = document.querySelector("#etkinlik-formu");

function guncellemeFormunuDoldur(form) {
  const id = new URLSearchParams(location.search).get("id");
  const etkinlik = events.find((e) => e.id === id);

  if (!etkinlik) {
    form.outerHTML = `
      <div class="hata-kutusu">
        <p>Güncellenecek etkinlik seçilmedi. Önce listeden bir etkinlik seçin,
        detay sayfasındaki "Bu etkinliği güncelle" butonunu kullanın.</p>
        <a href="etkinlikler.html" class="buton">Etkinliklere git</a>
      </div>`;
    return false;
  }

  form.elements.ad.value = etkinlik.title;
  form.elements.kategori.value = etkinlik.category;
  const [gun, ay, yil] = etkinlik.date.split("-");
  form.elements.tarih.value = `${yil}-${ay}-${gun}`; // <input type="date"> YYYY-MM-DD bekler
  form.elements.saat.value = etkinlik.time;
  form.elements.yer.value = etkinlik.location;
  form.elements.kontenjan.value = etkinlik.capacity ?? "";
  form.elements.aciklama.value = etkinlik.description;
  return true;
}

function formuBagla(form) {
  form.setAttribute("novalidate", "");
  const mesajKutusu = document.querySelector("#form-mesaj");
  const alanlar = ["ad", "kategori", "tarih", "saat", "yer", "kontenjan"];

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fd = new FormData(form);
    const data = {
      title: (fd.get("ad") || "").trim(),
      category: fd.get("kategori") || "",
      date: fd.get("tarih") || "",
      time: fd.get("saat") || "",
      location: (fd.get("yer") || "").trim(),
      capacity: fd.get("kontenjan") ? Number(fd.get("kontenjan")) : null,
      description: (fd.get("aciklama") || "").trim(),
    };

    const errors = {};
    if (data.title.length < 3) errors.ad = "Etkinlik adı en az 3 karakter olmalı.";
    if (!data.category) errors.kategori = "Bir kategori seçin.";
    if (!data.date) errors.tarih = "Tarih seçin.";
    if (!data.time) errors.saat = "Saat seçin.";
    if (!data.location) errors.yer = "Yer bilgisini yazın.";
    if (data.capacity !== null && (data.capacity < 1 || data.capacity > 1000)) {
      errors.kontenjan = "Kontenjan 1 ile 1000 arasında olmalı.";
    }

    alanlar.forEach((alan) => {
      const hataSpan = document.querySelector(`#${alan}-hata`);
      const girdi = form.elements[alan];
      if (hataSpan) hataSpan.textContent = errors[alan] || "";
      if (girdi) girdi.setAttribute("aria-invalid", errors[alan] ? "true" : "false");
    });

    if (Object.keys(errors).length > 0) {
      mesajKutusu.className = "mesaj hata";
      mesajKutusu.textContent = "Formda hatalı alanlar var.";
      return;
    }

    mesajKutusu.className = "mesaj basari";
    if (form.dataset.mode === "guncelle") {
      const id = new URLSearchParams(location.search).get("id");
      mesajKutusu.innerHTML = `<p>Etkinlik güncellendi (bu sprintte kaydedilmez):</p><pre>${JSON.stringify({ id, ...data }, null, 2)}</pre>`;
    } else {
      mesajKutusu.innerHTML = `<p>Etkinlik oluşturuldu (bu sprintte kaydedilmez):</p><pre>${JSON.stringify(data, null, 2)}</pre>`;
    }
  });
}

if (form) {
  if (form.dataset.mode === "guncelle") {
    if (guncellemeFormunuDoldur(form)) {
      formuBagla(document.querySelector("#etkinlik-formu"));
    }
  } else {
    formuBagla(form);
  }
}
