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

  const [touched, setTouched] = useState(false);

  // Doğrulama kuralları (hocanın ekran görüntüsündeki metinlerle birebir)
  const isTitleValid = formData.title.trim().length >= 3;
  const isCategoryValid = formData.category !== "";
  const isDateValid = formData.date !== "";
  const isTimeValid = formData.time !== "";
  const isLocationValid = formData.location.trim().length > 0;
  const isCapacityValid = formData.capacity === "" || (Number(formData.capacity) >= 1 && Number(formData.capacity) <= 1000);
  const isDescriptionValid = formData.description.trim().length >= 10;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setTouched(true);

    if (!isTitleValid || !isCategoryValid || !isDateValid || !isTimeValid || !isLocationValid || !isCapacityValid || !isDescriptionValid) {
      return;
    }

    onSubmit(formData);
  }

  const getInputStyle = (isValid: boolean) => ({
    padding: "8px",
    borderRadius: "4px",
    border: `1px solid ${touched && !isValid ? "red" : "#ccc"}`,
    backgroundColor: touched && !isValid ? "#fff5f5" : "white",
    width: "100%"
  });

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px", maxWidth: "500px" }} noValidate>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <label htmlFor="title" style={{ fontWeight: "bold" }}>Etkinlik Adı</label>
        <input 
          type="text" 
          id="title" 
          name="title" 
          value={formData.title} 
          onChange={handleChange} 
          style={getInputStyle(isTitleValid)}
        />
        {touched && !isTitleValid && (
          <p style={{ color: "red", fontSize: "13px", margin: 0 }}>Etkinlik adı en az 3 karakter olmalı.</p>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <label htmlFor="category" style={{ fontWeight: "bold" }}>Kategori</label>
        <select 
          id="category" 
          name="category" 
          value={formData.category} 
          onChange={handleChange}
          style={getInputStyle(isCategoryValid)}
        >
          <option value="">Seçiniz</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        {touched && !isCategoryValid && (
          <p style={{ color: "red", fontSize: "13px", margin: 0 }}>Bir kategori seçin.</p>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <label htmlFor="date" style={{ fontWeight: "bold" }}>Tarih</label>
        <input 
          type="date" 
          id="date" 
          name="date" 
          value={formData.date} 
          onChange={handleChange} 
          style={getInputStyle(isDateValid)}
        />
        {touched && !isDateValid && (
          <p style={{ color: "red", fontSize: "13px", margin: 0 }}>Tarih seçin.</p>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <label htmlFor="time" style={{ fontWeight: "bold" }}>Saat</label>
        <input 
          type="time" 
          id="time" 
          name="time" 
          value={formData.time} 
          onChange={handleChange} 
          style={getInputStyle(isTimeValid)}
        />
        {touched && !isTimeValid && (
          <p style={{ color: "red", fontSize: "13px", margin: 0 }}>Saat seçin.</p>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <label htmlFor="location" style={{ fontWeight: "bold" }}>Yer</label>
        <input 
          type="text" 
          id="location" 
          name="location" 
          value={formData.location} 
          onChange={handleChange} 
          style={getInputStyle(isLocationValid)}
        />
        {touched && !isLocationValid && (
          <p style={{ color: "red", fontSize: "13px", margin: 0 }}>Yer boş olamaz.</p>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <label htmlFor="capacity" style={{ fontWeight: "bold" }}>Kontenjan</label>
        <input 
          type="number" 
          id="capacity" 
          name="capacity" 
          value={formData.capacity} 
          onChange={handleChange} 
          style={getInputStyle(isCapacityValid)}
        />
        {touched && !isCapacityValid && (
          <p style={{ color: "red", fontSize: "13px", margin: 0 }}>Kontenjan 1 ile 1000 arasında bir tam sayı olmalı.</p>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <label htmlFor="description" style={{ fontWeight: "bold" }}>Açıklama</label>
        <textarea 
          id="description" 
          name="description" 
          rows={4}
          value={formData.description} 
          onChange={handleChange} 
          style={getInputStyle(isDescriptionValid)}
        />
        {touched && !isDescriptionValid && (
          <p style={{ color: "red", fontSize: "13px", margin: 0 }}>Açıklama en az 10 karakter olmalı.</p>
        )}
      </div>

      <div style={{ marginTop: "10px" }}>
        <button type="submit" className="buton">{submitButtonText}</button>
      </div>
    </form>
  );
}