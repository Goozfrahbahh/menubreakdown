import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuItem } from '../../shared/models/menubreakdown';
import { MenuItemsService } from '../../shared/services/menu-items.service';

@Injectable({ providedIn: 'root' })
export class EditingService {
  protected menuItemSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  menuItem$ = this.menuItemSubject.asObservable();
  protected cachedItemSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  cachedItem$ = this.cachedItemSubject.asObservable();
  constructor(private menuItemsService: MenuItemsService) {}

  updateEditingItem(item: MenuItem) {
    this.menuItemSubject.next(item);
  }

  updateCachedItem(item: MenuItem) {
    this.cachedItemSubject.next(item);
  }

  updateMenuItem(item: MenuItem) {
    const id = Number(item.masterId);
    console.log(id);
    this.menuItemsService
      .updateMenuItem(id, item)
      .then((res: any) => {
        console.log('Updated Menu Item: ', res);
      })
      .catch((err) => {
        console.log('Error Updating Menu Item:', err);
      });
  }

  addMenuItem(menuItem: MenuItem) {
    console.log(menuItem);

    this.menuItemsService
      .addMenuItem(menuItem)
      .then((res: any) => {
        console.log('Added MenuItem:', res);
      })
      .catch((err) => {
        console.log('Error adding MenuItem:', err);
      });
  }
}
