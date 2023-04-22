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
    <thead class="w-full bg-gray-50 dark:bg-zinc-800 bg-opacity-70">
      <tr>
        <th
          scope="col"
          class="py-3.5 px-4 w-[185px] text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
        >
          <button class="items-center gap-x-3 focus:outline-none">
            <span>Item</span>
            <ng-container *ngIf="sortItem.direction === 'asc'">
              <button
                type="button"
                (click)="sortData(sortItem)"
                class="fill-transparent hover:fill-black"
              >
                <svg
                  class="h-3"
                  viewBox="0 0 10 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z"
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-width="0.1"
                  />
                  <path
                    d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z"
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-width="0.1"
                  />
                  <path
                    d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z"
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-width="0.3"
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
          class="px-10 py-3.5 w-[50px] text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
        >
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
        </th>

        <th
          scope="col"
          class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
        >
          Date
          <ng-container *ngIf="sortDate.direction === 'asc'">
            <button
              type="button"
              (click)="sortData(sortDate)"
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
        </th>

        <th scope="col" class="relative py-3.5 px-7">
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
