import { Component, Input, OnInit } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { MenuCategories } from '../../models/categories';
import { MenuService } from '../../services/menu.service';
import {
  GroupEntreeList,
  Groups,
  MenuGroups,
  MenuItem,
} from '../../../shared/models/menubreakdown';
import { trigger, transition, style, animate } from '@angular/animations';
import { MenuItemsService } from '../../../shared/services/menuitems.service';
import { ProviderService } from '../../../shared/services/provider.service';
@Component({
  selector: 'app-entree-detail',
  template: `
    <div
      class="group-container  w-50 relative justify-center items-center align-middle flex"
      *ngIf="menuItem"
    >
      <div class="container mx-auto bg-gray-100 py-10 flex justify-center">
        <div
          class="bg-white w-80 shadow-lg cursor-pointer rounded transform hover:scale-105 duration-300 ease-in-out"
        >
          <div class="p-4">
            <h2 class="text-2xl uppercase">{{ menuItem.name }}</h2>
            <p class="font-light text-gray-500 text-lg my-2">
              {{ selectedGroup }}
            </p>
            <p>
              {{ menuItem.description }}
            </p>
            <div *ngIf="menuItem.categories">
              <table
                class="min-w-full text-center"
                *ngFor="let item of menuItem.categories | keyvalue"
              >
                <thead class="border-b">
                  <th class="text-sm font-medium text-gray-900 px-6 py-4">
                    Category
                  </th>
                  <th class="text-sm font-medium text-gray-900 px-6 py-4">
                    Portion
                  </th>
                </thead>
                <tr class="border-b">
                  <td
                    class="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap"
                  >
                    {{ item.value['category'] }}
                  </td>
                  <td
                    class="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap"
                  >
                    {{ item.value['portion'] }}
                  </td>
                </tr>
              </table>
              <button
                href="#"
                class="block bg-gray-300 py-2 px-2 text-gray-600 text-center rounded shadow-lg uppercase font-light mt-6 hover:bg-gray-400 hover:text-white duration-300 ease-in-out"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  animations: [
    trigger('itemAnimationsss', [
      transition(':enter', [
        style({
          postion: 'absolute',
          transform: 'translateX(+300%)',
        }),
        animate(
          '2s cubic-bezier( 0.455, 0.03, 0.515, 0.955 )',
          style({ transform: 'translateX(0)' })
        ),
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)' }), //apply default styles before animation starts
        animate(
          '500ms ease-out',
          style({
            postion: 'absolute',
            transform: 'translateX(+300%)',
          })
        ),
      ]),
    ]),
  ],
})
export class EntreeDetailComponent implements OnInit {
  categories: any[] = [];
  selected: boolean = false;
  menuList: any[] = [];
  menuItem: MenuItem;
  selectedGroup: string;
  private destroy$ = new Subject<void>();
  menuGroups: Groups[] = [];
  constructor(
    private menuService: MenuService,
    private provider: ProviderService
  ) {}

  ngOnInit() {
    this.provider.menuGroups$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.menuGroups = data;
      });
    this.menuService.selectedItem$
      .pipe(takeUntil(this.destroy$))
      .subscribe((item) => {
        const data = this.searchCategories(item.item, item.group);
        if (data) {
          this.menuItem = data;
        }
      });
  }
  searchCategories(menuItemName: string, menuItemGroup: string) {
    this.selectedGroup = menuItemGroup;

    const groupEntry = this.menuGroups.find((entry) =>
      entry.hasOwnProperty(menuItemGroup)
    );

    if (!groupEntry) {
      console.log('Group not found.');
      return;
    }

    const groupItems = groupEntry[menuItemGroup];

    const menuItem = groupItems.find((item) => item.name === menuItemName);

    if (!menuItem) {
      console.log('Menu item not found.');
      return;
    }
    console.log(menuItem);
    return menuItem;
  }
}
