import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GroupEntreeList, MenuItem } from '../../shared/models/menubreakdown';
import { ProviderService } from '../../shared/services/provider.service';
import { MenuItemsService } from '../../shared/services/menu-items.service';

@Injectable({ providedIn: 'root' })
export class MenuService {
  protected menuCategoriesSubject: BehaviorSubject<any> =
    new BehaviorSubject<any>(null);
  menuCategories$ = this.menuCategoriesSubject.asObservable();

  protected filteredListSubject: BehaviorSubject<any> =
    new BehaviorSubject<any>(null);
  filteredList$ = this.filteredListSubject.asObservable();

  protected entreeListSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  entreeList$ = this.entreeListSubject.asObservable();
  protected selectedItemSubject: BehaviorSubject<any> =
    new BehaviorSubject<any>(null);
  selectedItem$ = this.selectedItemSubject.asObservable();

  dataList: any[] = [];
  constructor(private menuItemsService: MenuItemsService) {}

  ngOnInit() {}

  updateEntreeListCategories(list: any[]) {
    this.entreeListSubject.next(list);
    if (list.length < 1) {
      this.selectedItemSubject.next(null);
    }
  }

  resetSelected() {
    this.selectedItemSubject.next(null);
  }

  updateFilteredList(list: GroupEntreeList[]) {
    this.dataList = list;
    this.filteredListSubject.next(list);
  }

  searchItems(term: string) {
    if (term == null || term == '') {
      return this.dataList;
    }

    const data: GroupEntreeList[] = this.dataList.filter((item) => {
      return item.item.toLowerCase().includes(term.toLowerCase());
    });
    console.log(data);

    this.filteredListSubject.next(data);
    return data;
  }

  updateSelectedMenuItem(item: GroupEntreeList) {
    this.selectedItemSubject.next(item);
  }
}
