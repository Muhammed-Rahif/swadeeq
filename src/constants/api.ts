/**
 * To get api string for prayer time
 */
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

/**
 * To get api string for youtube search
 */
export function getYouTubeSearchApiUrl({
  query,
  key = process.env.REACT_APP_YOUTUBE_API_KEY,
  channel,
}: {
  query: string;
  key?: string;
  channel?: "assimalhakeem";
}) {
  const channelIds = {
    assimalhakeem: "UCWsdcrre0WbCWML_PnuzoAg",
  };

  let chennelId = channel ? channelIds[channel] : undefined;

  return `https://youtube.googleapis.com/youtube/v3/search?part=snippet${
    chennelId ? `&channelId=${chennelId}` : ""
  }&q=${query}&safeSearch=strict&type=video&key=${key}`;
}
