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
      class="w-full inline-block bg-zinc-500 dark:bg-zinc-700 dark:bg-opacity-[.45] shadow-xl border-b-[.5px]"
    >
      <tr
        class="align-middle text-center border-b-[1px] border-zinc-600 border-b-zinc-500"
      >
        <th
          scope="col"
          class="px-10 pl-9 pr-9 w-[260px] align-middle text-left text-sm font-serif rtl:text-right text-gray-700 dark:text-gray-400"
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
          class="px-12 py-4 w-[100px] align-middle text-sm font-semibold font-serif rtl:text-right text-gray-700 dark:text-gray-400"
        >
          <div class="pl-4 items-center text-center gap-x-3 focus:outline-none">
            Sold
            <ng-container *ngIf="sortSold.direction === 'asc'">
              <button
                type="button"
                (click)="sortData(sortSold)"
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
            <ng-container *ngIf="sortSold.direction === ''">
              <button type="button" (click)="sortData(sortSold)">
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
          class="px-4 pl-10 pr-9 w-[89px] align-middle text-sm font-semibold font-serif rtl:text-right text-gray-700 dark:text-gray-400"
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
  sortSold: Sort;
  sortGroup: Sort;
  menubreakdowns: MenuBreakdown[] = [];
  constructor(private tableService: TableService) {}

  ngOnInit() {
    this.sortGroup = { active: 'group', direction: 'asc' };
    this.sortId = { active: 'id', direction: 'asc' };
    this.sortDate = { active: 'date', direction: 'asc' };
    this.sortItem = { active: 'item', direction: 'asc' };
    this.sortSold = { active: 'sold', direction: '' };
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
        case 'sold':
          return this.compare(a.sold, b.sold, isAsc);
        case 'group':
          return this.compare(a.group, b.group, isAsc);
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
    if (sort.active === 'group' && sort.direction === '') {
      this.sortGroup = { active: 'group', direction: 'asc' };
    } else if (sort.active === 'group' && sort.direction === 'asc') {
      this.sortGroup = { active: 'group', direction: '' };
    }
    if (sort.active === 'sold' && sort.direction === '') {
      this.sortSold = { active: 'sold', direction: 'asc' };
    } else if (sort.active === 'sold' && sort.direction === 'asc') {
      this.sortSold = { active: 'sold', direction: '' };
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
