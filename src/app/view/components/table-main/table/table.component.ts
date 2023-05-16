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
  EntreeList,
  Groups,
  MenuBreakdown,
} from '../../../../shared/models/menubreakdown';
import { Subject, map, switchMap, takeUntil } from 'rxjs';
import { ViewService } from '../../../services/view.service';
import { TableService } from '../../../services/table.service';
import { Category, ModifiersEntrees } from '../../../models/inventory';
import { ContentComponent } from '../content/content.component';

@Component({
  selector: 'app-table',
  template: `
    <div class="container-table min-w-[800px]">
      <app-content #content [dataList]="dataList"></app-content>
      <div class="mt-2">
        <div class="-mx-4 -my-2 overflow-x-hidden sm:-mx-6 lg:-mx-8">
          <div class="flex min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div
              class="overflow-y-scroll overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg"
              id="scroll"
              *ngIf="!tableView"
            >
              <table
                class="w-full flex-col table-auto divide-gray-200nax-h-[50vh] dark:divide-gray-700 border-collapse"
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
                class="w-full flex flex-col table-auto divide-gray-200nax-h-[50vh] dark:divide-gray-700 border-collapse"
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

      <div class="mt-2 pl-2 sm:flex sm:items-center sm:justify-between ">
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
              class="rounded-md px-3.5 py-1 m-1 ml-0 pl-0 overflow-hidden relative flex flex-row justify-between group cursor-pointer border-2 font-medium border-zinc-600 text-[#31abc8]"
            >
              <span
                class="absolute w-64 h-0 inline-block align-middle transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-[#31abc8] bg-opacity-70 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"
              ></span>
              <span
                class="relative pl-2 inline-flex text-gray-600 dark:text-gray-300 transition duration-300 group-hover:text-gray-100 ease align-middle"
                >Inventory Categories Table
              </span>
            </button>
          </ng-container>
          <ng-template #categoriesTable>
            <button
              (click)="viewEntreeTable()"
              class="rounded-md px-3.5 py-1 overflow-hidden relative flex flex-row justify-between group cursor-pointer border-2 font-medium border-zinc-600 text-[#31abc8]"
            >
              <span
                class="absolute w-64 h-0 inline-block align-middle transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-[#31abc8] bg-opacity-70 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"
              ></span>
              <span
                class="relative text-gray-600 dark:text-gray-300 transition duration-300 group-hover:text-gray-100 ease"
                >Menu Item Table</span
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
  @ViewChild('content') content: ContentComponent;
  dataList: any[] = [];
  tableData: any[];
  menubreakdowns: MenuBreakdown[] = [];
  receivedbreakdowns: MenuBreakdown[] = [];
  clearMenuBreakdown: DailyMenuBreakdown[] = [];
  combinedData: any = {};
  private destroy$ = new Subject<void>();
  tableView: boolean = false;
  entreeSales: MenuBreakdown[] = [];
  categoryMap: any;
  modifierData: any[] = [];
  modifierList: any[] = [];
  groups: any;

  constructor(
    private tableService: TableService,
    private viewService: ViewService,
    private provider: ProviderService
  ) {}

  ngOnInit() {
    this.provider.menuGroups$
      .pipe(takeUntil(this.destroy$))
      .subscribe((menuGroups) => {
        this.groups = menuGroups;
        this.tableService.setGroups(this.groups);
      });
    //     this.groups = MenuGroups;
    //     this.categoryMap = this.setInventoryCategories(this.groups);
    this.viewService.menubreakdown$
      .pipe(
        map((menubreakdown) =>
          this.convertMenuBreakdown(this.groups, menubreakdown)
        ),
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
        this.dataList = tableData;
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

  openItem(event: any) {
    console.log(event);
    this.tableData[event].selected = !this.tableData[event].selected;
    this.tableService.updateTableData(this.tableData);
  }
  setInventoryCategories(menuGroups: Groups[]) {
    const categoryMap = {};
    menuGroups.forEach((group) => {
      Object.values(group).forEach((menuItems) => {
        menuItems.forEach((menuItem) => {
          if (menuItem.categories) {
            menuItem.categories.forEach((categoryObj) => {
              const category = categoryObj.category;
              const itemData: EntreeList = {
                item: menuItem.name,
                portion: categoryObj.portion,
              };

              if (categoryObj.modifier) {
                itemData.modifier = categoryObj.modifier;
              }

              if (categoryMap[category]) {
                categoryMap[category].push(itemData);
              } else {
                categoryMap[category] = [itemData];
              }
            });
          }
        });
      });
    });
    return categoryMap;
  }

  convertMenuBreakdown(
    groups: Groups[],
    menubreakdown: DailyMenuBreakdown[]
  ): MenuBreakdown[] {
    console.log(menubreakdown);
    const modifiers: Category = this.setInventoryCategories(groups);
    const getModifiers = (categories: Category): string[] => {
      return Object.values(categories)
        .reduce((entrees, entreeList) => entrees.concat(entreeList), [])
        .filter((entree) => entree.modifier)
        .map((entree) => entree.modifier as string);
    };
    this.modifierList = getModifiers(modifiers);
    console.log(modifiers);
    menubreakdown.forEach((breakdowns) => {
      const sales = breakdowns.totals.map((total) => ({
        id: breakdowns.id,
        date: breakdowns.date,
        group: total.group,
        item: total.item,
        sold: Number(total.sold),
        modifier: total.modifier,
      }));
      sales.forEach((item) => {
        if (item.modifier === '') {
          this.menubreakdowns.push(item);
        }
        if (item.modifier !== '') {
          for (let mod of this.modifierList) {
            if (mod === item.modifier) {
              console.log(item);
              this.menubreakdowns.push(item);
            }
          }
        }
      });
    });
    const combinedData = this.menubreakdowns.reduce((result: any[], entree) => {
      const foundIndex = result.findIndex(
        (item) =>
          item.id === entree.id &&
          item.item === entree.item &&
          item.modifier === entree.modifier
      );

      if (foundIndex !== -1) {
        result[foundIndex].sold += entree.sold;
      } else {
        result.push(entree);
      }

      return result;
    }, []);
    this.menubreakdowns = combinedData;
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
          existingItem.sold += current.sold;
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
    this.content.viewAll();
    this.tableView = true;
    this.tableService.updateTableType(this.tableView);
  }

  viewEntreeTable() {
    this.tableView = false;
    this.tableService.updateTableType(this.tableView);
  }
}
