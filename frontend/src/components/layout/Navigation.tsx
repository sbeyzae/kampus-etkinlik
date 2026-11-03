import { NavLink } from 'react-router-dom';

function Navigation() {
  // Aktif sekmeye özel stil fonksiyonu (hocanın tasarımındaki beyaz kutu görünümü)
  const getNavLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    backgroundColor: isActive ? "#ffffff" : "transparent",
    color: isActive ? "#333333" : "#ffffff",
    padding: "6px 12px",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: isActive ? "bold" : "normal",
  });

  return (
    <nav style={{ display: "flex", gap: "20px", marginTop: "15px" }}>
      <NavLink to="/" style={getNavLinkStyle} end>
        Ana Sayfa
      </NavLink>
      <NavLink to="/events" style={getNavLinkStyle}>
        Etkinlikler
      </NavLink>
      <NavLink to="/admin" style={getNavLinkStyle}>
        Yönetim
      </NavLink>
      <NavLink to="/login" style={getNavLinkStyle}>
        Giriş
      </NavLink>
    </nav>
  );
}

export default Navigation;