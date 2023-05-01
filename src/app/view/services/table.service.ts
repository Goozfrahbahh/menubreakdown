import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CalendarDay } from '../../shared/models/calendar-view';
import {
  CategoryMap,
  EntreeList,
  Groups,
  MenuBreakdown,
} from '../../shared/models/menubreakdown';
import {
  Category,
  InventoryTableData,
  TableInventory,
} from '../models/inventory';

@Injectable({ providedIn: 'root' })
export class TableService {
  protected tableDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    []
  );
  tableData$ = this.tableDataSubject.asObservable();
  protected searchTermSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    []
  );
  searchTerm$ = this.searchTermSubject.asObservable();
  protected sortedDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    []
  );
  sortedData$ = this.sortedDataSubject.asObservable();

  protected paginationSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    5
  );
  pagination$ = this.paginationSubject.asObservable();

  protected rangeSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  range$ = this.rangeSubject.asObservable();
  protected viewTableSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  viewTable$ = this.viewTableSubject.asObservable();
  protected inventoryTableSubject: BehaviorSubject<any> =
    new BehaviorSubject<any>('');
  inventoryTable$ = this.inventoryTableSubject.asObservable();
  table: any[] = [];

  groups: any[] = [];

  protected dataList: any[] = [];
  protected iventoryList: any[] = [];

  constructor() {}

  updateTableData(data: any[]) {
    this.dataList = data;
    this.buildInventoryTable(this.dataList);
    this.tableDataSubject.next(data);
  }
  setGroups(groups: Groups[]) {
    this.groups = groups;
  }
  updateTableInventoryValues(inventory: InventoryTableData[]) {
    this.iventoryList = inventory;
    this.inventoryTableSubject.next(inventory);
  }

  searchItems(term: string) {
    if (term == null || term == '') {
      return this.dataList;
    }

    const data: MenuBreakdown[] = this.dataList.filter((item) => {
      return item.item.toLowerCase().includes(term.toLowerCase());
    });
    console.log(data);

    this.tableDataSubject.next(data);
    return data;
  }
  searchCategories(term: string) {
    if (term == null || term == '') {
      return this.iventoryList;
    }

    const data: InventoryTableData[] = this.iventoryList.filter((item) => {
      return item.category.toLowerCase().includes(term.toLowerCase());
    });
    console.log(data);

    this.inventoryTableSubject.next(data);
    return data;
  }

  updateSortedData(data: any[]) {
    this.sortedDataSubject.next(data);
  }

  updatePagination(page: number) {
    this.paginationSubject.next(page);
  }

  updateRangeDays(range: CalendarDay[]) {
    this.rangeSubject.next(range);
  }

  updateTableType(bool: boolean) {
    this.viewTableSubject.next(bool);
  }

  buildInventoryTable(data: MenuBreakdown[]) {
    this.table = [];
    const categoryMap: Category = this.setInventoryCategories(this.groups);
    console.log(categoryMap);
    const mappedData = this.updateCategoryMap(categoryMap, this.dataList);
    console.log(mappedData);

    this.inventoryTableSubject.next(mappedData);
  }

  setInventoryCategories(menuGroups: Groups[]) {
    const categoryMap = {};
    menuGroups.forEach((group) => {
      Object.values(group).forEach((menuItems) => {
        menuItems.forEach((menuItem) => {
          if (menuItem.categories) {
            menuItem.categories.forEach((categoryObj) => {
              const category = categoryObj.category;
              const itemData: EntreeList = {
                item: menuItem.name,
                portion: categoryObj.portion,
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
    return categoryMap;
  }
  updateCategoryMap(categoryMap: CategoryMap, csv: MenuBreakdown[]) {
    const result = { ...categoryMap };
    const entrees = Object.values(categoryMap);
    Object.entries(categoryMap).forEach(
      ([key, itemGroup]: [string, EntreeList[]]) => {
        result[key] = itemGroup.map((item) => {
          const sold = csv.reduce((acc, csvItem) => {
            if (
              csvItem.item === item.item &&
              ((item.modifier && csvItem.modifier === item.modifier) ||
                (!item.modifier && csvItem.modifier === ''))
            ) {
              return acc + Number(csvItem.sold);
            }
            return acc;
          }, 0);

          return {
            ...item,
            sold,
          };
        });
      }
    );

    const tableDataList = Object.entries<any>(result).map(
      ([category, entreeList]) => {
        const selected = false;
        const total = entreeList.reduce(
          (acc, entree) => acc + entree.portion * entree.sold,
          0
        );

        return {
          category,
          total,
          entreeList,
          selected,
        };
      }
    );

    return tableDataList;
  }
}
