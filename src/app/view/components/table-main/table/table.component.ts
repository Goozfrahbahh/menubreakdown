import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Sort } from '../../../models/table';
import { ProviderService } from '../../../../shared/services/provider.service';
import {
  DailyMenuBreakdown,
  MenuBreakdown,
} from '../../../../shared/models/menubreakdown';
import { Subject, map, switchMap, takeUntil } from 'rxjs';
import { ViewService } from '../../../services/view.service';
import { TableService } from '../../../services/table.service';

@Component({
  selector: 'app-table',
  template: `
    <div class="container-table w-[450px]">
      <app-content [dataList]="dataList"></app-content>
      <div class="mt-2">
        <div class="-mx-4 -my-2 overflow-x-hidden sm:-mx-6 lg:-mx-8">
          <div class="inline-flex min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div
              class="overflow-y-scroll overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg"
              id="scroll"
            >
              <table
                class="w-full flex-col divide-y divide-gray-200 table nax-h-[50vh] dark:divide-gray-700 border-collapse"
              >
                <app-thead
                  [dataList]="dataList"
                  (checkAll)="checkAllBoxes()"
                ></app-thead>
                <app-tbody [dataList]="dataList"></app-tbody>
              </table>
            </div>
            <!-- <div
              class="overflow-y-scroll overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg"
              id="scroll"
              *ngIf="tableInventory"
            >
              <table
                class="w-full flex-col divide-y divide-gray-200 table nax-h-[50vh] dark:divide-gray-700 border-collapse"
              >
                <app-thead
                  [tableData]="tableData"
                ></app-thead>
                <app-tbody [tableData]="tableData"></app-tbody>
              </table>
            </div> -->
          </div>
        </div>
      </div>

      <div class="mt-6 sm:flex sm:items-center sm:justify-between ">
        <div class="text-sm text-gray-500 dark:text-gray-400">
          Total Items
          <span class="font-medium text-gray-700 dark:text-gray-100">{{
            menubreakdowns.length
          }}</span>
        </div>

        <div class="flex items-center mt-4 gap-x-4 sm:mt-0">
          <a
            href="#"
            class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5 rtl:-scale-x-100"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>

            <span> previous </span>
          </a>

          <a
            href="#"
            class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            <span> Next </span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5 rtl:-scale-x-100"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      #scroll::-webkit-scrollbar {
        width: 4px;
        cursor: pointer;
        scrollbar-color: #634444;
        /*background-color: rgba(229, 231, 235, var(--bg-opacity));*/
      }
      #scroll::-webkit-scrollbar-track {
        background-color: rgba(229, 231, 235, var(--bg-opacity));
        cursor: pointer;
        /*background: red;*/
      }
      #scroll::-webkit-scrollbar-thumb {
        cursor: pointer;
        background-color: #a0aec0;
        /*outline: 1px solid slategrey;*/
      }
    `,
  ],
})
export class TableComponent {
  @ViewChild('rowRef') rowHeader: ElementRef<any>;
  @ViewChildren('rows') rows: QueryList<ElementRef>;
  dataList: any[] = [];
  tableData: any[] = [];
  menubreakdowns: MenuBreakdown[] = [];
  receivedbreakdowns: MenuBreakdown[] = [];
  sortedData: any;
  sortId: Sort;
  sortDate: Sort;
  sortItem: Sort;
  sortQuantity: Sort;
  clearMenuBreakdown: DailyMenuBreakdown[] = [];
  combinedList: Set<string> = new Set();
  combined: MenuBreakdown[] = [];
  private destroy$ = new Subject<void>();
  tableView: boolean = false;

  constructor(
    private tableService: TableService,
    private viewService: ViewService
  ) {}

  ngOnInit() {
    this.viewService.menubreakdown$
      .pipe(
        map((menubreakdown) => this.convertMenuBreakdown(menubreakdown)),
        map((menubreakdowns: MenuBreakdown[]) =>
          this.viewService.updateTableValues(menubreakdowns)
        ),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.viewService.breakdowns$
      .pipe(takeUntil(this.destroy$))
      .subscribe((breakdowns) => {
        this.receivedbreakdowns = breakdowns;
        this.tableService.updateTableData(breakdowns);
      });

    this.tableService.tableData$
      .pipe(takeUntil(this.destroy$))
      .subscribe((tableData) => (this.dataList = tableData));

    this.tableService.viewTable$
      .pipe(takeUntil(this.destroy$))
      .subscribe((bool: boolean) => {
        this.tableView = bool;
      });

    this.tableService.inventoryTable$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => (this.tableData = data));
  }
  ngAfterViewInit() {
    this.rows;
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  convertMenuBreakdown(menubreakdown: DailyMenuBreakdown[]): MenuBreakdown[] {
    menubreakdown.forEach((breakdowns) => {
      const data: MenuBreakdown[] = breakdowns.totals.map((total) => ({
        id: breakdowns.id,
        date: breakdowns.date,
        item: total.item,
        quantity: total.quantity,
      }));
      this.menubreakdowns = [...this.menubreakdowns, ...data];
    });
    return this.menubreakdowns;
  }
  trackByFn(value: any, key: any) {
    return value[key];
  }

  checkAllBoxes() {
    if (this.rowHeader.nativeElement.checked === true) {
      this.rows.forEach((row) => {
        row.nativeElement.querySelector('input[type="checkbox"]').checked = true
          ? true
          : false;
      });
    } else {
      this.rows.forEach((row) => {
        row.nativeElement.querySelector('input[type="checkbox"]').checked =
          false;
      });
    }
  }

  combineSameValues() {
    const result = this.menubreakdowns.reduce<MenuBreakdown[]>(
      (accumulator, current) => {
        const existingItem = accumulator.find(
          (accumulate) => accumulate.item === current.item
        );
        if (existingItem) {
          existingItem.quantity += current.quantity;
        } else {
          accumulator.push({ ...current });
        }
        return accumulator;
      },
      []
    );

    this.viewService.updateTableValues(result);
  }

  canDeactivate() {
    this.viewService.updateMenuBreakdown(this.clearMenuBreakdown);
    return true;
  }

  updateViewInventory() {
    this.viewService.updateView(true);
  }

  updateViewItems() {
    this.viewService.updateView(false);
  }
}
