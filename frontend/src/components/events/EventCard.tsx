import { Link } from 'react-router-dom';
import type { CampusEvent } from '../../types/campus-event';

interface EventCardProps {
  event: CampusEvent;
}

function EventCard({ event }: EventCardProps) {
  return (
    <article className="kart">
      <h2>{event.title}</h2>
      <p className="kategori">{event.category}</p>
      <p>Tarih: {event.date}, {event.time}</p>
      <p>Yer: {event.location}</p>
      {event.capacity && <p>Kontenjan: {event.capacity} kişi</p>}
      <p>{event.description}</p>
      <Link to={`/events/${event.id}`} className="detay-link">
        Detayları gör
      </Link>
    </article>
  );
}

export default EventCard;