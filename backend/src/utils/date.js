export function parseDate(value) {
  if (typeof value !== "string") return value;
  const m = /^(\d{2})-(\d{2})-(\d{4})$/.exec(value.trim());
  if (!m) return new Date(NaN);

  const [, gun, ay, yil] = m.map(Number);
  const tarih = new Date(Date.UTC(yil, ay - 1, gun));

  if (
    tarih.getUTCFullYear() !== yil ||
    tarih.getUTCMonth() !== ay - 1 ||
    tarih.getUTCDate() !== gun
  ) {
    return new Date(NaN);
  }
  return tarih;
}

export function formatDate(tarih) {
  if (!(tarih instanceof Date) || Number.isNaN(tarih.getTime())) return tarih;
  const gun = String(tarih.getUTCDate()).padStart(2, "0");
  const ay = String(tarih.getUTCMonth() + 1).padStart(2, "0");
  const yil = tarih.getUTCFullYear();
  return `${gun}-${ay}-${yil}`;
}

export function todayStart() {
  const s = new Date();
  return new Date(Date.UTC(s.getUTCFullYear(), s.getUTCMonth(), s.getUTCDate()));
}