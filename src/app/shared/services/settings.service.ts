import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  protected navigationInfoSubject: BehaviorSubject<any> =
    new BehaviorSubject<any>(false);
  navigationInfo$ = this.navigationInfoSubject.asObservable();
  protected messagesSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    false
  );

  messages$ = this.messagesSubject.asObservable();

  constructor() {}

  turnOnInfo() {
    this.navigationInfoSubject.next(true);
  }
  turnOffInfo() {
    this.navigationInfoSubject.next(false);
  }

  turnMessagesOn() {
    this.messagesSubject.next(true);
  }
  turnMessagesOff() {
    this.messagesSubject.next(false);
  }
}
