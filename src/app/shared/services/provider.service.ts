import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import {
  DailyMenuBreakdown,
  MenuBreakdown,
  MenuItem,
} from '../models/menubreakdown';
import { MenuBreakdownService } from './menubreakdown.service';
import { MessageService } from './messages.service';
import { MenuItemsService } from './menuitems.service';

@Injectable({ providedIn: 'root' })
export class ProviderService implements OnInit, OnDestroy {
  protected menubreakdownSubject: BehaviorSubject<any> =
    new BehaviorSubject<any>(null);
  menubreakdown$ = this.menubreakdownSubject.asObservable();
  protected menuGroupsSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  menuGroups$ = this.menuGroupsSubject.asObservable();
  protected listGroupsSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  listGroups$ = this.listGroupsSubject.asObservable();
  protected menuListSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  menuList$ = this.menuListSubject.asObservable();

  protected stringMessageSubject: BehaviorSubject<any> =
    new BehaviorSubject<any>(null);
  stringMessage$ = this.stringMessageSubject.asObservable();
  dailymenubreakdowns: DailyMenuBreakdown[];
  private destroy$ = new Subject<void>();
  stringMessage: string;
  messages: string[] = [];
  constructor(
    private menuBreakdownService: MenuBreakdownService,
    private menuItemsService: MenuItemsService,
    private messageService: MessageService
  ) {}

  async ngOnInit() {
    this.setUp('Normal');
    this.messageService.messages$
      .pipe(takeUntil(this.destroy$))
      .subscribe((messages) => this.messages.push(messages));
  }

  async setUp(message: string) {
    this.menuBreakdownService
      .getMenuBreakdowns()
      .pipe(takeUntil(this.destroy$))
      .subscribe((dailymenubreakdowns: any) => {
        this.dailymenubreakdowns = dailymenubreakdowns;
        this.menubreakdownSubject.next(dailymenubreakdowns);
      });

    this.menuItemsService
      .getMenuItems()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        const menuItems = this.groupMenuItems(data);
        const categories = this.uniqueCategories(data);
        this.menuListSubject.next(data);
        this.menuGroupsSubject.next(menuItems);
        this.listGroupsSubject.next(categories);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  groupMenuItems(menuItems: MenuItem[]): Record<string, MenuItem[]>[] {
    const groupedItems: Record<string, MenuItem[]> = {};

    menuItems.forEach((item) => {
      if (!groupedItems[item.group]) {
        groupedItems[item.group] = [];
      }
      groupedItems[item.group].push(item);
    });

    const result: Record<string, MenuItem[]>[] = [];
    for (const group in groupedItems) {
      const item: Record<string, MenuItem[]> = {};
      item[group] = groupedItems[group];
      result.push(item);
    }

    return result;
  }

  uniqueCategories(menuItems: MenuItem[]) {
    const uniqueGroups = new Set<string>();

    menuItems.forEach((item) => {
      uniqueGroups.add(item.group);
    });

    return Array.from(uniqueGroups).map((group) => {
      return { group };
    });
  }
}
