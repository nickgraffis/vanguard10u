import fs from "fs";
import { dates as currDates } from "./dates.mjs";
/**
 * Sample:
 * { date: '2021-12-27', events: [] },
    { date: '2021-12-28', events: [] },
    { date: '2021-12-29', events: [] },
    { date: '2021-12-30', events: [] },
    { date: '2021-12-31', events: [] },
    { date: '2022-01-01', isCurrentMonth: true, events: [] },
    { date: '2022-01-02', isCurrentMonth: true, events: [] },
    {
      date: '2022-01-03',
      isCurrentMonth: true,
      events: [
        { id: 1, name: 'Design review', time: '10AM', datetime: '2022-01-03T10:00', href: '#' },
        { id: 2, name: 'Sales meeting', time: '2PM', datetime: '2022-01-03T14:00', href: '#' },
      ],
    },
 */

// starting from September 2023 create an array of dates in the format above
// for each date, if it is tuesday, wednesday, thursday, or friday
// we need to add the following event:
/**
 * { id: id, name: '10U Practice 5 - 6:30 PM', time: '5PM', datetime, href: '#' },
 */

const dates = [];

const startDate = new Date("2023-09-04");
const endDate = new Date("2024-01-31");

const addEvent = (date, id) => {
  console.log("Original date object:", date);
  console.log("Time zone offset in minutes:", date.getTimezoneOffset());

  const day = date.getDay();
  console.log("Day of the week:", day);

  const datetime = date.toISOString();
  console.log("Date in ISO format:", datetime);

  if (day === 2 || day === 3 || day === 4 || day === 5) {
    const datetime = date.toISOString();
    dates.push({
      date: datetime.slice(0, 10),
      events: [
        {
          id,
          name: "10U Practice 5 - 6:30 PM",
          time: "5PM",
          datetime,
          href: "#",
        },
      ],
    });
  } else {
    dates.push({
      date: date.toISOString().slice(0, 10),
      events: [],
    });
  }
};

const addDates = (startDate, endDate) => {
  // create every date from start to end
  // and only add events for tuesday, wednesday, thursday, friday
  // make sure we use the current timezone
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);

  let currentDate = startDate;
  let id = 1;
  while (currentDate <= endDate) {
    addEvent(currentDate, id);
    currentDate.setDate(currentDate.getDate() + 1);
    id++;
  }
};

// addDates(startDate, endDate);

// update the current calendar (dates)
// by adding events for all of the holidays,
// events should have an emoji key with the emoji to display

const holidays = [
  {
    date: "2023-09-04",
    emoji: "🇺🇸",
    name: "Labor Day",
  },
  {
    date: "2023-10-31",
    emoji: "🎃",
    name: "Halloween",
  },
  {
    date: "2023-11-11",
    emoji: "🇺🇸",
    name: "Veterans Day",
  },
  {
    date: "2023-11-23",
    emoji: "🦃",
    name: "Thanksgiving",
  },
  {
    date: "2023-11-24",
    emoji: "🦃",
    name: "Thanksgiving",
  },
  {
    date: "2023-12-08",
    emoji: "🕎",
    name: "First day of Hanukkah",
  },
  {
    date: "2023-12-22",
    emoji: "❄️",
    name: "Winter Break",
  },
  {
    date: "2023-12-23",
    emoji: "❄️",
    name: "Winter Break",
  },
  {
    date: "2023-12-24",
    emoji: "🎄",
    name: "Christmas Eve",
  },
  {
    date: "2023-12-25",
    emoji: "🎄",
    name: "Christmas",
  },
  {
    date: "2023-12-26",
    name: "Kwanzaa",
  },
  {
    date: "2023-12-27",
    emoji: "❄️",
    name: "Winter Break",
  },
  {
    date: "2023-12-28",
    emoji: "❄️",
    name: "Winter Break",
  },
  {
    date: "2023-12-29",
    emoji: "❄️",
    name: "Winter Break",
  },
  {
    date: "2023-12-30",
    emoji: "❄️",
    name: "Winter Break",
  },
  {
    date: "2023-12-31",
    emoji: "❄️",
    name: "Winter Break",
  },
  {
    date: "2024-01-01",
    emoji: "🎉",
    name: "New Year's Day",
  },
  {
    date: "2024-01-02",
    emoji: "❄️",
    name: "Winter Break",
  },
  {
    date: "2024-01-03",
    emoji: "❄️",
    name: "Winter Break",
  },
  {
    date: "2024-01-04",
    emoji: "❄️",
    name: "Winter Break",
  },
  {
    date: "2024-01-05",
    emoji: "❄️",
    name: "Winter Break",
  },
  {
    date: "2024-01-06",
    emoji: "❄️",
    name: "Winter Break",
  },
  {
    date: "2024-01-07",
    emoji: "❄️",
    name: "Winter Break",
  },
  {
    date: "2024-01-08",
    emoji: "❄️",
    name: "Winter Break",
  },
];

const datesWithHolidays = currDates.map((date) => {
  const holiday = holidays.find((holiday) => holiday.date === date.date);
  if (holiday) {
    date.events.push({
      id: 1,
      name: holiday.name,
      emoji: holiday.emoji,
      time: "",
      datetime: "",
      href: "#",
    });
  }
  return date;
});

fs.writeFileSync(
  "dates.mjs",
  `export const dates = ${JSON.stringify(datesWithHolidays, null, 2)};`
);
