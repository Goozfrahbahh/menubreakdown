import { Component } from '@angular/core';
import {
  EntreeList,
  FoodMenuGroupGUID,
  GroupEntreeList,
  Groups,
  ItemGroup,
  MenuGroups,
  MenuItem,
} from '../../../shared/models/menubreakdown';
import { MenuService } from '../services/menu.service';
import { Subject, takeUntil } from 'rxjs';
import {
  trigger,
  transition,
  style,
  animate,
  keyframes,
} from '@angular/animations';
import { MenuCategory } from '../models/categories';

@Component({
  selector: 'app-menu-editor',
  template: `
    <div
      class="menu-container w-full h-full flex flex-row px-4 pt-6 pb-6 rounded-xl items-start content-start align-left justify-start"
      @inOutPaneAnimation
      *ngIf="isOpen"
    >
      <div
        class="categorylist-container flex flex-col h-full z-20 justify-start rounded-xl shadow-2xl dark:divide-gray-700 dark:bg-zinc-700 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-800/20 to-zinc-900 "
      >
        <h2
          class="title-menu pl-6 p-4 pb-10 text-2xl text-left font-semibold text-[#e8823c]"
        >
          Category
        </h2>
        <ul
          class="categories inline-flex w-full max-h-fit flex-col items-center content-center group justify-stretch text-center align-middle rounded-lg hover:backdrop-brightness-150"
          *ngFor="
            let category of categories;
            let index = index;
            trackByfn: trackByIndex
          "
        >
          <li
            class="w-full h-full bg-opacity-30"
            [ngClass]="category.selected ? 'selected' : ''"
          >
            <button
              (click)="onSelectCategory(category.group, index)"
              @inOutPaneAnimation
              [ngClass]="category.selected ? 'textwht' : ''"
              class="flex py-6 px-14 flex-grow min-w-full w-full flex-auto first-of-type:rounded-t-xl last-of-type:rounded-b-xl category-filter text-gray-400 group-hover:text-white font-serif text-xl m-auto"
            >
              {{ category.group }}
            </button>
          </li>
        </ul>
      </div>
      <div
        *ngIf="filtered.length > 0"
        @inOutPaneAnimation2
        class="flex flex-col min-w-fit h-full z-10 dark:divide-gray-700 dark:bg-zinc-700 dark:bg-opacity-50 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-800/20 to-zinc-900 overflow-hidden"
      >
        <div class="flex flex-col overflow-x-hidden">
          <div
            class="relative max-w-[250px] mt-4 md:mt-0 flex flex-row flex-nowrap"
          >
            <h2
              class="title-menu flex min-w-fit pt-4 pl-6 p-4 pb-6 text-2xl text-left font-semibold text-[#e8823c]"
            >
              Menu Information
            </h2>
            <div class="pt-2 relative mx-auto text-gray-600 -right-4 top-6">
              <input
                class="border-2 border-[#9f9f9f] bg-transparent h-10 px-5 pr-16 active:outline-[#0fc8f6] active:border-[#0fc8f6] rounded-lg text-sm text-white focu  focus:ring-4 focus:outline-none focus:ring-[#0fc8f6]"
                placeholder="Search"
                #searchBoxtwo
                (input)="searchCategories(searchBoxtwo.value)"
              />
              <button type="submit" class="absolute right-0 top-0 mt-5 mr-4">
                <svg
                  class="text-gray-600 h-4 w-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  id="Capa_1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 56.966 56.966"
                  style="enable-background:new 0 0 56.966 56.966;"
                  xml:space="preserve"
                  width="512px"
                  height="512px"
                >
                  <path
                    d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div class="conatiner-entree p-4 overflow-x-hidden overflow-y-scroll">
            <app-entree [entreeList]="categoryList"></app-entree>
          </div>
        </div>
      </div>
      <div class="edit-section" *ngIf="selectedMenuItem">
        <app-entree-detail
          [selectedMenuItem]="selectedMenuItem"
        ></app-entree-detail>
      </div>
    </div>
  `,
  styles: [
    `
      .selected {
        background-color: #848484 !important;
        background-opacity: 40%;
        border-radius: 0.5rem;
      }
      .textwht {
        color: #fff !important;
      }
    `,
  ],
  animations: [
    trigger('inOutPaneAnimation', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateX(-50%)',
        }),
        animate(
          '500ms ease',
          style({ opacity: 1, transform: 'translateX(0)' })
        ),
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateX(0)' }), //apply default styles before animation starts
        animate(
          '600ms ease',
          style({ opacity: 0, transform: 'translateX(-50%)' })
        ),
      ]),
    ]),
    trigger('inOutPaneAnimation2', [
      transition(':enter', [
        style({
          opacity: 0,
          display: 'block',
          transform: 'translateX(-50%)',
          overflow: 'hidden',
        }),
        animate(
          '750ms ease-in-out',
          keyframes([
            style({ opacity: 0, z: -10, transform: 'translateX(-30%)' }),
            style({ opacity: 0.2, z: -10, transform: 'translateX-10%)' }),
            style({ opacity: 1, z: 20, transform: 'translateX(0)' }),
          ])
        ),
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateX(0)' }), //apply default styles before animation starts
        animate(
          '600ms ease',
          keyframes([
            style({ opacity: 0.2, z: -10, transform: 'translateX-10%)' }),
            style({ opacity: 0, z: -10, transform: 'translateX(-40%)' }),
            style({ opacity: 0, z: -10, transform: 'translateX(-5100%)' }),
          ])
        ),
      ]),
    ]),
  ],
})
export class MenuEditorComponent {
  categories: MenuCategory[] = [];
  categoriesTemp: string[] = [];
  filtered: string[] = [];
  menuGroups: Groups[] = [];
  isOpen: boolean = false;
  dataList: any[] = [];
  categoryListInit: any[] = [];
  categoryListTemp: GroupEntreeList[] = [];
  categoryList: GroupEntreeList[] = [];
  cachedData: any[] = [];
  selectedMenuItem: GroupEntreeList;
  private destroy$ = new Subject<void>();

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.isOpen = true;
    Object.values(FoodMenuGroupGUID).forEach((item: ItemGroup) => {
      this.categoriesTemp.push(item.group);
    });
    console.log(this.categoriesTemp);
    for (let cat of this.categoriesTemp) {
      this.categories.push({
        group: cat,
        selected: false,
      });
    }

    this.menuGroups = MenuGroups;
    const categoryMap = this.setInventoryCategories(this.menuGroups);

    this.dataList = Object.values(categoryMap);
    this.dataList = this.dataList.map((item) => {
      for (let i of item) {
        this.categoryListInit.push(i);
      }
    });
    console.log(this.categoryListInit);
    this.menuService.updateEntreeListCategories(this.categoryListInit);

    this.menuService.entreeList$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.categoryListTemp = data;
      });

    this.menuService.filteredList$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data) {
          this.categoryList = data;
        }

        if (this.cachedData.length < 1) {
          this.cachedData = data;
        }
      });

    this.menuService.selectedItem$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.selectedMenuItem = data;
      });
  }

  searchCategories(term: string) {
    if (term === '' || term === null) {
      this.menuService.updateFilteredList(this.cachedData);
    }
    this.menuService.searchItems(term);
  }

  onSelectCategory(category: string, i) {
    this.categories[i].selected = !this.categories[i].selected;
    this.filtered = [];
    this.categories.forEach((category) => {
      if (category.selected === true) {
        this.filtered.push(category.group);
      }
    });

    let allCategoryItems: GroupEntreeList[] = [];

    // Iterate through the filtered array and get all items for each category
    this.filtered.forEach((filteredCategory) => {
      const categoryItems = this.categoryListTemp.filter(
        (item) => item.group === filteredCategory
      );
      allCategoryItems = allCategoryItems.concat(categoryItems);
    });
    console.log('Before');
    console.log(allCategoryItems);
    allCategoryItems = allCategoryItems = allCategoryItems.reduce(
      (acc: GroupEntreeList[], curr: GroupEntreeList) => {
        const sameValue = acc.findIndex((item) => item.item === curr.item);
        if (sameValue === -1) {
          acc.push(curr);
        }
        return acc;
      },
      []
    );
    console.log(allCategoryItems);
    this.menuService.updateFilteredList(allCategoryItems);
  }

  trackByIndex(value: MenuCategory, index: number) {
    return value[index];
  }

  setInventoryCategories(menuGroups: Groups[]) {
    const categoryMap = {};
    menuGroups.forEach((group) => {
      Object.entries(group).forEach(([key, menuItems]) => {
        const menuKey = key;
        menuItems.forEach((menuItem) => {
          if (menuItem.categories) {
            menuItem.categories.forEach((categoryObj) => {
              const category = categoryObj.category;
              const itemData: GroupEntreeList = {
                group: menuKey,
                item: menuItem.name,
                portion: categoryObj.portion,
                description: menuItem.description,
                masterId: Number(menuItem.masterId),
                imageUrl: menuItem.imageUrl,
              };

              if (categoryObj.modifier) {
                itemData.modifier = categoryObj.modifier;
              }

              if (categoryMap[category]) {
                categoryMap[category].push(itemData);
              } else {
                categoryMap[category] = [itemData];
              }
            });
          }
        });
      });
    });
    console.log(categoryMap);
    return categoryMap;
  }
}
