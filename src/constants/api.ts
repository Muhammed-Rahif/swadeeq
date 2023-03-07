export function getPrayerTimeApiUrl({
  latitude,
  longitude,
  method = 4,
  day,
  month,
  year,
  isIso8601 = true,
}: {
  latitude: number;
  longitude: number;
  day: number;
  month: number;
  year: number;
  method?: number;
  isIso8601?: boolean;
}) {
  return `https://api.aladhan.com/v1/timings/${day}-${month}-${year}?method=${method}&latitude=${latitude}&longitude=${longitude}&iso8601=${isIso8601}`;
}
