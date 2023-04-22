import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CalendarDay } from '../../shared/models/calendar-view';
import { MenuBreakdown } from '../../shared/models/menubreakdown';

@Injectable({ providedIn: 'root' })
export class TableService {
  protected tableDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    []
  );
  tableData$ = this.tableDataSubject.asObservable();
  protected searchTermSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    []
  );
  searchTerm$ = this.searchTermSubject.asObservable();
  protected sortedDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    []
  );
  sortedData$ = this.sortedDataSubject.asObservable();

  protected paginationSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    5
  );
  pagination$ = this.paginationSubject.asObservable();

  protected rangeSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  range$ = this.rangeSubject.asObservable();
  protected viewTableSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  viewTable$ = this.viewTableSubject.asObservable();
  protected inventoryTableSubject: BehaviorSubject<any> =
    new BehaviorSubject<any>([]);
  inventoryTable$ = this.inventoryTableSubject.asObservable();

  dataList: any[] = [];

  constructor() {}

  updateTableData(data: any[]) {
    this.dataList = data;
    this.tableDataSubject.next(data);
  }

  searchItems(term: string) {
    if (term == null || term == '') {
      return this.dataList;
    }

    const data: MenuBreakdown[] = this.dataList.filter((item) => {
      return item.item.toLowerCase().includes(term.toLowerCase());
    });
    console.log(data);

    this.tableDataSubject.next(data);
    return data;
  }

  updateSortedData(data: any[]) {
    this.sortedDataSubject.next(data);
  }

  updatePagination(page: number) {
    this.paginationSubject.next(page);
  }

  updateRangeDays(range: CalendarDay[]) {
    this.rangeSubject.next(range);
  }

  updateTableType(bool: boolean) {
    this.inventoryTableSubject.next(bool);
  }

  updateTableInventoryValues(inventory: any) {
    this.inventoryTableSubject.next(inventory);
  }
}
