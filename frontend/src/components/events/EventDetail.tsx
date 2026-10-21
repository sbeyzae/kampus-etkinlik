import type { CampusEvent } from "../../types/campus-event";

interface EventDetailProps {
  event: CampusEvent;
  onBack: () => void;
  onEdit: (id: string) => void;
}

function EventDetail({ event, onBack, onEdit }: EventDetailProps) {
  return (
    <article className="detay">
      <h2>{event.title}</h2>
      <div className="detay-icerik">
        {event.image && (
          <figure>
            <img src={event.image} alt={`${event.title} afişi`} />
          </figure>
        )}
        <dl className="kunye">
          <dt>Tarih</dt>
          <dd>{event.date}, {event.time}</dd>
          <dt>Yer</dt>
          <dd>{event.location}</dd>
          <dt>Kategori</dt>
          <dd>{event.category}</dd>
          {event.capacity && (
            <>
              <dt>Kontenjan</dt>
              <dd>{event.capacity} kişi</dd>
            </>
          )}
        </dl>
      </div>
      <div className="aciklama">
        <h3>Açıklama</h3>
        <p>{event.description}</p>
      </div>
      <div className="butonlar">
        <button onClick={onBack}>&larr; Listeye dön</button>
        <button onClick={() => onEdit(event.id)}>Bu etkinliği güncelle</button>
      </div>
    </article>
  );
}

export default EventDetail;