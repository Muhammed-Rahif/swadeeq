export function getPrayerTimeApiUrl({
  latitude,
  longitude,
  method,
  month,
  year,
}: {
  latitude: number;
  longitude: number;
  method: number;
  month: number;
  year: number;
}) {
  return `https://api.aladhan.com/v1/calendar/${year}/${month}?method=${method}&latitude=${latitude}&longitude=${longitude}&iso8601=true`;
}
