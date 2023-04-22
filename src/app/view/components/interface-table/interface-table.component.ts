import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, combineLatest, map, takeUntil, tap } from 'rxjs';
import { CalendarDay, DateRange } from '../../../shared/models/calendar-view';
import {
  DailyMenuBreakdown,
  MenuBreakdown,
  Totals,
} from '../../../shared/models/menubreakdown';
import { ViewService } from '../../services/view.service';

@Component({
  selector: 'app-interface-table',
  template: `
    <div
      class="interface-outlet flex flex-col items-center justify-center text-gray-500 min-w-full mt-[25vh]"
    >
      <span
        class="text-slate-500 font-serif text-xl flex justify-center animate-fade-in-down mt-6 mb-2"
      >
        Date View Selection</span
      >
      <div class="dailytotals-container">
        <div
          class="header-container flex-start flex mb-4 text-gray-200 text-lg font-serif"
          *ngIf="this.startDate && this.endDate"
        >
          <span class="text-gray-400"
            >{{ startDate | date : 'shortDate' }} -
            {{ endDate | date : 'shortDate' }}
          </span>
        </div>
      </div>
      <ng-container *ngIf="!error; then available; else errorDefault">
        <button
          class="inline-block rounded bg-slate-700 px-6 pt-2.5 pb-2 mt-8 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-slate-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-slate-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
          (click)="onViewData()"
        >
          View Inventory
        </button></ng-container
      >
      <ng-template #available>
        <button
          class="inline-block rounded nt-4 bg-[#6A64F1] bg-opacity-80 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:rounded-xl hover:bg-opacity-100 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-slate-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
          (click)="onViewData()"
        >
          View Inventory
        </button>
      </ng-template>
      <ng-template #errorDefault>
        <div
          class="flex flex-col items-center mt-2 justify-center text-xs text-red-500"
          *ngFor="let keys of message"
        >
          <button
            class="inline-block rounded bg-pink-700 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:rounded-2xl hover:bg-[#6A64F1] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-[#6A64F1] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
            (click)="onViewData()"
          >
            {{ keys.date | date : 'shortDate' }}
          </button>
        </div>
      </ng-template>
      <ng-template #loading> </ng-template>
    </div>
  `,
})
export class InterfaceTableComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  dataList: DailyMenuBreakdown[] = [];
  error: boolean = false;
  loading: boolean = true;
  selectedRange: CalendarDay[] = [];
  selectedDailyBreakdown: DailyMenuBreakdown[] = [];
  startDate: Date;
  endDate: Date;
  nulldates: string[] = [];
  menuBreakdown$: Observable<DailyMenuBreakdown[]>;
  menubreakdowns: DailyMenuBreakdown[] = [];
  errorMessage$: Observable<CalendarDay[]>;
  message: CalendarDay[] = [];

  constructor(private viewService: ViewService, private router: Router) {}

  ngOnInit() {
    this.viewService.menubreakdown$
      .pipe(takeUntil(this.destroy$))
      .subscribe((breakdowns) => {
        this.dataList = breakdowns;
      });

    this.menuBreakdown$ = this.viewService.menubreakdown$;
    this.errorMessage$ = this.viewService.missing$;

    combineLatest([this.menuBreakdown$, this.errorMessage$])
      .pipe(
        map(([breakdown, message]) => {
          if (message && message.length > 0) {
            this.error = true;
            this.message = message;
          } else {
            this.error = false;
          }
          this.menubreakdowns = breakdown;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.viewService.selectedRange$
      .pipe(takeUntil(this.destroy$))
      .subscribe((range) => {
        if (range) {
          this.startDate = range[0].date;
          const num = range.length - 1;
          this.endDate = range[num].date;
          this.selectedRange = range;
        }
      });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onViewData() {
    this.viewService.updateView(true);
  }
}
