import { Component, Input, OnInit } from '@angular/core';
import { MenuBreakdown } from '../../../../shared/models/menubreakdown';
import { TableService } from '../../../services/table.service';

@Component({
  selector: 'app-tbody',
  template: ` <tbody
    class="bg-white w-full inline-block max-h-[450px] divide-y divide-gray-200 font-serif dark:divide-gray-700 dark:bg-zinc-700 dark:bg-opacity-[.45] overflow-y-scroll overflow-hidden"
  >
    <tr
      *ngFor="let breakdown of dataList"
      class="hover:bg-zinc-800 hover:bg-opacity-90 table-row"
    >
      <td
        class="px-10 pl-9 pr-9 w-[260px] text-sm font-medium whitespace-nowrap"
      >
        <div>
          <h2 class="tracking-wider text-gray-700 dark:text-white ">
            {{ breakdown.item }}
          </h2>
          <span
            class="tracking-normal dark:text-[#ff9eff] text-[#ff9eff]"
            *ngIf="breakdown.modifier"
            >{{ breakdown.modifier }}</span
          >
          <div *ngIf="breakdown.group">
            <p class="text-sm font-normal text-gray-800 dark:text-gray-500">
              {{ breakdown.group }}
            </p>
          </div>
        </div>
      </td>
      <td
        class="px-14 py-4 text-center text-sm font-medium whitespace-nowrap w-[100px]"
      >
        <div
          class="inline px-3 py-1 font-sans text-sm font-normal rounded-full text-lime-500 dark:text-lime-500 gap-x-2 bg-zinc-600/60 dark:bg-zinc-600/30"
        >
          {{ breakdown.sold }}
        </div>
      </td>
      <td class="px-4 pl-12 pr-10 w-[89px] text-sm whitespace-nowrap">
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
