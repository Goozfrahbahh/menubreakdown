import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
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
import { InventoryKey, inventory } from '../../../models/inventory';

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
              *ngIf="!tableView"
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
            <div
              class="overflow-y-scroll overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg"
              id="scroll"
              *ngIf="tableView"
            >
              <table
                class="w-full flex-col divide-y divide-gray-200 table nax-h-[50vh] dark:divide-gray-700 border-collapse"
              >
                <app-thead-inventory></app-thead-inventory>
                <app-tbody-inventory
                  (openItem)="openItem($event)"
                  [inventoryTable]="tableData"
                ></app-tbody-inventory>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-2 sm:flex sm:items-center sm:justify-between ">
        <div class="text-sm text-gray-700 dark:text-gray-400">
          Total Items:
          <span class="font-medium text-gray-700 dark:text-white">{{
            menubreakdowns.length
          }}</span>
        </div>

        <div class="flex items-center mt-4 gap-x-4 sm:mt-0">
          <ng-container *ngIf="!tableView; else categoriesTable">
            <button
              (click)="viewCategoryTable()"
              class="rounded-md px-3.5 py-1 m-1  overflow-hidden relative flex flex-row justify-between group cursor-pointer border-2 font-medium border-zinc-600 text-[#31abc8]"
            >
              <span
                class="absolute w-64 h-0 inline-block align-middle transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-[#31abc8] bg-opacity-70 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"
              ></span>
              <span
                class="relative text-[#31abc8] transition duration-300 group-hover:text-gray-100 ease"
                >Inventory Categories Table</span
              >
            </button>
          </ng-container>
          <ng-template #categoriesTable>
            <button
              (click)="viewEntreeTable()"
              class="rounded-md px-3.5 py-1 m-1 mr-6 overflow-hidden relative flex flex-row justify-between group cursor-pointer border-2 font-medium border-zinc-600 text-[#31abc8]"
            >
              <span
                class="absolute w-64 h-0 inline-block align-middle transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-[#31abc8] bg-opacity-70 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"
              ></span>
              <span
                class="relative text-[#31abc8] transition duration-300 group-hover:text-gray-100 ease"
                >Item Table</span
              >
            </button>
          </ng-template>
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
export class TableComponent implements OnInit, OnDestroy {
  @ViewChild('rowRef') rowHeader: ElementRef<any>;
  @ViewChildren('rows') rows: QueryList<ElementRef>;
  dataList: any[] = [];
  tableData: any[];
  menubreakdowns: MenuBreakdown[] = [];
  receivedbreakdowns: MenuBreakdown[] = [];
  categories = InventoryKey;
  descriptions = inventory;
  clearMenuBreakdown: DailyMenuBreakdown[] = [];
  combinedData: any = {};
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
      .subscribe((tableData) => {
        const data: any[] = this.addInventoryCategories(
          tableData,
          this.categories,
          this.descriptions
        );
        if (data) {
          this.dataList = data;
        }
      });

    this.tableService.viewTable$
      .pipe(takeUntil(this.destroy$))
      .subscribe((bool: boolean) => {
        this.tableView = bool;
      });

    this.tableService.inventoryTable$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data === null || data === '' || data === undefined) {
          return;
        } else if (data.length > 0) {
          this.tableData = data;
        }
      });
  }
  ngAfterViewInit() {
    this.rows;
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addInventoryCategories(
    data: MenuBreakdown[],
    categories: string[],
    descriptions: string[]
  ) {
    if (categories.length > 0 && descriptions.length > 0) {
      for (let category of categories) {
        for (let des of descriptions) {
          this.combinedData[category] = des;
        }
      }
    }

    const keys = Object.keys(this.combinedData);
    data.forEach((item, i) => {
      if (this.combinedData[item.item]) {
        data[i].category = this.combinedData[item.item];
      }
    });

    return data;
  }

  openItem(event: any) {
    console.log(event);
    this.tableData[event].selected = !this.tableData[event].selected;
    this.tableService.updateTableData(this.tableData);
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

  viewCategoryTable() {
    this.tableView = true;
    this.tableService.updateTableType(this.tableView);
  }

  viewEntreeTable() {
    this.tableView = false;
    this.tableService.updateTableType(this.tableView);
  }
}
