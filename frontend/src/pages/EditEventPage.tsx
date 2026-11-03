import { useParams, useNavigate } from 'react-router-dom';
import { useEvents, type EventFormData } from '../context/EventsContext';
import { findEventById } from '../utils/filter-events';
import EventForm from '../components/events/EventForm';
import NotFoundPage from './NotFoundPage';

function EditEventPage() {
  const { id } = useParams<{ id: string }>();
  const { events, updateEvent } = useEvents();
  const navigate = useNavigate();

  const event = findEventById(events, id ?? "");

  if (!event) {
    return <NotFoundPage />;
  }

  // CampusEvent verisini EventFormData formatına dönüştürüyoruz
  const initialData: EventFormData = {
    title: event.title,
    category: event.category,
    date: event.date,
    time: event.time,
    location: event.location,
    capacity: event.capacity ? String(event.capacity) : "",
    description: event.description,
  };

  function handleFormSubmit(data: EventFormData) {
    updateEvent(event!.id, data);
    navigate('/admin');
  }

  return (
    <section>
      <EventForm initialData={initialData} onSubmit={handleFormSubmit} submitButtonText="Değişiklikleri Kaydet" />
    </section>
  );
}

export default EditEventPage;