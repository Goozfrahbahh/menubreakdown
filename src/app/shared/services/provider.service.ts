import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { DailyMenuBreakdown, MenuBreakdown } from '../models/menubreakdown';
import { MenuBreakdownService } from './menubreakdown.service';
import { MessageService } from './messages.service';

@Injectable({ providedIn: 'root' })
export class ProviderService implements OnInit, OnDestroy {
  menubreakdownSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  menubreakdown$ = this.menubreakdownSubject.asObservable();
  stringMessageSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  stringMessage$ = this.stringMessageSubject.asObservable();
  dailymenubreakdowns: DailyMenuBreakdown[];
  private destroy$ = new Subject<void>();
  stringMessage: string;
  messages: string[] = [];
  constructor(
    private menuBreakdownService: MenuBreakdownService,
    private messageService: MessageService
  ) {}

  async ngOnInit() {
    this.setUp('Normal');
    this.messageService.messages$
      .pipe(takeUntil(this.destroy$))
      .subscribe((messages) => this.messages.push(messages));
  }

  async setUp(message: string) {
    this.stringMessage = `Message Received: ${message}`;
    this.messages.push(this.stringMessage);
    this.stringMessageSubject.next(this.stringMessage);
    this.dailymenubreakdowns =
      await this.menuBreakdownService.getMenuBreakdowns();
    if (this.dailymenubreakdowns.length > 1) {
      this.menubreakdownSubject.next(this.dailymenubreakdowns);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  displayHistory() {
    this.messageService.addMultipleMessages(this.messages);
  }
}
