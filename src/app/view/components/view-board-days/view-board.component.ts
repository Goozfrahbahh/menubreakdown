import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { CalendarDay, DateRange } from '../../../shared/models/calendar-view';

@Component({
  selector: 'app-view-board-days',
  template: `
    <button
      class="flex-container relative flex w-full h-full rounded-md shadow-lg text-white gap-0 transition-transform hover:bg-[#6A64F1] hover:bg-opacity-20 hover:shadow-2xl active:bg-[#6A64F1]"
      (click)="selectedDay(day)"
      [value]="day"
      [ngClass]="{ selected: day.selected === true }"
      #boxRef
    >
      <span
        class="absolute left-3 top-3 text-slate-300 focus:text-white"
        #dayRef
        >{{ day.day }}</span
      >
      <span
        class="absolute bottom-2 left-3 text-slate-300 text-opacity-30 focus:text-white"
        >{{ day.dayName }}</span
      >
      <span
        class="absolute bottom-2 right-3 text-[#6A64F1] text-opacity-50 focus:text-white"
        >{{ day.date.toLocaleDateString('en-us', { month: 'long' }) }}</span
      >
    </button>
  `,
  styles: [
    `
      .selected {
        --tw-bg-opacity: 1;
        background-color: rgba(106, 100, 241, 0.8);
        border-radius: 0.5rem;
        color: #ffffff !important;
      }
    `,
  ],
})
export class ViewBoardDaysComponent implements OnInit {
  @ViewChildren('boxRef') boxRef: QueryList<ElementRef>;
  @ViewChildren('dayRef') dayRef: QueryList<ElementRef>;
  @Output('selectedDay') selected: EventEmitter<any> = new EventEmitter<any>();

  @Input() day: CalendarDay;
  @Input() i: number;
  cellSize: string;
  selectedDays: CalendarDay[] = [];
  list: any[] = [];
  list2: any[] = [];
  startDate: any;
  endDate: any;
  range: DateRange;
  selectedRange: any[];

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.list = this.dayRef.toArray();
    this.list2 = this.boxRef.toArray();
  }

  selectedDay(day: CalendarDay) {
    this.selected.emit(day);
  }
}
