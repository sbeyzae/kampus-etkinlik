import type { PageName } from "../../types/page.ts";
interface NavigationProps {
  current: PageName;
  onNavigate: (page: PageName) => void;
}

function Navigation({ current, onNavigate }: NavigationProps) {
  return (
    <nav className="menu">
      <a 
        href="#" 
        className={current === "home" ? "aktif" : ""} 
        onClick={(e) => { e.preventDefault(); onNavigate("home"); }}
      >
        Ana Sayfa
      </a>
      <a 
        href="#" 
        className={current === "events" ? "aktif" : ""} 
        onClick={(e) => { e.preventDefault(); onNavigate("events"); }}
      >
        Etkinlikler
      </a>
      <a 
        href="#" 
        className={(current === "add" || current === "update") ? "aktif" : ""} 
        onClick={(e) => { e.preventDefault(); onNavigate("add"); }}
      >
        Ekle
      </a>
    </nav>
  );
}

export default Navigation;