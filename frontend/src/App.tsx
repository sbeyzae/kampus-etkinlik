import { useState, useEffect } from 'react';
import './App.css';
import { events } from './data/events';
import type { Category } from './types/campus-event';
import { filterByCategory, searchEvents, findEventById } from './utils/filter-events';
import type { PageName } from './types/page';

// Bileşenleri içe aktarıyoruz
import Header from './components/layout/Header';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import EventList from './components/events/EventList';
import EventFilter from './components/events/EventFilter';
import EventDetail from './components/events/EventDetail';
import EventForm from './components/forms/EventForm';

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

  return (
    <>
      <Header 
        title="Kampüs Etkinlikleri" 
        text="Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin." 
      />

      <Navigation current={page} onNavigate={go} />

      <main>
        {page === "home" && (
          <section>
            <EventList events={upcoming} onShowDetail={(id) => go("detail", id)} />
          </section>
        )}

        {page === "events" && (
          <section>
            <EventFilter 
              searchText={searchText}
              onSearchChange={setSearchText}
              category={category}
              onCategoryChange={setCategory}
              categories={categories}
            />
            
            <p id="sonuc">
              {filtered.length === 0 ? "Aramanıza uygun etkinlik bulunamadı." : `${filtered.length} etkinlik listeleniyor.`}
            </p>

            <EventList events={filtered} onShowDetail={(id) => go("detail", id)} />
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
              <EventDetail 
                event={selected} 
                onBack={() => go("events")} 
                onEdit={(id) => go("update", id)} 
              />
            )}
          </section>
        )}

        {(page === "add" || page === "update") && (
          <section>
            <h2>{page === "add" ? "Etkinlik Ekle" : "Etkinlik Güncelle"}</h2>
            <p className="bilgi-mesaji">Bu sprintte form sadece görünüm; kayıt yapılmaz.</p>
            <EventForm onSubmit={() => window.scrollTo(0, 0)} />
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;