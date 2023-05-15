export const DAYS_IN_WEEK = 7;
export const HOURS_IN_DAY = 24;
export const MINUTES_IN_HOUR = 60;

export interface CalendarDay {
  day: string;
  dayName: string;
  date: Date;
  id: number;
  selected?: boolean;
  hasUpload?: boolean;
  cssClass?: string[];
  monthName?: string;
  disabled?: boolean;
}

export interface ActiveDate {
  activeDate: Date;
  currentMonth: number;
  currentDay: number;
  currentYear: number;
}
export type DateRange = [CalendarDay | null, CalendarDay | null];
