import { useState, type FormEvent } from 'react';
import type { EventFormData } from '../../context/EventsContext';
import type { Category } from '../../types/campus-event';

interface EventFormProps {
  initialData?: EventFormData;
  onSubmit: (data: EventFormData) => void;
  submitButtonText?: string;
}

const categories: Category[] = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];

export default function EventForm({ initialData, onSubmit, submitButtonText = "Kaydet" }: EventFormProps) {
  const [formData, setFormData] = useState<EventFormData>(
    initialData || {
      title: "",
      category: "",
      date: "",
      time: "",
      location: "",
      capacity: "",
      description: "",
    }
  );

  const [error, setError] = useState<string>("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!formData.title.trim() || !formData.category || !formData.date || !formData.time || !formData.location || !formData.description) {
      setError("Lütfen tüm zorunlu alanları doldurun.");
      return;
    }

    setError("");
    onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px", maxWidth: "500px" }}>
      {error && <p style={{ color: "red", margin: 0 }}>{error}</p>}
      
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <label htmlFor="title" style={{ fontWeight: "bold" }}>Etkinlik Adı *</label>
        <input 
          type="text" 
          id="title" 
          name="title" 
          value={formData.title} 
          onChange={handleChange} 
          style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <label htmlFor="category" style={{ fontWeight: "bold" }}>Kategori *</label>
        <select 
          id="category" 
          name="category" 
          value={formData.category} 
          onChange={handleChange}
          style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc", background: "white" }}
        >
          <option value="">Kategori Seçin</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <label htmlFor="date" style={{ fontWeight: "bold" }}>Tarih *</label>
        <input 
          type="date" 
          id="date" 
          name="date" 
          value={formData.date} 
          onChange={handleChange} 
          style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <label htmlFor="time" style={{ fontWeight: "bold" }}>Saat *</label>
        <input 
          type="time" 
          id="time" 
          name="time" 
          value={formData.time} 
          onChange={handleChange} 
          style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <label htmlFor="location" style={{ fontWeight: "bold" }}>Yer *</label>
        <input 
          type="text" 
          id="location" 
          name="location" 
          value={formData.location} 
          onChange={handleChange} 
          style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <label htmlFor="capacity" style={{ fontWeight: "bold" }}>Kontenjan</label>
        <input 
          type="number" 
          id="capacity" 
          name="capacity" 
          value={formData.capacity} 
          onChange={handleChange} 
          style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <label htmlFor="description" style={{ fontWeight: "bold" }}>Açıklama *</label>
        <textarea 
          id="description" 
          name="description" 
          rows={4}
          value={formData.description} 
          onChange={handleChange} 
          style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
      </div>

      <div>
        <button type="submit" className="buton">{submitButtonText}</button>
      </div>
    </form>
  );
}