import { Component, Input, OnInit } from '@angular/core';
import { MenuBreakdown } from '../../../../shared/models/menubreakdown';
import {
  EntreeList,
  InventoryItems,
  InventoryKey,
  InventoryTableData,
} from '../../../models/inventory';
import { isNgTemplate } from '@angular/compiler';
import { TableService } from '../../../services/table.service';

@Component({
  selector: 'app-tbody-inventory',
  template: ` <tbody
    class="bg-white h-[400px] block divide-y divide-gray-200 font-serif dark:divide-gray-700 dark:bg-zinc-700 dark:bg-opacity-30 overflow-y-scroll overflow-hidden overflow-ellipsis"
  >
    <tr
      class="hover:bg-zinc-700 hover:bg-opacity-50"
      *ngFor="let categories of inventoryTable"
    >
      <td
        class="px-4 py-4 text-sm font-medium whitespace-nowrap"
        *ngFor="let k of categories | keyvalue"
      >
        <div>
          <h2 class="tracking-wider text-gray-800 dark:text-gray-100 ">
            {{ k.key }}
          </h2>
          <p class="text-sm font-normal text-gray-600 dark:text-gray-500">
            Certified Angus Beef Top Butt Choice
          </p>
        </div>
      </td>
      <td class="px-12 py-4 text-sm font-medium whitespace-nowrap">
        <div
          class="inline px-3 py-1 font-sans text-sm font-normal rounded-full text-green-200 gap-x-2 bg-zinc-600/60 dark:bg-zinc-600/30"
        >
          {{ categories.totalQuantity }}
        </div>
      </td>
      <!-- <td class="px-4 py-4 text-sm whitespace-nowrap">
        <div>
          <h4 class="text-gray-700 font-sans dark:text-gray-200">
            {{ categories.date | date : 'shortDate' }}
          </h4>
        </div>
      </td> -->

      <td class="px-4 py-4 text-sm whitespace-nowrap">
        <button
          class="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100"
          (click)="onOpenInventoryItem(categories)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
            />
          </svg>
        </button>
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
export class TbodyInventoryComponent implements OnInit {
  @Input() inventoryTable: InventoryTableData[] = [];

  categories = EntreeList;
  keyList = InventoryKey;

  formattedObj: any;
  inventoryData: any;
  result: any;
  constructor(private tableService: TableService) {}

  ngOnInit() {
    const combinedArray = this.combineArray(this.categories, this.keyList);
    this.inventoryData = this.buildInventoryTable(combinedArray);
    const result = this.compareAndFormat(this.inventoryData, combinedArray);
    this.tableService.updateTableInventoryValues(result);
  }

  buildInventoryTable(combinedArray: any) {
    if (combinedArray) {
      const inventoryData = this.dataList.reduce((acc: any, menu) => {
        const inventoryItem = this.findInventoryItem(menu.item, combinedArray);
        if (inventoryItem) {
          const { inventoryKey, portion } = inventoryItem;

          if (!acc[inventoryKey]) {
            const itemFromCombinedArray = combinedArray.find((item: any) =>
              item.hasOwnProperty(inventoryKey)
            );
            if (itemFromCombinedArray) {
              acc[inventoryKey] = {
                totalQuantity: 0,
                individualPlates: itemFromCombinedArray[inventoryKey].map(
                  (plate: any) => ({ ...plate, quantity: 0 })
                ),
              };
            }
          }
          if (acc[inventoryKey]) {
            acc[inventoryKey].totalQuantity += portion * menu.quantity;
            const plateIndex = acc[inventoryKey].individualPlates.findIndex(
              (plate: any) => plate.name === menu.item
            );
            if (plateIndex !== -1) {
              acc[inventoryKey].individualPlates[plateIndex].quantity +=
                portion * menu.quantity;
            }
          }
        }

        return acc;
      }, {});

      return inventoryData;
    }
  }
  onOpenInventoryItem(inventoryItems: InventoryTableData) {}

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
    this.formattedObj;

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
}
