export function getPrayerTimeApiUrl({
  latitude,
  longitude,
  method,
  month,
  year,
  isIso8601 = true,
}: {
  latitude: number;
  longitude: number;
  method: number;
  month: number;
  year: number;
  isIso8601?: boolean;
}) {
  return `https://api.aladhan.com/v1/calendar/${year}/${month}?method=${method}&latitude=${latitude}&longitude=${longitude}&iso8601=${isIso8601}`;
}
