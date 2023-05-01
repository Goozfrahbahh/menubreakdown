import { Component, Input, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MenuCategories } from '../models/categories';
import { MenuService } from '../services/menu.service';
import {
  GroupEntreeList,
  Groups,
  MenuGroups,
} from '../../../shared/models/menubreakdown';

@Component({
  selector: 'app-entree-detail',
  template: ` <div class="group-container" *ngIf="menuItem"></div> `,
})
export class EntreeDetailComponent implements OnInit {
  categories: any[] = [];
  @Input() selectedMenuItem: GroupEntreeList;
  menuItem: GroupEntreeList;
  private destroy$ = new Subject<void>();
  menuGroups: Groups[] = [];
  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.menuGroups = MenuGroups;
    console.log(Object.entries(MenuGroups));
  }

  searchMenuCategories(item: GroupEntreeList, groups: Groups[]) {
    // const values = Object.entries(groups)
    // const catgory = values[]
  }
}
