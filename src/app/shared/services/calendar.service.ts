import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CalendarDay } from '../models/calendar-view';
import { DailyMenuBreakdown, MenuBreakdown } from '../models/menubreakdown';

@Injectable({ providedIn: 'root' })
export class CalendarService {
  DAYS = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  month!: any;
  year: any;
  day: any;
  activeDate = new Date();

  calendarSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  calendar$ = this.calendarSubject.asObservable();

  activeDateSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  activeDate$ = this.activeDateSubject.asObservable();
  menuBreakdown: DailyMenuBreakdown = {
    id: 0,
    date: new Date(),
    totals: [],
  };

  calendar: CalendarDay[] = [];
  id: number;
  renderingEmptySlots: number = 0;

  constructor() {}
  ngOnInit() {}
  // Calculate  day of the year and calculate week of the year
  changeMonth(date: Date) {
    this.activeDateSubject.next(date);
  }
  setActiveDate(date: Date) {
    this.activeDate = date;
    this.activeDateSubject.next(this.activeDate);
  }
  resetCalendarByValue() {
    this.calendar = [];
    this.renderingEmptySlots = 0;
    1;
  }

  loadCalendar(date: Date) {
    this.resetCalendarByValue();
    const today: Date = date;
    this.day = today.getDate();
    this.month = today.getMonth();
    this.year = today.getFullYear();
    const DAYS_OF_WEEK = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    // Days total in current Month
    const monthDays = new Date(this.year, this.month + 1, 0);
    const totalDays = Number(
      monthDays.toLocaleDateString('en-us', {
        day: '2-digit',
      })
    );
    // Name of current day of the month
    // First day of the month(For 1. We need to figure blank days)
    const firstDayOfMonth = new Date(this.year, this.month, 1);
    const lastDayOfMonth = new Date(this.year, this.month + 1, 0);
    const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
    const firstDayString = firstDayOfMonth.toLocaleDateString('en-us', {
      weekday: 'long',
    });
    const lastDayString = lastDayOfMonth.toLocaleDateString('en-us', {
      weekday: 'long',
    });
    const blankDays = DAYS_OF_WEEK.indexOf(firstDayString);
    const finalBlankDays = DAYS_OF_WEEK.indexOf(firstDayString) - 1;
    const afterMonthDays = 6 - DAYS_OF_WEEK.indexOf(lastDayString);
    this.renderingEmptySlots = 0;
    this.renderingEmptySlots = finalBlankDays;
    //blank squares starting rendering
    if (this.renderingEmptySlots >= 6) {
      this.renderingEmptySlots = 0;
    } else {
      for (let i = 0; i <= this.renderingEmptySlots; i++) {
        const day = i + 1;
        const date = new Date(this.year, this.month, i + 1);
        const stringDay = new Date(
          this.year,
          this.month,
          i + 1
        ).toLocaleDateString('en-us', {
          weekday: 'short',
        });
        const dayId = `${date.toLocaleDateString('en-us', {
          day: '2-digit',
        })}`;
        const month = `${date.toLocaleDateString('en-us', {
          month: '2-digit',
        })}`;
        const year = `${date.getFullYear()}`;

        this.id = Number(`${year}${month}${dayId}`);

        this.calendar.push({
          day: `${day}`,
          dayName: `${stringDay}`,
          date: date,
          disabled: true,
          id: this.id,
        });
      }
    }
    //Days of the Month Render
    for (let i = 0; i < totalDays; i++) {
      const day = i + 1;
      const date = new Date(this.year, this.month, i + 1);
      const stringDay = new Date(
        this.year,
        this.month,
        i + 1
      ).toLocaleDateString('en-us', {
        weekday: 'short',
      });
      const dayId = `${date.toLocaleDateString('en-us', {
        day: '2-digit',
      })}`;
      const month = `${date.toLocaleDateString('en-us', {
        month: '2-digit',
      })}`;
      const year = `${date.getFullYear()}`;

      this.id = Number(`${year}${month}${dayId}`);
      this.calendar.push({
        day: `${day}`,
        dayName: `${stringDay}`,
        date: new Date(this.year, this.month, Number(i + 1)),
        id: this.id,
      });
    }

    for (let i = 0; i < afterMonthDays; i++) {
      const date = new Date(this.year, this.month + 1, i + 1);
      const dayString = date.toLocaleDateString('en-us', {
        weekday: 'short',
      });
      const dayId = `${date.toLocaleDateString('en-us', {
        day: '2-digit',
      })}`;
      const month = `${date.toLocaleDateString('en-us', {
        month: '2-digit',
      })}`;
      const year = `${date.getFullYear()}`;

      this.id = Number(`${year}${month}${dayId}`);
      this.calendar.push({
        day: `${date.getDate()}`,
        dayName: `${dayString}`,
        date: date,
        disabled: true,
        id: this.id,
      });
    }
    this.calendarSubject.next(this.calendar);
  }

  setCalendar(calendar: CalendarDay[]) {
    this.calendarSubject.next(calendar);
  }
}
