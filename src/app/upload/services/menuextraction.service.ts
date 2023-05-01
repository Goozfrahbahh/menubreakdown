import { Injectable, OnInit, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  combineLatest,
  map,
  takeUntil,
  tap,
} from 'rxjs';
import { MenuBreakdownService } from '../../shared/services/menubreakdown.service';
import { UploadFormService } from './upload-form.service';
import {
  DailyMenuBreakdown,
  MenuBreakdown,
  Totals,
} from '../../shared/models/menubreakdown';

export interface csv {
  group: string;
  item: string;
  sold: number;
  modifier: string;
}
@Injectable({ providedIn: 'root' })
export class MenuExtractionService implements OnInit, OnDestroy {
  menubreakdown: DailyMenuBreakdown = {
    id: 0,
    date: new Date(),
    totals: [],
  };

  private destroy$ = new Subject<void>();

  constructor(
    private uploadFormService: UploadFormService,
    private menuBreakdownService: MenuBreakdownService
  ) {}

  ngOnInit() {}

  addMenuBreakdown(menubreakdown: DailyMenuBreakdown) {
    if (menubreakdown.id === 0) {
      return alert('No Data Input');
    }

    console.log(menubreakdown);

    this.menuBreakdownService
      .addMenuBreakdown(menubreakdown)
      .then((res: any) => {
        console.log('Added Menu-Breakdown:', res);
      })
      .catch((err) => {
        console.log('Error adding Menu-breakdown:', err);
      });
  }

  deleteMenuBreakdown(id: number) {
    this.menuBreakdownService
      .deleteMenuBreakdown(id)
      .then((res: any) => {
        console.log('Deleted Menu-Breakdown:', res);
      })
      .catch((err) => {
        console.log('Error deleting Menu-breakdown:', err);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
