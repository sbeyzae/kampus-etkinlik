interface EventFormProps {
  onSubmit: () => void;
}

function EventForm({ onSubmit }: EventFormProps) {
  return (
    <form className="etkinlik-formu" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
      <label htmlFor="title">Etkinlik Adı</label>
      <input type="text" id="title" name="title" maxLength={80} placeholder="Örn. Kariyer Günleri 2026" />

      <label htmlFor="form-category">Kategori</label>
      <select id="form-category" name="category">
        <option value="">Seçiniz</option>
        <option value="Seminer">Seminer</option>
        <option value="Atölye">Atölye</option>
        <option value="Söyleşi">Söyleşi</option>
        <option value="Yarışma">Yarışma</option>
      </select>

      <label htmlFor="date">Tarih</label>
      <input type="date" id="date" name="date" />

      <label htmlFor="time">Saat</label>
      <input type="time" id="time" name="time" />

      <label htmlFor="location">Yer</label>
      <input type="text" id="location" name="location" placeholder="Örn. A Blok Konferans Salonu" />

      <label htmlFor="capacity">Kontenjan</label>
      <input type="number" id="capacity" name="capacity" />

      <label htmlFor="description">Açıklama</label>
      <textarea id="description" name="description" rows={5}></textarea>

      <button type="submit">Kaydet</button>
    </form>
  );
}

export default EventForm;