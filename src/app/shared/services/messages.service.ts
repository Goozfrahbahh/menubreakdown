import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LogMessage, Success } from '../models/logs';

@Injectable({ providedIn: 'root' })
export class MessageService {
  messages: any[] = [];
  quotes: string[] = [
    "You never really know the true quality of someone's character until the road gets rocky",
    'Start where you are. Use what you have. Do what you can. --Arthur Ashe',
  ];
  message: any;
  oldMessages: any[] = [];
  logMessages: any[] = [];
  protected quotesSubject: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >(this.quotes);
  quotes$ = this.quotesSubject.asObservable();
  protected messagesSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  messages$ = this.messagesSubject.asObservable();
  protected logSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  log$ = this.logSubject.asObservable();
  protected successSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  success$ = this.successSubject.asObservable();
  constructor() {}

  add(message: string) {
    const newString = new String(message);
    const num = newString.length;
    if (num > 500) {
      const check = num / 500;
      this.messages.push(newString.slice(0, 200));
    } else {
      this.messages.push(newString);
      this.messagesSubject.next(this.messages);
    }
    let messagesLog: any[] = [];
    messagesLog.push(message);
    this.logMessages.push(messagesLog);
    this.logSubject.next(this.logMessages);
  }
  addMultipleMessages(messages: string[]) {
    this.messages = [...this.messages, ...messages];
    this.messagesSubject.next(this.messages);
  }

  clear(index: number) {
    this.messages = this.messages.filter(
      (message, i) => message[i] !== message[index]
    );
    this.messagesSubject.next(this.messages);
  }

  updateSuccessMessage(message: Success) {
    this.successSubject.next(message);
  }

  getMessages() {
    this.messages.forEach((message: string) => {
      this.oldMessages.push(message);
    });
    return this.oldMessages;
  }
}
