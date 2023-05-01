import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProviderService } from '../../../shared/services/provider.service';
import { GroupEntreeList } from '../../../shared/models/menubreakdown';

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
  constructor(private provider: ProviderService) {}

  ngOnInit() {}

  updateEntreeListCategories(list: any[]) {
    this.entreeListSubject.next(list);
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
