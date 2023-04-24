import { Component, Input, OnInit } from '@angular/core';
import { MenuBreakdown } from '../../../../shared/models/menubreakdown';
import { EntreeList, inventory } from '../../../models/inventory';
import { TableService } from '../../../services/table.service';

@Component({
  selector: 'app-tbody',
  template: ` <tbody
    class="bg-white h-[400px] block divide-y divide-gray-200 font-serif dark:divide-gray-700 dark:bg-zinc-700 dark:bg-opacity-[.45] overflow-y-scroll overflow-hidden overflow-ellipsis"
  >
    <tr
      *ngFor="let breakdown of dataList"
      class="hover:bg-zinc-700 hover:bg-opacity-50"
    >
      <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
        <div>
          <h2 class="tracking-wider dark:text-[#31abc8] text-[#31abc8] ">
            {{ breakdown.item }}
          </h2>
          <div *ngIf="breakdown.category">
            <p class="text-sm font-normal text-gray-600 dark:text-gray-500">
              {{ breakdown.category }}
            </p>
          </div>
        </div>
      </td>
      <td class="px-12 py-4 text-sm font-medium whitespace-nowrap">
        <div
          class="inline px-3 py-1 font-sans text-sm font-normal rounded-full text-[#71ff4e] dark:text-[#71ff4e] gap-x-2 bg-zinc-600/60 dark:bg-zinc-600/30"
        >
          {{ breakdown.quantity }}
        </div>
      </td>
      <td class="px-4 py-4 text-sm whitespace-nowrap">
        <div>
          <h4 class="text-gray-700 font-sans dark:text-gray-200">
            {{ breakdown.date | date : 'shortDate' }}
          </h4>
        </div>
      </td>

      <td class="px-4 py-4 text-sm whitespace-nowrap">
        <button
          class="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100"
          (click)="edit(breakdown)"
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
export class TbodyComponent implements OnInit {
  @Input() dataList: MenuBreakdown[] = [];
  constructor(private tableService: TableService) {}

  ngOnInit() {}

  edit(breakdown: MenuBreakdown) {
    console.log(breakdown);
  }
}
