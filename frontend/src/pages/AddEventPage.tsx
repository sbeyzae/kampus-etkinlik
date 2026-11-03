import { useNavigate } from 'react-router-dom';
import { useEvents, type EventFormData } from '../context/EventsContext';
import EventForm from '../components/events/EventForm';

function AddEventPage() {
  const { addEvent } = useEvents();
  const navigate = useNavigate();

  function handleFormSubmit(data: EventFormData) {
    addEvent(data);
    navigate('/admin');
  }

  return (
    <section>
      <EventForm onSubmit={handleFormSubmit} submitButtonText="Etkinliği Ekle" />
    </section>
  );
}

export default AddEventPage;