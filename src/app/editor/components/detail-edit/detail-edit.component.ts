import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  MenuItemGroups,
  MenuItem,
  GroupEntreeList,
} from '../../../shared/models/menubreakdown';
import { EditingService } from '../../services/editing.service';
import { Subject, takeUntil } from 'rxjs';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-editable',
  template: `
    <div
      class="paper min-w-full w-[420px] p-4 h-full min-h-full relative float-right text-gray-200 border-zinc-900/60 border-2 shadow-xl cursor-pointer rounded transform duration-300 ease-in-out overflow-hidden"
      *ngIf="menuItem"
    >
      <button
        class="absolute right-6 -top-20 max-w-[18px] max-h-[18px]"
        (click)="close()"
      >
        <app-close></app-close>
      </button>
      <div class="lines min-w-full min-h-full inline-block">
        <h2
          class="title-menu whitespace-nowrap min-w-fit pt-4 pl-6 p-4 pb-6 mb-2 text-md text-left font-bold text-gray-400"
        >
          Menu Item
        </h2>
        <div class="pt-8 flex-col inline-flex">
          <h2 class="max-w-fit font-medium mt-16 relative">
            <label
              for="floating_filled"
              class="absolute shadow-lg text-base font-serif font-bold text-[#ffcd58] dark:text-[#ffcd58] duration-300 transform -translate-y-4 scale-75 -top-3 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
              >Name</label
            >
            <ng-container
              class="list text-white shadow-lg"
              *ngIf="!isEditable; else nameEdit"
            >
              {{ menuItem.name }}
            </ng-container>
            <ng-template #nameEdit>
              <input
                class="bg-zinc-800 text-white"
                type="text"
                [value]="pendingItem.name"
                [(ngModel)]="pendingItem.name"
              />
            </ng-template>
          </h2>
          <p class="max-w-fit font-medium mt-16 relative">
            <label
              for="floating_filled"
              class="absolute shadow-lg text-base font-serif font-bold text-[#ffcd58] dark:text-[#ffcd58]  duration-300 transform -translate-y-4 scale-75 -top-3 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
              >Category</label
            >
            <ng-container
              class="list text-white shadow-lg"
              *ngIf="!isEditable; else groupEdit"
            >
              {{ menuItem.group }}
            </ng-container>
            <ng-template #groupEdit>
              <input
                class="bg-zinc-800 text-white"
                type="text"
                [value]="pendingItem.group"
                [(ngModel)]="pendingItem.group"
              />
            </ng-template>
          </p>
          <p class="w-[400px] font-medium mt-16 relative">
            <label
              for="floating_filled"
              class="absolute shadow-lg text-base font-serif font-bold text-[#ffcd58] dark:text-[#ffcd58] duration-300 transform -translate-y-4 scale-75 -top-3 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
              >Description</label
            >
            <ng-container
              class="list text-white shadow-lg"
              *ngIf="!isEditable; else descriptionEdit"
            >
              {{ description }}
            </ng-container>
            <ng-template #descriptionEdit>
              <textarea
                style="resize:both"
                type="text"
                class="bg-zinc-800 text-white w-[400px]"
                [value]="pendingItem.description"
                [(ngModel)]="pendingItem.description"
              ></textarea>
            </ng-template>
          </p>
          <div
            *ngIf="menuItem.categories"
            class="overflow-y-scroll overflow-x-hidden mt-8 relative max-h-[30vh] w-[400px]"
          >
            <table class="w-[400px] text-center table-auto h-10 o mt-2">
              <thead class="">
                <th class="font-medium text-sm text-[#ffcd58] px-6 py-2">
                  Category
                </th>
                <th class="font-medium text-sm text-[#ffcd58] px-6 py-2">
                  Portion
                </th>
                <th class="font-medium text-sm text-[#ffcd58] px-6 py-2">
                  Modifier
                </th>
              </thead>
              <tr
                class="mt-2 w-fit"
                *ngFor="let item of menuItem.categories; let i = index"
              >
                <td
                  class="font-medium text-sm text-gray-100 px-6 py-2 pt-1 shadow-lg"
                >
                  <ng-container
                    class="bg-zinc-800 text-white"
                    *ngIf="!isEditable; else categoryEdit"
                  >
                    {{ item.category }}
                  </ng-container>
                  <ng-template #categoryEdit>
                    <input
                      class="bg-zinc-800  text-white inline-block w-28"
                      type="text"
                      [value]="pendingItem.categories[i].category"
                      [(ngModel)]="pendingItem.categories[i].category"
                    />
                  </ng-template>
                </td>
                <td
                  class="font-medium text-sm text-gray-100 px-6 py-2 pt-1 shadow-lg"
                >
                  <ng-container
                    class="bg-zinc-800 text-white"
                    *ngIf="!isEditable; else portionEdit"
                  >
                    {{ item.portion }}
                  </ng-container>
                  <ng-template #portionEdit>
                    <input
                      class="bg-zinc-800 text-white w-14"
                      type="text"
                      [value]="pendingItem.categories[i].portion"
                      [(ngModel)]="pendingItem.categories[i].portion"
                    />
                  </ng-template>
                </td>
                <td
                  class="font-medium text-sm text-gray-100 px-6 py-2 pt-1 shadow-lg"
                >
                  <ng-container
                    class="bg-zinc-800 text-white"
                    *ngIf="!isEditable; else modifierEdit"
                  >
                    {{ item.modifier }}
                  </ng-container>
                  <ng-template #modifierEdit>
                    <input
                      class="bg-zinc-800 text-white w-28"
                      type="text"
                      [value]="pendingItem.categories[i].modifier"
                      [(ngModel)]="pendingItem.categories[i].modifier"
                    />
                  </ng-template>
                </td>
              </tr>
              <tr class="inline-block" *ngIf="isEditable">
                <button (click)="addCategory()" class="text-green-400">
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
                      d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
                <button (click)="removeCategory()" class="text-red-500">
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
                      d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </tr>
            </table>
          </div>
          <p class="font-light mt-14 relative inline-block">
            <label
              for="floating_filled"
              class="absolute shadow-lg text-base font-serif font-bold text-[#ffcd58] dark:text-[#ffcd58] duration-300 transform -translate-y-4 scale-75 -top-3 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
              >Image Url</label
            >
            <ng-container
              class="list text-white"
              *ngIf="!isEditable; else imageEdit"
            >
              {{ img }}
            </ng-container>
            <ng-template #imageEdit>
              <input
                class="bg-transparent text-white w-[400px] min-w-fit "
                type="text"
                [value]="pendingItem.imageUrl"
                [(ngModel)]="pendingItem.imageUrl"
              />
            </ng-template>
          </p>
          <div class="flex flex-row justify-between mt-10 mr-4">
            <button
              (click)="edit()"
              *ngIf="!isEditable && !isSubmitting"
              class="rounded-md px-3.5 py-2 m-1 mt-[2px] overflow-hidden relative group cursor-pointer border-2 font-sm border-zinc-600 text-[#ffcd58]"
            >
              <span
                class="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-[#ffcd58] bg-opacity-70 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"
              ></span>
              <span
                class="relative text-white transition duration-300
            group-hover:text-gray-100 ease"
              >
                Edit
              </span>
            </button>
            <button
              *ngIf="isEditable"
              class="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-zinc-600 text-[#ffcd58]"
              (click)="cancel()"
            >
              <span
                class="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-[#ffcd58] bg-opacity-70 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"
              ></span>
              <span
                class="relative text-white transition duration-300
            group-hover:text-gray-100 ease"
                >Cancel
              </span>
            </button>
            <button
              *ngIf="isEditable"
              class="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-zinc-600 text-[#ffcd58]"
              (click)="processChanges()"
            >
              <span
                class="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-[#ffcd58] bg-opacity-70 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"
              ></span>
              <span
                class="relative text-[#ffabff] transition duration-300
            group-hover:text-gray-100 ease"
                >Save
              </span>
            </button>
          </div>
          <div
            class="flex w-[400px] items-center mt-4 flex-col animate-pulse"
            *ngIf="isSubmitting"
          >
            <p class="flex  text-lg font-serif font-bold align-middle">
              Are You Sure?
            </p>
            <div class="flex flex-row">
              <button
                (click)="onSaveConfirm()"
                class="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-zinc-600 text-[#ffcd58]"
              >
                <span
                  class="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-[#ffcd58] bg-opacity-70 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"
                ></span>
                <span
                  class="relative text-[#ffabff] transition duration-300
            group-hover:text-gray-100 ease"
                >
                  Yes
                </span>
              </button>
              <button
                (click)="cancel()"
                class="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-zinc-600 text-[#ffcd58]"
              >
                <span
                  class="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-[#ffcd58] bg-opacity-70 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"
                ></span>
                <span
                  class="relative text-[#ffabff] transition duration-300
            group-hover:text-gray-100 ease"
                >
                  No
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .paper::before {
        content: '';
        position: absolute;
        left: 45px;
        height: 100%;
        width: 2px;
      }
      .lines {
        margin-top: 0px;
        min-width: 100%;
        min-height: 100%;
        height: 100%;
        width: 100%;
      }
    `,
  ],
})
export class DetailEditComponent implements OnInit, OnDestroy {
  menuItem: MenuItem;
  itemReset: GroupEntreeList;
  isEditable: boolean = false;
  isSubmitting: boolean = false;
  pendingItem: MenuItem;
  cachedItem: MenuItem;
  itemChanges: EventEmitter<any> = new EventEmitter<any>();
  msgComplete: string;
  img: string;
  description: string;
  filler: number;
  private destroy$ = new Subject<void>();

  constructor(
    private editingService: EditingService,
    private menuService: MenuService
  ) {}
  ngOnInit() {
    this.editingService.menuItem$
      .pipe(takeUntil(this.destroy$))
      .subscribe((menuItems) => {
        this.menuItem = menuItems;
        this.description = this.menuItem.description.slice(0, 170) + '......';
        if (this.menuItem.imageUrl) {
          this.img = this.menuItem.imageUrl.slice(0, 50) + '.....';
        }
        this.pendingItem = menuItems;
      });
  }
  close() {
    this.menuService.updateSelectedMenuItem(this.itemReset);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  trackByFn(index: number, item: MenuItemGroups): MenuItemGroups {
    return item[index];
  }

  addCategory() {
    this.menuItem.categories.push({
      category: '',
      portion: this.filler,
      modifier: '',
    });
    this.editingService.updateEditingItem(this.menuItem);
  }

  removeCategory() {
    this.menuItem.categories.pop();
    this.editingService.updateEditingItem(this.menuItem);
  }

  cancel(): void {
    this.menuItem.categories.forEach((cat, i) => {
      if (cat.category === '') {
        this.menuItem.categories.splice(i, 1);
      }
    });
    this.isEditable = false;
    this.isSubmitting = false;
    this.editingService.updateEditingItem(this.menuItem);
  }

  edit() {
    this.isEditable = true;
  }
  processChanges() {
    if (JSON.stringify(this.pendingItem) !== JSON.stringify(this.menuItem)) {
      this.editingService.updateEditingItem(this.pendingItem);
    }
    this.isSubmitting = true;
    this.isEditable = false;
  }
  onSaveConfirm() {
    console.log('heysaveconf');
    this.isSubmitting = false;
    this.msgComplete = `Updated Item ${this.pendingItem.name}`;
    this.editingService.updateMenuItem(this.pendingItem);
    this.isEditable = false;
  }
}
