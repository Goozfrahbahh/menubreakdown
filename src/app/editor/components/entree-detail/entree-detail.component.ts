import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { MenuCategories } from '../../models/categories';
import { MenuService } from '../../services/menu.service';
import {
  Groups,
  MenuItem,
  MenuItemGroups,
} from '../../../shared/models/menubreakdown';
import { trigger, transition, style, animate } from '@angular/animations';
import { MenuItemsService } from '../../../shared/services/menu-items.service';
import { ProviderService } from '../../../shared/services/provider.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Category } from '../../../view/models/inventory';
import { EditingService } from '../../services/editing.service';
@Component({
  selector: 'app-entree-detail',
  template: `
    <div
      class="group-container w-full h-full mb-10 relative justify-center items-center font-sans"
    >
      <div class="container flex w-full h-full">
        <app-editable></app-editable>
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
export class EntreeDetailComponent implements OnInit, OnDestroy {
  selectedGroup: string;
  private destroy$ = new Subject<void>();
  menuGroups: Groups[] = [];
  menuItemForm: FormGroup;

  constructor(
    private menuService: MenuService,
    private provider: ProviderService,
    private fb: FormBuilder,
    private editingService: EditingService
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
          const item = data;
          this.editingService.updateCachedItem(item);
          this.editingService.updateEditingItem(data);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
