import { useLocation, matchPath } from 'react-router-dom';
import { useEvents } from '../../context/EventsContext';
import { findEventById } from '../../utils/filter-events';

function Header() {
  const location = useLocation();
  const { events } = useEvents();

  let title = "Kampüs Etkinlikleri";
  let subtitle = "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.";

  const matchDetail = matchPath({ path: "/events/:id", end: true }, location.pathname);
  const matchEdit = matchPath({ path: "/admin/:id/edit", end: true }, location.pathname);

  if (matchEdit) {
    title = "Etkinlik Yönetimi";
    subtitle = "";
  } else if (matchDetail && matchDetail.params.id) {
    const event = findEventById(events, matchDetail.params.id);
    if (event) {
      title = event.title;
      subtitle = `${event.category} · ${event.location}`;
    }
  } else if (location.pathname === "/events") {
    title = "Tüm Etkinlikler";
    subtitle = "Ekim ayında kampüste düzenlenen etkinlikler.";
  } else if (location.pathname === "/admin" || location.pathname === "/admin/new") {
    title = "Etkinlik Yönetimi";
    subtitle = "";
  } else if (location.pathname === "/login") {
    title = "Giriş Yap";
    subtitle = "";
  } else if (location.pathname === "/register") {
    title = "Kayıt Ol";
    subtitle = "";
  } else if (location.pathname === "/forgot-password") {
    title = "Şifremi Unuttum";
    subtitle = "";
  }

  return (
    <div className="baslik-metni">
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}

export default Header;