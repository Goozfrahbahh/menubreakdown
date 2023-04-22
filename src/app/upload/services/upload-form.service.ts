import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CalendarDay } from '../../shared/models/calendar-view';
import { MenuExtractionService } from './menuextraction.service';
import { MenuBreakdown, Totals } from '../../shared/models/menubreakdown';

@Injectable({ providedIn: 'root' })
export class UploadFormService {
  protected idSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  id$ = this.idSubject.asObservable();

  protected selectedDateSubject: BehaviorSubject<any> =
    new BehaviorSubject<any>(null);
  selectedDate$ = this.selectedDateSubject.asObservable();

  protected fileListSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  fileList$ = this.fileListSubject.asObservable();

  protected menubreakdownSubject: BehaviorSubject<any> =
    new BehaviorSubject<any>(null);
  menubreakdown$ = this.menubreakdownSubject.asObservable();

  protected totalMenubreakdownSubject: BehaviorSubject<any> =
    new BehaviorSubject<any>(null);
  totals$ = this.totalMenubreakdownSubject.asObservable();

  constructor() {}

  updateSelectedDate(date: any) {
    this.selectedDateSubject.next(date);
    let id = date.replace(/-/g, '');
    id = Number(date.replace(/-/g, ''));
    this.idSubject.next(id);
  }

  updateUploadFilesList(files: string) {
    this.fileListSubject.next(files);
  }

  updateMenuBreakdown(menuBreakdown: MenuBreakdown[]) {
    this.menubreakdownSubject.next(menuBreakdown);
  }

  updateTotals(totals: Totals[]) {
    this.totalMenubreakdownSubject.next(totals);
  }
}
