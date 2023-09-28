<template>
    <div class="lg:flex lg:h-full lg:flex-col">
      <header class="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 px-6 py-4 lg:flex-none">
        <h1 class="text-base font-semibold leading-6 text-slate-900 dark:text-slate-200">
          <time datetime="2022-01">{{  months[currMonth] }} {{ currYear }}</time>
        </h1>
        <div class="flex items-center">
          <div class="relative flex items-center rounded-md bg-white dark:bg-slate-800 shadow-sm md:items-stretch">
            <button v-on:click="prevMonth()" type="button" class="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-slate-300 dark:border-slate-700 pr-1 text-slate-400 dark:text-slate-300 hover:text-slate-500 dark:hover:text-slate-400 focus:relative md:w-9 md:pr-0 md:hover:bg-slate-50 dark:md:hover:bg-slate-700">
              <span class="sr-only">Previous month</span>
              <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
            </button>
            <button type="button" class="hidden border-y border-slate-300 dark:border-slate-700 px-3.5 text-sm font-semibold text-slate-900 dark:text-slate-200 hover:bg-slate-50 dark:bg-slate-700 focus:relative md:block">Today</button>
            <span class="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
            <button v-on:click="nextMonth()" type="button" class="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-slate-300 dark:border-slate-700 pl-1 text-slate-400 dark:text-slate-300 hover:text-slate-500 dark:hover:text-slate-400 focus:relative md:w-9 md:pl-0 md:hover:bg-slate-50 dark:md:hover:bg-slate-700">
              <span class="sr-only">Next month</span>
              <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>
      <div class="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
        <div class="grid grid-cols-7 gap-px border-b border-slate-300 dark:border-slate-700 bg-gray-200 text-center text-xs font-semibold leading-6 text-slate-700 dark:text-slate-400 lg:flex-none">
          <div class="bg-white dark:bg-slate-800 py-2">M<span class="sr-only sm:not-sr-only">on</span></div>
          <div class="bg-white dark:bg-slate-800 py-2">T<span class="sr-only sm:not-sr-only">ue</span></div>
          <div class="bg-white dark:bg-slate-800 py-2">W<span class="sr-only sm:not-sr-only">ed</span></div>
          <div class="bg-white dark:bg-slate-800 py-2">T<span class="sr-only sm:not-sr-only">hu</span></div>
          <div class="bg-white dark:bg-slate-800 py-2">F<span class="sr-only sm:not-sr-only">ri</span></div>
          <div class="bg-white dark:bg-slate-800 py-2">S<span class="sr-only sm:not-sr-only">at</span></div>
          <div class="bg-white dark:bg-slate-800 py-2">S<span class="sr-only sm:not-sr-only">un</span></div>
        </div>
        <div class="flex bg-slate-200 text-xs leading-6 text-slate-700 dark:text-slate-400 lg:flex-auto">
          <div class="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
            <div v-for="day in days" :key="day.date" :class="[day.isCurrentMonth ? 'bg-white dark:bg-slate-800' : 'bg-slate-50 dark:bg-slate-700 text-gray-500', 'relative px-3 py-2']">
              <time :datetime="day.date" :class="day.date == selectedDay?.date ? 'flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white' : undefined">{{ day.date.split('-').pop().replace(/^0/, '') }}</time>
              <ol v-if="day.events.length > 0" class="mt-2">
                <li v-for="event in day.events.slice(0, 2)" :key="event.id">
                  <a :href="event.href" class="group flex">
                    <p :class="event?.canceled ? 'line-through' : ''" class="flex-auto truncate font-medium text-slate-900 dark:text-slate-200 group-hover:text-indigo-600">
                      {{ event.name }}
                    </p>
                    <time :datetime="event.datetime" class="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block">{{ event.time }}</time>
                  </a>
                </li>
                <li v-if="day.events.length > 2" class="text-gray-500">+ {{ day.events.length - 2 }} more</li>
              </ol>
            </div>
          </div>
          <div class="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
            <button v-on:click="selectDay(day)" v-for="day in days" :key="day.date" type="button" :class="[day.isCurrentMonth ? 'bg-white dark:bg-slate-800' : 'bg-slate-50 dark:bg-slate-700', (day.isSelected || day.isToday) && 'font-semibold', day.isSelected && 'text-white', !day.isSelected && day.isToday && 'text-indigo-600', !day.isSelected && day.isCurrentMonth && !day.isToday && 'text-slate-900 dark:text-slate-200', !day.isSelected && !day.isCurrentMonth && !day.isToday && 'text-gray-500', 'flex h-14 flex-col px-3 py-2 hover:bg-slate-100 dark:bg-slate-700 focus:z-10']">
              <time :datetime="day.date" :class="[day.isSelected && 'flex h-6 w-6 items-center justify-center rounded-full', day.isSelected && day.isToday && 'bg-indigo-600', day.isSelected && !day.isToday && 'bg-gray-900', 'ml-auto']">{{ day.date.split('-').pop().replace(/^0/, '') }}</time>
              <span class="sr-only">{{ day.events.length }} events</span>
              <span v-if="day.events.length > 0" class="-mx-0.5 mt-auto flex flex-wrap-reverse">
                <span v-for="event in day.events.filter(e => !e.emoji)" :key="event.id" class="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400" />
                    <span v-for="event in day.events.filter(e => e.emoji)" :key="event.id" class="mx-0.5">
                    {{  event.emoji }}
                    </span>
              </span>
            </button>
          </div>
        </div>
      </div>
      <h1> {{ selectedDay?.date }} </h1>
      <div v-if="selectedDay?.events.length > 0" class="py-10 sm:px-6 lg:hidden">
        <ol class="divide-y divide-gray-100 overflow-hidden bg-white dark:bg-slate-800 text-sm shadow ring-1 ring-black ring-opacity-5">
          <li v-for="event in selectedDay.events" :key="event.id" class="group flex p-4 pr-6 focus-within:bg-slate-50 dark:bg-slate-700 hover:bg-slate-50 dark:bg-slate-700">
            <div class="flex-auto">
              <p class="font-semibold text-slate-900 dark:text-slate-200" :class="event?.canceled ? 'line-through' : ''">{{ event.name }}</p>
              <time :datetime="event.datetime" class="mt-2 flex items-center text-slate-700 dark:text-slate-400">
                <ClockIcon class="mr-2 h-5 w-5 text-slate-400 dark:text-slate-300" aria-hidden="true" />
                {{ event.time }}
              </time>
            </div>
            <a :href="event.href" class="ml-6 flex-none self-center rounded-md bg-white dark:bg-slate-800 px-3 py-2 font-semibold text-slate-900 dark:text-slate-200 opacity-0 shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-700 hover:ring-gray-400 focus:opacity-100 group-hover:opacity-100"
              >Edit<span class="sr-only">, {{ event.name }}</span></a
            >
          </li>
        </ol>
      </div>
    </div>
  </template>
  
  <script setup>
  import './style.css'
  import { dates } from '../../dates.mjs'
  import {
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ClockIcon,
    EllipsisHorizontalIcon,
  } from '@heroicons/vue/20/solid'
  import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { computed, ref } from 'vue';
const selectedDay = ref(null);
const selectDay = (day) => {
    selectedDay.value = day;
  };
  
  const currMonth = ref(new Date().getMonth())
  const currYear = ref(new Date().getFullYear())
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const nextMonth = () => {
    if (currMonth.value === 0) return
    if (currMonth.value === 11) currYear.value = (currYear.value + 1) 
    currMonth.value = (currMonth.value + 1) % 12
    
  }
  const prevMonth = () => {
    // if we are going past September, do nothing
    if (currMonth.value === 8) return
    if (currMonth.value === 0) currYear.value = (currYear.value - 1)
    currMonth.value = (currMonth.value - 1 + 12) % 12
  }
//   const days = [
//     { date: '2021-12-27', events: [] },
//     { date: '2021-12-28', events: [] },
//     { date: '2021-12-29', events: [] },
//     { date: '2021-12-30', events: [] },
//     { date: '2021-12-31', events: [] },
//     { date: '2022-01-01', isCurrentMonth: true, events: [] },
//     { date: '2022-01-02', isCurrentMonth: true, events: [] },
//     {
//       date: '2022-01-03',
//       isCurrentMonth: true,
//       events: [
//         { id: 1, name: 'Design review', time: '10AM', datetime: '2022-01-03T10:00', href: '#' },
//         { id: 2, name: 'Sales meeting', time: '2PM', datetime: '2022-01-03T14:00', href: '#' },
//       ],
//     },
//     { date: '2022-01-04', isCurrentMonth: true, events: [] },
//     { date: '2022-01-05', isCurrentMonth: true, events: [] },
//     { date: '2022-01-06', isCurrentMonth: true, events: [] },
//     {
//       date: '2022-01-07',
//       isCurrentMonth: true,
//       events: [{ id: 3, name: 'Date night', time: '6PM', datetime: '2022-01-08T18:00', href: '#' }],
//     },
//     { date: '2022-01-08', isCurrentMonth: true, events: [] },
//     { date: '2022-01-09', isCurrentMonth: true, events: [] },
//     { date: '2022-01-10', isCurrentMonth: true, events: [] },
//     { date: '2022-01-11', isCurrentMonth: true, events: [] },
//     {
//       date: '2022-01-12',
//       isCurrentMonth: true,
//       isToday: true,
//       events: [{ id: 6, name: "Sam's birthday party", time: '2PM', datetime: '2022-01-25T14:00', href: '#' }],
//     },
//     { date: '2022-01-13', isCurrentMonth: true, events: [] },
//     { date: '2022-01-14', isCurrentMonth: true, events: [] },
//     { date: '2022-01-15', isCurrentMonth: true, events: [] },
//     { date: '2022-01-16', isCurrentMonth: true, events: [] },
//     { date: '2022-01-17', isCurrentMonth: true, events: [] },
//     { date: '2022-01-18', isCurrentMonth: true, events: [] },
//     { date: '2022-01-19', isCurrentMonth: true, events: [] },
//     { date: '2022-01-20', isCurrentMonth: true, events: [] },
//     { date: '2022-01-21', isCurrentMonth: true, events: [] },
//     {
//       date: '2022-01-22',
//       isCurrentMonth: true,
//       isSelected: true,
//       events: [
//         { id: 4, name: 'Maple syrup museum', time: '3PM', datetime: '2022-01-22T15:00', href: '#' },
//         { id: 5, name: 'Hockey game', time: '7PM', datetime: '2022-01-22T19:00', href: '#' },
//       ],
//     },
//     { date: '2022-01-23', isCurrentMonth: true, events: [] },
//     { date: '2022-01-24', isCurrentMonth: true, events: [] },
//     { date: '2022-01-25', isCurrentMonth: true, events: [] },
//     { date: '2022-01-26', isCurrentMonth: true, events: [] },
//     { date: '2022-01-27', isCurrentMonth: true, events: [] },
//     { date: '2022-01-28', isCurrentMonth: true, events: [] },
//     { date: '2022-01-29', isCurrentMonth: true, events: [] },
//     { date: '2022-01-30', isCurrentMonth: true, events: [] },
//     { date: '2022-01-31', isCurrentMonth: true, events: [] },
//     { date: '2022-02-01', events: [] },
//     { date: '2022-02-02', events: [] },
//     { date: '2022-02-03', events: [] },
//     {
//       date: '2022-02-04',
//       events: [{ id: 7, name: 'Cinema with friends', time: '9PM', datetime: '2022-02-04T21:00', href: '#' }],
//     },
//     { date: '2022-02-05', events: [] },
//     { date: '2022-02-06', events: [] },
//   ]

const days = computed(() => {
  const days = [];
  const firstDayInCurrentMonth = new Date(currYear.value, currMonth.value, 1);
  const lastDayInCurrentMonth = new Date(currYear.value, currMonth.value + 1, 0);
  const numOfDaysInCurrentMonth = lastDayInCurrentMonth.getDate();

  // Calculate the number of days to show from the previous month to start the calendar on a Monday
  let firstDayOfWeek = firstDayInCurrentMonth.getDay();
  const numOfDaysFromPrevMonth = (firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1); // 0 is Sunday

  // Calculate the number of days to show from the next month to end the calendar on a Sunday
  let lastDayOfWeek = lastDayInCurrentMonth.getDay();
  const numOfDaysFromNextMonth = (lastDayOfWeek === 0 ? 0 : 7 - lastDayOfWeek); // 0 is Sunday

  // Previous month information
  const prevMonth = new Date(currYear.value, currMonth.value - 1, 1);
  const lastDateInPrevMonth = new Date(currYear.value, currMonth.value, 0).getDate();

  // Next month information
  const nextMonth = new Date(currYear.value, currMonth.value + 1, 1);

  // Helper function to format date strings
  const formatDate = (year, month, day) => `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  // Add days from the previous month
  for (let i = 0; i < numOfDaysFromPrevMonth; i++) {
    const day = lastDateInPrevMonth - i;
    const dateStr = formatDate(prevMonth.getFullYear(), prevMonth.getMonth() + 1, day);
    days.unshift({
      date: dateStr,
      isCurrentMonth: false,
      events: dates.find((date) => date.date === dateStr)?.events ?? [],
    });
  }

  // Add days from the current month
  for (let i = 1; i <= numOfDaysInCurrentMonth; i++) {
    const dateStr = formatDate(currYear.value, currMonth.value + 1, i);
    days.push({
      date: dateStr,
      isCurrentMonth: true,
      events: dates.find((date) => date.date === dateStr)?.events ?? [],
    });
  }

  // Add days from the next month
  for (let i = 1; i <= numOfDaysFromNextMonth; i++) {
    const dateStr = formatDate(nextMonth.getFullYear(), nextMonth.getMonth() + 1, i);
    days.push({
      date: dateStr,
      isCurrentMonth: false,
      events: dates.find((date) => date.date === dateStr)?.events ?? [],
    });
  }

  return days;
});
  </script>