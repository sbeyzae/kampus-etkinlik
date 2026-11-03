import { Link, useNavigate } from 'react-router-dom';
import { useEvents } from '../context/EventsContext';

function AdminPage() {
  const { events, deleteEvent } = useEvents();
  const navigate = useNavigate();

  return (
    <section style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div>
        <Link to="/admin/new" className="buton">+ Yeni etkinlik</Link>
      </div>

      <table className="yonetim-tablosu" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Etkinlik</th>
            <th>Tarih</th>
            <th>Kategori</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.title}</td>
              <td>{event.date}</td>
              <td>{event.category}</td>
              <td>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button 
                    className="buton" 
                    onClick={() => navigate(`/admin/${event.id}/edit`)}
                  >
                    Düzenle
                  </button>
                  <button 
                    className="buton sil-buton" 
                    onClick={() => {
                      if (window.confirm(`"${event.title}" etkinliğini silmek istediğinize emin misiniz?`)) {
                        deleteEvent(event.id);
                      }
                    }}
                    style={{ backgroundColor: "#b91c1c", color: "white" }}
                  >
                    Sil
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default AdminPage;