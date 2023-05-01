import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  QueryList,
  ContentChildren,
  OnInit,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { CalendarDay, DateRange } from '../../../shared/models/calendar-view';
import { CalendarService } from '../../../shared/services/calendar.service';
import { ViewService } from '../../services/view.service';
import {
  DailyMenuBreakdown,
  MenuBreakdown,
  StateWithoutMenuBreakdowns,
} from '../../../shared/models/menubreakdown';
import { Subject, switchMap, takeUntil, tap } from 'rxjs';
import { ProviderService } from '../../../shared/services/provider.service';
import { MessageService } from '../../../shared/services/messages.service';
import { TableService } from '../../services/table.service';

@Component({
  selector: 'app-board',
  template: `
    <div
      class="feature-container flex max-h-[100vh] max-w-[100vw] pt-4 overflow-hidden bg-transparent"
      *ngIf="!viewOff; else menubreakdown"
    >
      <div
        class="calendar h-[96vh] min-w-[70vw] flex p-5 justify-center items-center content-center align-middle flex-col overflow-hidden"
        #calendarRef
      >
        <div
          class="grid grid-cols-7 grid-rows-5 h-full w-full gap-0"
          #calendarRef
        >
          <div
            *ngFor="let days of calendar; let i = index; trackBy: trackByIndex"
            [ngClass]="{ '.selected': days.selected === true }"
          >
            <app-view-board-days
              (selectedDay)="onDaySelection(days, i)"
              [day]="days"
              #boxRef
            ></app-view-board-days>
          </div>
        </div>
      </div>
      <div
        class="container-uploads flex flex-col w-full h-full justify-center content-center items-center align-middle"
      >
        <div
          class="flex items-center justify-center align-center content-center"
        >
          <app-interface-table></app-interface-table>
        </div>
      </div>
    </div>
    <ng-template #menubreakdown>
      <div
        class="w-full flex h-full pt-4 justify-center items-center align-middle bg-transparent"
      >
        <app-table (save)="save()"></app-table>
      </div>
    </ng-template>
  `,

  styleUrls: ['./board.component.scss'],
})
export class ViewBoardComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('calendarRef', { static: false }) calendarRef: ElementRef;
  @ContentChildren('boxRef') boxRef: QueryList<ElementRef>;
  @Input('selectedDate') selectedDate: CalendarDay;

  viewOff: boolean = false;
  calendar: CalendarDay[] = [];
  activeDate: Date;
  refList: any[] = [];
  dateRange: DateRange = [null, null];
  indexedRange: [number, number] = [0, 0];
  rangeDays: CalendarDay[] = [];
  selectedMenuBreakdowns: DailyMenuBreakdown[] = [];
  dataList: DailyMenuBreakdown[] = [];
  errorMessage: any[] = [];

  private destroy$ = new Subject<void>();

  constructor(
    private calendarService: CalendarService,
    private viewService: ViewService,
    private provider: ProviderService,
    private messageService: MessageService,
    private tableService: TableService
  ) {}

  ngOnInit() {
    this.calendarService.activeDate$
      .pipe(takeUntil(this.destroy$))
      .subscribe((activeDate) => {
        this.activeDate = activeDate;
        this.calendarService.resetCalendarByValue();
        this.calendarService.loadCalendar(activeDate);
      });

    this.calendarService.calendar$
      .pipe(takeUntil(this.destroy$))
      .subscribe((calendar: CalendarDay[]) => {
        this.calendar = calendar;
      });

    this.provider.menubreakdown$
      .pipe(
        tap((items) => console.log(items)),
        takeUntil(this.destroy$)
      )
      .subscribe((breakdown: DailyMenuBreakdown[]) => {
        if (breakdown) {
          this.dataList = breakdown.sort((a, b) => a.id - b.id);
        }
      });

    this.viewService.view$.pipe(takeUntil(this.destroy$)).subscribe((bool) => {
      this.viewOff = bool;
    });
  }
  ngAfterViewInit() {
    this.boxRef.map((ref) => this.refList.push(ref));
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  trackByIndex(index: number, calendarDay: CalendarDay) {
    return calendarDay;
  }

  onSetDateRange(range: CalendarDay[]): DailyMenuBreakdown[] {
    this.errorMessage = [];
    this.selectedMenuBreakdowns = [];
    this.tableService.updateRangeDays(range);
    const menubreakdownDates = new Set(
      this.dataList.map((menubreakdown) => menubreakdown.id)
    );

    // Loop through the dateRange array and check if the date exists in the Set
    const foundDates: Date[] = [];
    const notFoundDates: Date[] = [];

    range.forEach((calendarDay) => {
      if (menubreakdownDates.has(calendarDay.id)) {
        return;
      } else {
        this.errorMessage.push(calendarDay);
      }
    });
    for (let days of range) {
      const data = this.dataList.filter(
        (breakdowns) => days.id === breakdowns.id
      );
      this.selectedMenuBreakdowns = [...this.selectedMenuBreakdowns, ...data];
    }

    this.viewService.updateErrorMessages(this.errorMessage);

    this.viewService.updateMenuBreakdown(this.selectedMenuBreakdowns);
    this.messageService.add(`${range}`);

    return this.selectedMenuBreakdowns;
  }

  onDaySelection(day: CalendarDay, index: number) {
    if (this.dateRange[0] === null) {
      day.selected = true;
      this.dateRange[0] = day;
      this.indexedRange[0] = index;
    } else if (this.dateRange[1] == null) {
      day.selected = true;
      this.dateRange[1] = day;
      this.indexedRange[1] = index;
      if (this.dateRange[1].id < this.dateRange[0].id) {
        const first = this.dateRange[0];
        const second = this.dateRange[1];
        this.dateRange[0] = second;
        this.dateRange[1] = first;
        const indexFirst = this.indexedRange[0];
        const indexSecond = this.indexedRange[1];
        this.indexedRange[0] = indexSecond;
        this.indexedRange[1] = indexFirst;
      }
      this.viewService.updateSelectedRange(this.dateRange);
      for (
        let index = this.indexedRange[0];
        index <= this.indexedRange[1];
        index++
      ) {
        this.calendar[index].selected = true;
        this.rangeDays.push(this.calendar[index]);
      }
      this.onSetDateRange(this.rangeDays);
      this.selectedMenuBreakdowns = [];
      this.calendarService.setCalendar(this.calendar);
    } else if (this.dateRange[1] && this.dateRange[0]) {
      this.dateRange = [null, null];
      this.rangeDays = [];
      this.calendar.forEach((day: CalendarDay) => {
        day.selected = false;
      });

      this.onDaySelection(day, index);
    }
  }

  isDateAvailable(date: Date): boolean {
    return this.dataList.some((item) => item.date === date);
  }

  save() {
    this.viewService.updateView(false);
  }
}
