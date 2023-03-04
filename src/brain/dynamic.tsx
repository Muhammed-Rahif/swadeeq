import PrayerTimesTable from "../components/PrayerTimesTable";

const dynamics: { [key: string]: () => JSX.Element } = {
  GET_PRAYER_TIMES: PrayerTimesTable,
};

export default dynamics;
