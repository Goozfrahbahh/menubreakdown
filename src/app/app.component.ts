import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  VERSION,
  ViewChild,
} from '@angular/core';
import { ProviderService } from './shared/services/provider.service';
import { SettingsService } from './shared/services/settings.service';
import { MenuBreakdownService } from './shared/services/menubreakdown.service';
import { CalendarService } from './shared/services/calendar.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('navigation-item', { static: true })
  @Output('toggle')
  toggleEmit = new EventEmitter<any>();
  name = 'Angular ' + VERSION.major;
  activeDate: any;
  toggleState = 'closed' ? 'open' : 'closed';
  messagesOn: boolean;
  message: string;

  constructor(
    private provider: ProviderService,
    private settingsService: SettingsService,
    private calendarService: CalendarService
  ) {
    const today = new Date();
    this.activeDate = today;
    this.calendarService.setActiveDate(this.activeDate);
  }

  async ngOnInit() {
    this.settingsService.messages$.subscribe((bool: any) => {
      this.messagesOn = bool;
    });
    this.provider.setUp('Setting Up');
    this.provider.stringMessage$.subscribe((date: any) => {
      this.message = date;
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
}
