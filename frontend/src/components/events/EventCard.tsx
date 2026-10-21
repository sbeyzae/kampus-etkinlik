import type { CampusEvent } from "../../types/campus-event";

interface EventCardProps {
  event: CampusEvent;
  onShowDetail: (id: string) => void;
}

function EventCard({ event, onShowDetail }: EventCardProps) {
  return (
    <article className="kart">
      <h2>{event.title}</h2>
      <p className="kategori">{event.category}</p>
      <p>Tarih: {event.date}, {event.time}</p>
      <p>Yer: {event.location}</p>
      {event.capacity && <p>Kontenjan: {event.capacity} kişi</p>}
      <p>{event.description}</p>
      <a 
        href="#" 
        className="detay-link" 
        onClick={(e) => { e.preventDefault(); onShowDetail(event.id); }}
      >
        Detayları gör
      </a>
    </article>
  );
}

export default EventCard;