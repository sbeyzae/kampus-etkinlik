import { useState } from 'react';
import { useEvents } from '../context/EventsContext';
import type { Category } from '../types/campus-event';
import { filterByCategory, searchEvents } from '../utils/filter-events';
import EventFilter from '../components/events/EventFilter';
import EventList from '../components/events/EventList';

function EventsPage() {
  const { events } = useEvents();
  
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  const categories = [...new Set(events.map(e => e.category))];
  const filtered = filterByCategory(searchEvents(events, searchText), category);

  return (
    <div className="etkinlikler-sayfasi">
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

      <EventList events={filtered} />
    </div>
  );
}

export default EventsPage;