import { Link } from 'react-router-dom';
import { useEvents } from '../context/EventsContext';
import EventList from '../components/events/EventList';

function HomePage() {
  const { events } = useEvents();

  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  return (
    <section style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <h2 className="bolum-baslik">Yaklaşan 2 Etkinlik</h2>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <EventList events={upcoming} />
        <div>
          <Link className="buton" to="/events">Tüm etkinlikleri gör</Link>
        </div>
      </div>
    </section>
  );
}

export default HomePage;