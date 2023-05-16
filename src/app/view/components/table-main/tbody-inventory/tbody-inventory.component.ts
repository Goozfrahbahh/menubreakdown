import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  CategoryMap,
  EntreeList,
  Groups,
  MenuBreakdown,
} from '../../../../shared/models/menubreakdown';
import { InventoryItems, InventoryTableData } from '../../../models/inventory';
import { isNgTemplate } from '@angular/compiler';
import { TableService } from '../../../services/table.service';
import { Subject, takeUntil } from 'rxjs';
import { ProviderService } from '../../../../shared/services/provider.service';

@Component({
  selector: 'app-tbody-inventory',
  template: ` <tbody
    class="bg-white w-full flex-col inline-flex max-h-[450px] divide-y divide-gray-200 font-serif dark:divide-gray-700 dark:bg-zinc-700 dark:bg-opacity-[.45] overflow-y-scroll overflow-hidden"
  >
    <tr
      class="hover:bg-zinc-800 hover:bg-opacity-90 table-row"
      *ngFor="let categories of tableData; let i = index; trackBy: trackByIndex"
    >
      <td
        class="px-10 py-4 w-[360px] text-[.95rem] font-medium whitespace-nowrap"
      >
        <div>
          <h2 class="tracking-wider text-[#36badc] dark:text-white">
            {{ categories.category }}
          </h2>
          <p class="font-normal text-gray-600 dark:text-lime-400"></p>
        </div>
      </td>
      <td
        class="px-[2rem] py-4 w-[160px] font-medium whitespace-nowrap text-center my-auto min-w-0"
      >
        <div
          class="py-1 m-auto w-12 text-center text-[.95rem] font-sansn font-normal rounded-full text-lime-500 dark:text-lime-500 gap-x-2 bg-zinc-600/60 dark:bg-zinc-600/30"
        >
          {{ categories.total | number }}
        </div>
      </td>
      <td
        class="relative w-[60px] place-self-end pl-12 pr-9 py-4 text-sm whitespace-nowrap"
      >
        <button
          class="px-1 py-1 absolute right-4 top-3 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300"
          (click)="onOpenInventoryItem(i)"
          [ngClass]="categories.selected ? 'selected' : ''"
        >
          <span
            class="ml-auto h-5 w-5 shrink-0 fill-[#336dec] transition-transform duration-200 ease-in-out  motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white dark:group-[[data-te-collapse-collapsed]]:stroke-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </span>
        </button>
      </td>
      <td class="flex flex-col w-full">
        <ng-container *ngIf="categories.selected">
          <div
            class="relative flex flex-col min-w-0 pl-4 pr-4 break-words bg-white w-full mb-6 shadow-xl rounded dark:bg-transparent group-[[data-te-collapse-collapsed]]:{{
              categories.selected
            }}"
          >
            <div class="block w-full overflow-x-auto">
              <table class="items-center bg-transparent w-full table-auto">
                <thead>
                  <tr
                    class="border-[.5px] border-collapse border-zinc-600 text-gray-300"
                  >
                    <th
                      class="px-6 mr-8
				 break-words align-middle py-3 text-xs uppercase border-l-[.5px] border-r-0 border-zinc-700  whitespace-nowrap font-semibold text-left text-slate-600 dark:text-slate-400"
                    >
                      Entree
                    </th>
                    <th
                      class="px-6 w=[50px] width-full break-words align-middle py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left text-slate-600 dark:text-slate-400"
                    >
                      Totals
                    </th>
                    <th
                      class="px-6 break-words align-middle py-3 text-xs uppercase border-l-0 border-r-[.5px] border-zinc-700 whitespace-nowrap font-semibold text-left text-slate-600 dark:text-slate-400"
                    >
                      Portion Size
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr
                    *ngFor="let entrees of categories.entreeList"
                    class="text-white font-sans backdrop-brightness-125"
                  >
                    <th
                      class="border-b-1 border-t-0 font-light px-6 w-[192px] align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left "
                    >
                      <h2 class="tracking-wider text-gray-600 dark:text-white">
                        {{ entrees.item }}
                      </h2>
                      <div *ngIf="entrees.modifier">
                        <p
                          class="text-xs font-normal text-gray-700 dark:text-[#ff9eff]"
                        >
                          {{ entrees.modifier }}
                        </p>
                      </div>
                    </th>
                    <td
                      class="px-10 py-4 mr-2 text-center text-sm font-medium whitespace-nowrap place-items-end my-auto w-[192px]"
                    >
                      <div
                        class="px-1 py-1 w-12 font-sans text-center self-center text-xs font-normal rounded-full text-lime-400 dark:text-lime-400 gap-x-2 bg-zinc-600/60 dark:bg-zinc-600/30"
                      >
                        {{ entrees.sold }}
                      </div>
                    </td>
                    <td
                      class="px-10 py-4 text-center text-sm font-medium whitespace-nowrap place-items-end my-auto w-[180px]"
                    >
                      <div
                        class="px-1 py-1 w-12 font-sans text-xs font-normal rounded-full text-lime-400 dark:text-lime-400 gap-x-2 bg-zinc-600/60 dark:bg-zinc-600/30"
                      >
                        {{ entrees.portion }}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </ng-container>
      </td>
    </tr>
  </tbody>`,
  styles: [
    `
      :host {
        display: table-row-group;
      }
      .selected {
        transform: rotate(180deg);
      }
    `,
  ],
})
export class TbodyInventoryComponent implements OnInit, OnDestroy {
  @Output('openItem') openItem = new EventEmitter<any>();
  @Input() inventoryTable: InventoryTableData[] = [];
  dataList: MenuBreakdown[] = [];
  cachedData: any[] = [];
  formattedObj: any = {};
  inventoryData: any;
  itemData: EntreeList;
  result: any;
  groups: any;
  categories: any[] = [];
  tableData: any[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private tableService: TableService,
    private provider: ProviderService
  ) {}

  ngOnInit() {
    this.provider.menuGroups$
      .pipe(takeUntil(this.destroy$))
      .subscribe((groups) => {
        this.groups = groups;
      });
    this.tableService.inventoryTable$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.tableData = data;
        if (this.cachedData.length < 1) {
          this.cachedData = this.tableData;
        }
        return this.tableData;
      });
  }
  onOpenInventoryItem(index: number) {
    console.log(this.cachedData[index]);
    const toggle = this.cachedData[index].selected;
    const option = !toggle;
    this.cachedData[index].selected = option;
    this.tableService.updateTableInventoryValues(this.cachedData);
  }
  trackByIndex(index: number, value: InventoryTableData): number {
    return index;
  }

  combineArray(items: InventoryItems[][], key: string[]) {
    const combinedArray = key.map((k, i) => {
      return { [k]: items[i] };
    });
    console.log(combinedArray);
    return combinedArray;
  }
  findInventoryItem(item: string, combinedArray: any) {
    for (const inventoryItem of combinedArray) {
      for (const key in inventoryItem) {
        for (const menuItem of inventoryItem[key]) {
          if (menuItem.name === item) {
            return {
              inventoryKey: key,
              portion: menuItem.portion,
            };
          }
        }
      }
    }
    return null;
  }
  compareAndFormat(firstObj: any, secondObj: any) {
    secondObj.forEach((item: any) => {
      const key = Object.keys(item)[0];

      if (firstObj.hasOwnProperty(key)) {
        this.formattedObj[key] = firstObj[key];
      } else {
        this.formattedObj[key] = {
          totalQuantity: 0,
          entrees: item[key].map((entry: any) => {
            return {
              ...entry,
              quantity: 0,
            };
          }),
        };
      }
    });

    return this.formattedObj;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
