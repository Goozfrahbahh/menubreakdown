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
  MenuGroups,
} from '../../../../shared/models/menubreakdown';
import { InventoryItems, InventoryTableData } from '../../../models/inventory';
import { isNgTemplate } from '@angular/compiler';
import { TableService } from '../../../services/table.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-tbody-inventory',
  template: ` <tbody
    class="bg-white h-[400px] inline-flex flex-col border-[#31abc8] divide-y-4 divide-gray-200 font-serif dark:divide-gray-700 dark:bg-zinc-700 dark:bg-opacity-[.45] overflow-y-scroll overflow-hidden overflow-ellipsis"
  >
    <tr
      class="hover:bg-zinc-800 hover:bg-opacity-90"
      *ngFor="let categories of tableData; let i = index; trackBy: trackByIndex"
    >
      <td class="px-6 py-4 text-sm font-medium whitespace-nowrap">
        <div>
          <h2 class="tracking-wider text-[#36badc] dark:text-[#36badc]">
            {{ categories.category }}
          </h2>
          <p class="text-sm font-normal text-gray-600 dark:text-gray-400">
            Certified Angus Beef Top Butt Choice
          </p>
        </div>
      </td>
      <td
        class="px-14 py-4 text-sm font-medium whitespace-nowrap place-items-end my-auto min-w-max min-w-0"
      >
        <div
          class="px-3 py-1 font-sans text-sm font-normal rounded-full text-[#fec84b] dark:text-[#fec84b] gap-x-2 bg-zinc-600/60 dark:bg-zinc-600/30"
        >
          {{ categories.total }}
        </div>
      </td>
      <td
        class="w-full relative place-self-end pl-[60px] pr-10 text-sm whitespace-nowrap min-w-fit"
      >
        <ng-container *ngIf="!categories.selected">
          <button
            class="px-1 py-1 absolute right-4 top-5 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300"
            (click)="onOpenInventoryItem(i)"
          >
            <svg
              fill="#ffffff"
              class="hover:fill-[#31abc8]"
              height="20px"
              width="20px"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 490.667 490.667"
              xml:space="preserve"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <g>
                  <g>
                    <g>
                      <path
                        d="M173.792,301.792L21.333,454.251v-80.917c0-5.891-4.776-10.667-10.667-10.667C4.776,362.667,0,367.442,0,373.333V480 c0,5.891,4.776,10.667,10.667,10.667h106.667c5.891,0,10.667-4.776,10.667-10.667s-4.776-10.667-10.667-10.667H36.416 l152.459-152.459c4.093-4.237,3.975-10.99-0.262-15.083C184.479,297.799,177.926,297.799,173.792,301.792z"
                      ></path>
                      <path
                        d="M480,0H373.333c-5.891,0-10.667,4.776-10.667,10.667c0,5.891,4.776,10.667,10.667,10.667h80.917L301.792,173.792 c-4.237,4.093-4.354,10.845-0.262,15.083c4.093,4.237,10.845,4.354,15.083,0.262c0.089-0.086,0.176-0.173,0.262-0.262 L469.333,36.416v80.917c0,5.891,4.776,10.667,10.667,10.667s10.667-4.776,10.667-10.667V10.667C490.667,4.776,485.891,0,480,0z"
                      ></path>
                      <path
                        d="M36.416,21.333h80.917c5.891,0,10.667-4.776,10.667-10.667C128,4.776,123.224,0,117.333,0H10.667 C4.776,0,0,4.776,0,10.667v106.667C0,123.224,4.776,128,10.667,128c5.891,0,10.667-4.776,10.667-10.667V36.416l152.459,152.459 c4.237,4.093,10.99,3.975,15.083-0.262c3.992-4.134,3.992-10.687,0-14.82L36.416,21.333z"
                      ></path>
                      <path
                        d="M480,362.667c-5.891,0-10.667,4.776-10.667,10.667v80.917L316.875,301.792c-4.237-4.093-10.99-3.976-15.083,0.261 c-3.993,4.134-3.993,10.688,0,14.821l152.459,152.459h-80.917c-5.891,0-10.667,4.776-10.667,10.667s4.776,10.667,10.667,10.667 H480c5.891,0,10.667-4.776,10.667-10.667V373.333C490.667,367.442,485.891,362.667,480,362.667z"
                      ></path>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </button>
        </ng-container>
        <ng-container *ngIf="categories.selected">
          <button
            class="px-1 py-1 absolute right-4 top-5 inline-block text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300"
            (click)="onOpenInventoryItem(i)"
          >
            <svg
              fill="#ffffff"
              viewBox="0 0 512 512"
              class="hover:fill-[#31abc8]"
              width="20px"
              height="20px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M414.11,186.39h-88.5V97.89h29.92v37.43L456.84,34,478,55.16,376.68,156.47h37.43Zm0,169.14V325.61h-88.5v88.5h29.92V376.68L456.84,478,478,456.84,376.68,355.53Zm-316.22,0h37.43L34,456.84,55.16,478,156.47,376.68v37.43h29.92v-88.5H97.89Zm58.58-220.21L55.16,34,34,55.16,135.32,156.47H97.89v29.92h88.5V97.89H156.47Z"
                ></path>
              </g>
            </svg>
          </button>
        </ng-container>
      </td>
      <td class="flex flex-col w-full">
        <ng-container *ngIf="categories.selected">
          <div
            class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded dark:bg-transparent"
          >
            <div class="block w-full overflow-x-auto">
              <table class="items-center bg-transparent w-full table-auto">
                <thead>
                  <tr
                    class="border-[.5px] border-collapse border-zinc-600 text-gray-300"
                  >
                    <th
                      class="px-6 break-words align-middle py-3 text-xs uppercase border-l-[.5px] border-r-0 border-zinc-700  whitespace-nowrap font-semibold text-left text-slate-600 dark:text-slate-400"
                    >
                      Entree
                    </th>
                    <th
                      class="px-6 break-words align-middle py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left text-slate-600 dark:text-slate-400"
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
                    class="text-white font-sans"
                  >
                    <th
                      class="border-b-1 border-t-0 px-6 m-w-[220px] w-[220px] align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left "
                    >
                      <h2
                        class="tracking-wider text-gray-600 dark:text-gray-400"
                      >
                        {{ entrees.item }}
                      </h2>
                      <div *ngIf="entrees.modifier">
                        <p
                          class="text-xs font-normal text-[#ff9eff] dark:text-[#ff9eff]"
                        >
                          {{ entrees.modifier }}
                        </p>
                      </div>
                    </th>
                    <td
                      class="px-10 py-4 mr-2 text-center text-sm font-medium whitespace-nowrap place-items-end my-auto min-w-[40px]"
                    >
                      <div
                        class="px-1 py-1 font-sans text-center self-center text-xs font-normal rounded-full text-[#ffcd58] dark:text-[#ffcd58] gap-x-2 bg-zinc-600/60 dark:bg-zinc-600/30"
                      >
                        {{ entrees.sold }}
                      </div>
                    </td>
                    <td
                      class="px-10 py-4 text-center text-sm font-medium whitespace-nowrap place-items-end my-auto min-w-[40px]"
                    >
                      <div
                        class="px-1 py-1 font-sans text-xs font-normal rounded-full text-gray-600 dark:text-gray-400 gap-x-2 bg-zinc-600/60 dark:bg-zinc-600/30"
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

  constructor(private tableService: TableService) {}

  ngOnInit() {
    this.groups = MenuGroups;
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
