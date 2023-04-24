import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MenuBreakdown } from '../../../../shared/models/menubreakdown';
import { Sort } from '../../../models/table';
import { ViewService } from '../../../services/view.service';
import { TableService } from '../../../services/table.service';

@Component({
  selector: 'app-thead',
  template: `
    <thead
      class="w-full bg-zinc-500 dark:bg-zinc-700 dark:bg-opacity-[.45] shadow-xl border-b-[.5px] border-red-700"
    >
      <tr
        class="align-middle text-center border-b-[1px] border-zinc-600 border-b-zinc-500"
      >
        <th
          scope="col"
          class="px-6 py-4  pr-8 w-[185px] align-middle text-left text-xs font-semibold font-serif rtl:text-right text-gray-300 dark:text-gray-300"
        >
          <button class="items-start text-left gap-x-3 focus:outline-none">
            <span>Menu Entree's</span>
            <ng-container *ngIf="sortItem.direction === 'asc'">
              <button
                type="button"
                (click)="sortData(sortItem)"
                class="fill-transparent hover:fill-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 -15 32 32"
                  stroke-width="1.5"
                  class="w-6 h-6 stroke-transparent hover:stroke-white transition-transform"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18"
                  />
                </svg>
              </button>
            </ng-container>
            <ng-container *ngIf="sortItem.direction === ''">
              <button type="button" (click)="sortData(sortItem)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 -15 32 32"
                  stroke-width="1.5"
                  class="w-6 h-6 stroke-transparent hover:stroke-white transition-transform"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3"
                  />
                </svg>
              </button>
            </ng-container>
          </button>
        </th>

        <th
          scope="col"
          class="pl-8 pr-4 py-4 w-[50px] align-middle text-xs font-semibold font-serif rtl:text-right text-gray-300 dark:text-gray-300"
        >
          <div class="items-center text-center gap-x-3 focus:outline-none">
            Sold
            <ng-container *ngIf="sortQuantity.direction === 'asc'">
              <button
                type="button"
                (click)="sortData(sortQuantity)"
                class="fill-transparent hover:fill-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 -15 32 32"
                  stroke-width="1.5"
                  class="w-6 h-6 stroke-transparent hover:stroke-white transition-transform"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18"
                  />
                </svg>
              </button>
            </ng-container>
            <ng-container *ngIf="sortQuantity.direction === ''">
              <button type="button" (click)="sortData(sortQuantity)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 -15 32 32"
                  stroke-width="1.5"
                  class="w-6 h-6 stroke-transparent hover:stroke-white transition-transform"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3"
                  />
                </svg>
              </button>
            </ng-container>
          </div>
        </th>

        <th
          scope="col"
          class="pl-4 pr-0 py-4 w-[89px] align-middle text-xs font-semibold font-serif rtl:text-right text-gray-300 dark:text-gray-300"
        >
          <div class="items-center text-center gap-x-3 focus:outline-none">
            Date
            <ng-container *ngIf="sortDate.direction === 'asc'">
              <button
                type="button"
                (click)="sortData(sortDate)"
                class="fill-transparent hover:fill-black items-center text-left gap-x-3 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 -15 32 32"
                  stroke-width="1.5"
                  class="w-6 h-6 stroke-transparent hover:stroke-white transition-transform"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18"
                  />
                </svg>
              </button>
            </ng-container>
            <ng-container *ngIf="sortDate.direction === ''">
              <button type="button" (click)="sortData(sortDate)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 -15 32 32"
                  stroke-width="1.5"
                  class="w-6 h-6 stroke-transparent hover:stroke-white transition-transform"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3"
                  />
                </svg>
              </button>
            </ng-container>
          </div>
        </th>

        <th scope="col" class="relative py-3.5 px-8">
          <span class="sr-only">Edit</span>
        </th>
      </tr>
    </thead>
  `,
  styles: [
    `
      :host {
        display: table-header-group;
      }
    `,
  ],
})
export class TheadComponent implements OnInit, AfterViewInit {
  @Input() dataList: any[] = [];

  @Output('checkAllBoxes') checkAll = new EventEmitter<any>();

  sortedData: any;
  sortId: Sort;
  sortDate: Sort;
  sortItem: Sort;
  sortQuantity: Sort;
  menubreakdowns: MenuBreakdown[] = [];
  constructor(private tableService: TableService) {}

  ngOnInit() {
    this.sortId = { active: 'id', direction: 'asc' };
    this.sortDate = { active: 'date', direction: 'asc' };
    this.sortItem = { active: 'item', direction: 'asc' };
    this.sortQuantity = { active: 'quantity', direction: '' };
  }

  ngAfterViewInit(): void {}

  sortData(sort: Sort) {
    if (!this.dataList) {
      this.dataList = this.menubreakdowns;
    }
    const data = this.dataList.slice();
    this.sortedData = data.sort((a: MenuBreakdown, b: MenuBreakdown) => {
      const isAsc = sort.direction === 'asc' ? true : false;
      switch (sort.active) {
        case 'id':
          return this.compare(a.id, b.id, isAsc);
        case 'item':
          return this.compare(a.item, b.item, isAsc);
        case 'quantity':
          return this.compare(a.quantity, b.quantity, isAsc);
        case 'date':
          return this.compareDates(a.date, b.date, isAsc);
        default:
          return 0;
      }
    });
    if (sort.active === 'id' && sort.direction === '') {
      this.sortId = { active: 'id', direction: 'asc' };
    } else if (sort.active === 'id' && sort.direction === 'asc') {
      this.sortId = { active: 'id', direction: '' };
    }
    if (sort.active === 'item' && sort.direction === '') {
      this.sortItem = { active: 'item', direction: 'asc' };
    } else if (sort.active === 'item' && sort.direction === 'asc') {
      this.sortItem = { active: 'item', direction: '' };
    }
    if (sort.active === 'quantity' && sort.direction === '') {
      this.sortQuantity = { active: 'quantity', direction: 'asc' };
    } else if (sort.active === 'quantity' && sort.direction === 'asc') {
      this.sortQuantity = { active: 'quantity', direction: '' };
    }
    if (sort.active === 'date' && sort.direction === '') {
      this.sortDate = { active: 'date', direction: 'asc' };
    } else if (sort.active === 'date' && sort.direction === 'asc') {
      this.sortDate = { active: 'date', direction: '' };
    }
    this.tableService.updateTableData(this.sortedData);
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a > b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  compareDates(a: Date, b: Date, isAsc: boolean) {
    console.log(a);
    console.log(b);
    const adate = new Date(a);
    const bdate = new Date(b);
    const compareResult = adate.getTime() - bdate.getTime();
    return isAsc ? -compareResult : compareResult;
  }
}
