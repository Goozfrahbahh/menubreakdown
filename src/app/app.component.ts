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

  constructor(
    private provider: ProviderService,
    private settingsService: SettingsService,
    private calendarService: CalendarService,
    private menuBreakdownService: MenuBreakdownService
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
}
