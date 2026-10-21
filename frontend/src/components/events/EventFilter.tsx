import type { Category } from "../../types/campus-event";

interface EventFilterProps {
  searchText: string;
  onSearchChange: (value: string) => void;
  category: Category | "";
  onCategoryChange: (value: Category | "") => void;
  categories: string[];
}

function EventFilter({
  searchText,
  onSearchChange,
  category,
  onCategoryChange,
  categories,
}: EventFilterProps) {
  return (
    <form className="filtre" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="arama">Etkinlik ara</label>
      <input
        type="search"
        id="arama"
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <label htmlFor="kategori">Kategori</label>
      <select
        id="kategori"
        value={category}
        onChange={(e) => onCategoryChange(e.target.value as Category | "")}
      >
        <option value="">Tümü</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </form>
  );
}

export default EventFilter;