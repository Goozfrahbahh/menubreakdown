import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  VERSION,
  ViewChild,
} from '@angular/core';
import { ProviderService } from './shared/services/provider.service';
import { SettingsService } from './shared/services/settings.service';
import { CalendarService } from './shared/services/calendar.service';
import { Subject, takeUntil } from 'rxjs';
import { MenuBreakdownService } from './shared/services/menubreakdown.service';
import { StatusService } from './shared/services/status.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('navigation-item', { static: true })
  @Output('toggle')
  toggleEmit = new EventEmitter<any>();
  private destroy$ = new Subject<void>();
  activeDate: any;
  toggleState = 'closed' ? 'open' : 'closed';
  messagesOn: boolean;
  message: string;
  nextMonth: Date = new Date();
  previousMonth: Date = new Date();
  status: boolean = false;

  constructor(
    private provider: ProviderService,
    private settingsService: SettingsService,
    private calendarService: CalendarService,
    private statusService: StatusService
  ) {
    const today = new Date();
    this.activeDate = today;
    this.calendarService.setActiveDate(this.activeDate);
  }

  async ngOnInit() {
    this.settingsService.messages$
      .pipe(takeUntil(this.destroy$))
      .subscribe((bool: any) => {
        this.messagesOn = bool;
      });
    this.provider.setUp('Setting Up');
    this.provider.stringMessage$
      .pipe(takeUntil(this.destroy$))
      .subscribe((date: any) => {
        this.message = date;
      });
    this.provider.dailymenubreakdowns;

    this.statusService.uploadStatus$
      .pipe(takeUntil(this.destroy$))
      .subscribe((status) => {
        if (status.code !== '') {
          this.status = true;
        } else {
          this.status = false;
        }
      });
  }

  toggleReceive() {
    if (this.toggleState === 'open') {
      this.toggleState = 'closed';
    } else if (this.toggleState === 'closed') {
      this.toggleState = 'open';
    }
  }
  clickAwayFromMenu() {
    this.toggleReceive();
  }

  openInterface() {
    console.log('interface open works');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  setPreviousNextMonth() {
    const month = this.activeDate.getMonth();
    if (month === 11) {
      this.nextMonth = new Date(this.activeDate.getFullYear() + 1, 0, 1);
      this.previousMonth = new Date(
        this.activeDate.getFullYear(),
        this.activeDate.getMonth() - 1,
        1
      );
      return;
    }
    if (month === 0) {
      this.nextMonth = new Date(
        this.activeDate.getFullYear(),
        this.activeDate.getMonth + 1,
        1
      );
      this.previousMonth = new Date(this.activeDate.getFullYear() - 1, 11, 1);
      return;
    }

    this.nextMonth = new Date(this.activeDate.getFullYear(), month + 1, 1);
    this.previousMonth = new Date(this.activeDate.getFullYear, month - 1, 1);
  }
}
