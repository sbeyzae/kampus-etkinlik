import { useState, useEffect } from 'react';
import './App.css';
import { events } from './data/events';
import type { CampusEvent, Category } from './types/campus-event';
import { filterByCategory, searchEvents, findEventById } from './utils/filter-events';

type PageName = "home" | "events" | "detail" | "add" | "update";

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  useEffect(() => {
    if (page === "detail" && selected) {
      document.title = `Kampüs Etkinlikleri - ${selected.title}`;
    } else {
      document.title = "Kampüs Etkinlikleri";
    }
  }, [page, selected]);

  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  const categories = [...new Set(events.map(e => e.category))];
  const filtered = filterByCategory(searchEvents(events, searchText), category);

  function renderCard(event: CampusEvent) {
    return (
      <article className="kart" key={event.id}>
        <h2>{event.title}</h2>
        <p className="kategori">{event.category}</p>
        <p>Tarih: {event.date}, {event.time}</p>
        <p>Yer: {event.location}</p>
        {event.capacity && <p>Kontenjan: {event.capacity} kişi</p>}
        <p>{event.description}</p>
        <a 
          href="#" 
          className="detay-link" 
          onClick={(e) => { e.preventDefault(); go("detail", event.id); }}
        >
          Detayları gör
        </a>
      </article>
    );
  }

  return (
    <>
      <header className="site-baslik">
        <h1>Kampüs Etkinlikleri</h1>
        <p>Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.</p>
      </header>

      <nav className="menu">
        <a href="#" className={page === "home" ? "aktif" : ""} onClick={(e) => { e.preventDefault(); go("home"); }}>Ana Sayfa</a>
        <a href="#" className={page === "events" ? "aktif" : ""} onClick={(e) => { e.preventDefault(); go("events"); }}>Etkinlikler</a>
        <a href="#" className={(page === "add" || page === "update") ? "aktif" : ""} onClick={(e) => { e.preventDefault(); go("add"); }}>Ekle</a>
      </nav>

      <main>
        {page === "home" && (
          <section>
            <div className="etkinlik-listesi">
              {upcoming.map(renderCard)}
            </div>
          </section>
        )}

        {page === "events" && (
          <section>
            <form className="filtre" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="arama">Etkinlik ara</label>
              <input 
                type="search" 
                id="arama" 
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              
              <label htmlFor="kategori">Kategori</label>
              <select 
                id="kategori" 
                value={category}
                onChange={(e) => setCategory(e.target.value as Category | "")}
              >
                <option value="">Tümü</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </form>
            
            <p id="sonuc">
              {filtered.length === 0 ? "Aramanıza uygun etkinlik bulunamadı." : `${filtered.length} etkinlik listeleniyor.`}
            </p>

            <div className="etkinlik-listesi">
              {filtered.map(renderCard)}
            </div>
          </section>
        )}

        {page === "detail" && (
          <section>
            {!selected ? (
              <div className="hata-kutusu">
                <p>Etkinlik bulunamadı. Lütfen listeden bir etkinlik seçin.</p>
                <button onClick={() => go("events")}>Listeye dön</button>
              </div>
            ) : (
              <article className="detay">
                <h2>{selected.title}</h2>
                <div className="detay-icerik">
                  {selected.image && (
                    <figure>
                      <img src={selected.image} alt={`${selected.title} afişi`} />
                    </figure>
                  )}
                  <dl className="kunye">
                    <dt>Tarih</dt>
                    <dd>{selected.date}, {selected.time}</dd>
                    <dt>Yer</dt>
                    <dd>{selected.location}</dd>
                    <dt>Kategori</dt>
                    <dd>{selected.category}</dd>
                    {selected.capacity && (
                      <>
                        <dt>Kontenjan</dt>
                        <dd>{selected.capacity} kişi</dd>
                      </>
                    )}
                  </dl>
                </div>
                <div className="aciklama">
                  <h3>Açıklama</h3>
                  <p>{selected.description}</p>
                </div>
                <div className="butonlar">
                  <button onClick={() => go("events")}>&larr; Listeye dön</button>
                  <button onClick={() => go("update", selected.id)}>Bu etkinliği güncelle</button>
                </div>
              </article>
            )}
          </section>
        )}

        {/* --- ADIM 13: FORMLAR --- */}
        {(page === "add" || page === "update") && (
          <section>
            <h2>{page === "add" ? "Etkinlik Ekle" : "Etkinlik Güncelle"}</h2>
            <p className="bilgi-mesaji">Bu sprintte form sadece görünüm; kayıt yapılmaz.</p>
            <form className="etkinlik-formu" onSubmit={(e) => e.preventDefault()}>
              
              <label htmlFor="title">Etkinlik Adı</label>
              <input type="text" id="title" name="title" maxLength={80} placeholder="Örn. Kariyer Günleri 2026" />

              <label htmlFor="form-category">Kategori</label>
              <select id="form-category" name="category">
                <option value="">Seçiniz</option>
                <option value="Seminer">Seminer</option>
                <option value="Atölye">Atölye</option>
                <option value="Söyleşi">Söyleşi</option>
                <option value="Yarışma">Yarışma</option>
              </select>

              <label htmlFor="date">Tarih</label>
              <input type="date" id="date" name="date" />

              <label htmlFor="time">Saat</label>
              <input type="time" id="time" name="time" />

              <label htmlFor="location">Yer</label>
              <input type="text" id="location" name="location" placeholder="Örn. A Blok Konferans Salonu" />

              <label htmlFor="capacity">Kontenjan</label>
              <input type="number" id="capacity" name="capacity" />

              <label htmlFor="description">Açıklama</label>
              <textarea id="description" name="description" rows={5}></textarea>

              <button type="submit">Kaydet</button>
            </form>
          </section>
        )}
      </main>

      <footer>
        <p>Şerife Beyza Eryiğit - 2211011030</p>
      </footer>
    </>
  );
}

export default App;