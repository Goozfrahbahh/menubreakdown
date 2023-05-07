import { Component } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import {
  trigger,
  transition,
  style,
  animate,
  keyframes,
} from '@angular/animations';
import { MenuCategory } from '../../models/categories';
import {
  Groups,
  GroupEntreeList,
  FoodMenuGroupGUID,
  MenuGroups,
  ItemGroup,
} from '../../../shared/models/menubreakdown';
import { ProviderService } from '../../../shared/services/provider.service';

@Component({
  selector: 'app-menu-editor',
  template: `
    <div
      class="menu-container w-full h-full flex flex-row px-4 pt-6 pb-8 rounded-xl items-start content-start align-left justify-start"
    >
      <div
        class="categorylist-container flex flex-col h-full z-20 justify-start rounded-xl shadow-2xl dark:bg-zinc-700 dark:bg-opacity-50 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-800/20 to-zinc-900 "
        @inOutPaneAnimation
        *ngIf="isOpen"
      >
        <h2
          class="title-menu pl-6 p-4 pb-10 text-2xl text-left font-semibold text-gray-200"
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
            [ngClass]="category.selected ? 'backdrop-brightness-150' : ''"
          >
            <button
              (click)="onSelectCategory(category.group, index)"
              @inOutPaneAnimation
              [ngClass]="category.selected ? 'textwht' : ''"
              class="flex py-6 px-14 flex-grow min-w-full w-full flex-auto uppercase text-sm first-of-type:rounded-t-xl last-of-type:rounded-b-xl category-filter text-gray-400 group-hover:text-white font-serif m-auto"
            >
              {{ category.group }}
            </button>
          </li>
        </ul>
      </div>
      <div
        *ngIf="filtered.length > 0"
        @inOutPaneAnimation2
        class="flex h-full max-w-fit border-4 z-10 shadow-xl border-zinc-800/80 dark:divide-gray-700 dark:bg-zinc-700 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-zinc-800 via-zinc-700 to-zinc-800 overflow-hidden"
      >
        <div class="flex flex-col overflow-x-hidden">
          <div class="relative mt-4 md:mt-0 flex flex-row flex-nowrap">
            <h2
              class="title-menu whitespace-nowrap min-w-fit pt-4 pl-6 p-4 pb-6 mb-2 text-md text-left font-semibold text-gray-400"
            >
              Menu Information
            </h2>
            <div class="pt-2 relative mx-auto text-gray-600 -right-4 top-4">
              <input
                class="border-2 border-[#9f9f9f] bg-transparent h-10 px-5 pr-16 active:outline-[#0fc8f6] active:border-[#0fc8f6] rounded-lg text-sm text-white  focus:ring-2 focus:outline-none focus:ring-[#0fc8f6]"
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
          <div
            class="conatiner-entree p-4 backdrop-blur-sm overflow-x-hidden overflow-y-scroll"
          >
            <app-entree [entreeList]="categoryList"></app-entree>
          </div>
          d
        </div>
      </div>
      <div
        class="edit-section flex"
        *ngIf="selectedMenuItem"
        @inOutPaneAnimation
      >
        <app-entree-detail></app-entree-detail>
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
          '600ms ease',
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
          width: 0,
          postion: 'absolute',
        }),
        animate(
          '2s cubic-bezier( 0.455, 0.03, 0.515, 0.955 )',
          style({ width: '100%' })
        ),
      ]),
      transition(':leave', [
        style({ width: '100%' }), //apply default styles before animation starts
        animate('500ms ease-out', style({ width: 0, postion: 'absolute' })),
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
  groupedList: GroupEntreeList;
  selectedMenuItem: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(
    private menuService: MenuService,
    private provider: ProviderService
  ) {}

  ngOnInit() {
    // run animation metadata
    this.isOpen = true;

    // Get Menu groups to set up filter menu
    this.setMenuGroups(FoodMenuGroupGUID);

    this.provider.menuGroups$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.menuGroups = data;
        const categoryMap = this.setInventoryCategories(MenuGroups);
        this.mapCategoryGroupsToEntrees(categoryMap);
        this.menuService.updateEntreeListCategories(this.categoryListInit);
      });

    //     console.log(MenuGroups);
    //     // map menu categoryg groups from menu data
    //     const categoryMap = this.setInventoryCategories(MenuGroups);

    //     // map category groups to
    //     this.mapCategoryGroupsToEntrees(categoryMap);

    //     this.menuService.updateEntreeListCategories(this.categoryListInit);

    // Subscribe to entreeList$ observable and update categoryListTemp when data is emitted
    this.menuService.entreeList$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.categoryListTemp = data;
      });

    // Subscribe to filteredList$ observable and update categoryList and cachedData when data is emitted
    this.menuService.filteredList$
      .pipe(debounceTime(100), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data) {
          this.categoryList = data;
        }

        if (this.cachedData.length < 1) {
          this.cachedData = data;
        }
      });

    // Subscribe to selectedItem$ observable and update selectedMenuItem when data is emitted
    this.menuService.selectedItem$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: GroupEntreeList) => {
        this.selectedMenuItem = true;
      });
  }

  // Map category groups to entrees
  mapCategoryGroupsToEntrees(categoryMap: any) {
    this.dataList = Object.values(categoryMap);
    this.dataList = this.dataList.map((item) => {
      for (let i of item) {
        this.categoryListInit.push(i);
      }
    });

    return this.categoryListInit;
  }

  // Set up Inventory Menu Categories
  setMenuGroups(menuGroups: ItemGroup[]) {
    Object.values(menuGroups).forEach((item: ItemGroup) => {
      this.categoriesTemp.push(item.group);
    });
    for (let cat of this.categoriesTemp) {
      this.categories.push({
        group: cat,
        selected: false,
      });
    }
  }

  searchCategories(term: string) {
    this.menuService.searchItems(term);
  }

  onSelectCategory(category: string, i: number) {
    // Remove group filter from menu group category selection menu
    this.categories[i].selected = !this.categories[i].selected;

    // Reset filtered Value
    this.filtered = [];

    // Set filtered value based on selected categories
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

    // Account for duplicate group data accross different entree items
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
    if (allCategoryItems.length < 1) {
      this.menuService.updateSelectedMenuItem(this.groupedList);
    }
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
