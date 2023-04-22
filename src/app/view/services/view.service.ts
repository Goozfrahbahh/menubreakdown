import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  DailyMenuBreakdown,
  MenuBreakdown,
} from '../../shared/models/menubreakdown';
import { ProviderService } from '../../shared/services/provider.service';
import { CalendarDay } from '../../shared/models/calendar-view';

@Injectable({ providedIn: 'root' })
export class ViewService {
  selectedRangeSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  selectedRange$ = this.selectedRangeSubject.asObservable();
  menubreakdownSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  menubreakdown$ = this.menubreakdownSubject.asObservable();
  breakdownSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  breakdowns$ = this.breakdownSubject.asObservable();
  viewSubject: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  view$ = this.viewSubject.asObservable();
  missingSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  missing$ = this.missingSubject.asObservable();

  constructor(private provider: ProviderService) {}
  updateSelectedRange(range: any[]) {
    this.selectedRangeSubject.next(range);
  }
  updateErrorMessages(errorMessage: CalendarDay[]) {
    this.missingSubject.next(errorMessage);
  }

  updateMenuBreakdown(breakdown: DailyMenuBreakdown[]) {
    this.menubreakdownSubject.next(breakdown);
  }
  updateTableValues(breakdowns: MenuBreakdown[]) {
    this.breakdownSubject.next(breakdowns);
  }

  updateView(bool: boolean) {
    this.viewSubject.next(bool);
  }
}
