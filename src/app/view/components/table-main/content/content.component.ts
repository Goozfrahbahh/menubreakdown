import { Component, Input, OnInit } from '@angular/core';
import { ViewService } from '../../../services/view.service';
import {
  Observable,
  Subject,
  debounce,
  debounceTime,
  delay,
  distinct,
  distinctUntilChanged,
  mergeMap,
  of,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { TableService } from '../../../services/table.service';
import { MenuBreakdown } from '../../../../shared/models/menubreakdown';
import { Router } from '@angular/router';

@Component({
  selector: 'app-content',
  template: `
    <div
      class="sm:flex h-full w-full sm:items-center sm:justify-between overflow-hidden font-sans"
    >
      <div class="flex items-center mt-4 gap-x-3">
        <button
          class="flex items-center justify-center w-1/2 px-5 py-[5px] text-sm text-gray-700 bg-gray-200 transition-colors duration-200 border-[.5px] rounded-lg gap-x-2 sm:w-auto dark:hover:bg-indigo-500/70 dark:bg-zinc-800 dark:border-indigo-500 dark:bg-opacity-70 hover:bg-white dark:text-gray-400"
          (click)="routeNavigateUpload()"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_3098_154395)">
              <path
                d="M13.3333 13.3332L9.99997 9.9999M9.99997 9.9999L6.66663 13.3332M9.99997 9.9999V17.4999M16.9916 15.3249C17.8044 14.8818 18.4465 14.1806 18.8165 13.3321C19.1866 12.4835 19.2635 11.5359 19.0351 10.6388C18.8068 9.7417 18.2862 8.94616 17.5555 8.37778C16.8248 7.80939 15.9257 7.50052 15 7.4999H13.95C13.6977 6.52427 13.2276 5.61852 12.5749 4.85073C11.9222 4.08295 11.104 3.47311 10.1817 3.06708C9.25943 2.66104 8.25709 2.46937 7.25006 2.50647C6.24304 2.54358 5.25752 2.80849 4.36761 3.28129C3.47771 3.7541 2.70656 4.42249 2.11215 5.23622C1.51774 6.04996 1.11554 6.98785 0.935783 7.9794C0.756025 8.97095 0.803388 9.99035 1.07431 10.961C1.34523 11.9316 1.83267 12.8281 2.49997 13.5832"
                stroke="currentColor"
                stroke-width="1.67"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_3098_154395">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>

          <span>Add/Delete Menu-Breakdown's</span>
        </button>

        <button
          class="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors border-[.5px] duration-200 bg-gray-200 shrink-0 sm:w-auto gap-x-2 dark:hover:bg-indigo-500/70 dark:bg-zinc-800 dark:border-indigo-500 dark:bg-opacity-70 hover:bg-white dark:text-gray-400 rounded-lg"
          (click)="changeDatesSelected()"
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
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
            />
          </svg>

          <span>Change Date Selection</span>
        </button>
      </div>
    </div>

    <div class="flex md:flex md:items-center mt-2">
      <div
        class="inline-flex overflow-hidden bg-white border-[.5px] divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-indigo-500 dark:divide-indigo-500"
      >
        <button
          (click)="viewAll()"
          class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 bg-white/90 sm:text-sm dark:hover:bg-indigo-500/70 dark:bg-zinc-800 dark:border-indigo-500/50 dark:bg-opacity-70 hover:bg-white dark:text-gray-400 rounded-l-md"
        >
          View All
        </button>

        <button
          (click)="combinedData()"
          class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 bg-white/90 sm:text-sm dark:hover:bg-indigo-500/70 dark:bg-zinc-800 dark:border-indigo-500/50 dark:bg-opacity-70 hover:bg-white dark:text-gray-400 rounded-r-md"
        >
          Combined
        </button>
      </div>

      <div class="relative flex items-center max-w-[150px] ml-1 mt-4 md:mt-0">
        <span class="absolute max-w-fit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </span>
        <input
          type="text"
          #searchBox
          (input)="search(searchBox.value)"
          class="inline-flex w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-zinc-800 dark:text-gray-400 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none focus:ring focus:ring-opacity-40"
        />
      </div>
      <div (clickOutside)="clickedOutside()" class="relative flex">
        <button
          (click)="toggleMenu()"
          class="flex  text-white bg-gray-200 items-center justify-center w-40  px-5 py-2 ml-1 text-sm font-semibold text-left dark:hover:bg-zinc-800 dark:bg-zinc-800 dark:bg-opacity-80 hover:bg-zinc-800 dark:text-gray-400 rounded-lg "
        >
          <span x-text="sortType">Filter by</span>
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            :class="{'rotate-180': openSort, 'rotate-0': !openSort}"
            class="w-4 h-4  transition-transform duration-200 transform "
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
        <ng-container *ngIf="openSort">
          <div class="absolute z-50 w-full origin-top-right -mr-10 mt-7">
            <div
              class="px-2 pt-2 pb-2 bg-transparent rounded-md shadow-lg dark-mode:bg-gray-700"
            >
              <ul class="flex flex-col rounded" *ngFor="let date of dateList">
                <li
                  class="flex flex-row items-center justify-center bg-zinc-800 bg-opacity-60 p-2 hover:bg-opacity-80 "
                >
                  <button
                    class="flex flex-row"
                    (click)="filterByDate(date.date)"
                  >
                    <p
                      class="font-semibold text-center text-white dark:text-gray-400"
                    >
                      {{ date.date | date : 'shortDate' }}
                    </p>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </ng-container>
      </div>
    </div>
  `,
})
export class ContentComponent implements OnInit {
  term = '';
  searchTerm$ = new Subject<string>();
  @Input() dataList: MenuBreakdown[] = [];
  openSort: boolean = false;
  dateList: any[] = [];
  cachedData: any[] = [];
  id: number;
  list$: any;
  private destroy$ = new Subject<void>();

  constructor(
    private tableService: TableService,
    private viewService: ViewService,
    private route: Router
  ) {}

  ngOnInit() {
    this.tableService.range$
      .pipe(
        tap((results: any) => console.log(results)),
        takeUntil(this.destroy$)
      )
      .subscribe((range: any[]) => {
        this.dateList = range;
        console.log(this.dateList);
      });
    this.list$ = this.searchTerm$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((term) => this.tableService.searchItems(term))
    );
  }

  search(term: string) {
    if (this.cachedData.length > this.dataList.length) {
      this.dataList = this.cachedData;
    }
    if (this.cachedData.length < this.dataList.length) {
      this.cachedData = this.dataList;
    }
    if (term === '' || term === null) {
      this.tableService.updateTableData(this.cachedData);
    }
    this.tableService.searchItems(term);
  }

  clickedOutside() {
    this.openSort = false;
  }

  toggleMenu() {
    this.openSort = !this.openSort;
  }

  routeNavigateUpload() {
    this.route.navigateByUrl('/upload');
  }

  filterByDate(date: Date) {
    const dayId = `${date.toLocaleDateString('en-us', {
      day: '2-digit',
    })}`;
    const month = `${date.toLocaleDateString('en-us', {
      month: '2-digit',
    })}`;
    const year = `${date.getFullYear()}`;

    this.id = Number(`${year}${month}${dayId}`);
    if (this.cachedData.length < this.dataList.length) {
      this.cachedData = this.dataList;
    }
    if (this.cachedData.length > this.dataList.length) {
      this.dataList = this.cachedData;
    }
    this.openSort = false;
    console.log(this.id);
    const data = this.dataList.filter((item) => item.id === this.id);

    console.log(data);

    this.tableService.updateTableData(data);
  }

  viewAll() {
    this.tableService.updateTableData(this.cachedData);
  }

  combinedData() {
    if (this.cachedData.length > this.dataList.length) {
      this.dataList = this.cachedData;
    }
    if (this.cachedData.length < this.dataList.length) {
      this.cachedData = this.dataList;
    }
    const combinedItems: { [key: string]: MenuBreakdown } = {};
    const combinedQuantities = (list: MenuBreakdown[]) => {
      this.dataList.forEach((item) => {
        if (combinedItems[item.item]) {
          combinedItems[item.item].quantity += item.quantity;
        } else {
          combinedItems[item.item] = { ...item };
        }
      });

      return Object.values(combinedItems);
    };

    const combinedData = combinedQuantities(this.dataList);

    this.tableService.updateTableData(combinedData);
  }

  changeDatesSelected() {
    this.viewService.updateView(false);
  }
}
