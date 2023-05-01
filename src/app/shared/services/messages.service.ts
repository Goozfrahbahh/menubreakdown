import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LogMessage } from '../models/logs';

@Injectable({ providedIn: 'root' })
export class MessageService {
  messages: any[] = [];
  message: any;
  oldMessages: any[] = [];
  logMessages: any[] = [];
  protected messagesSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  messages$ = this.messagesSubject.asObservable();
  protected logSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  log$ = this.logSubject.asObservable();
  constructor() {}

  add(message: string) {
    const newString = new String(message);
    const num = newString.length;
    if (num > 500) {
      const check = num / 500;
      this.messages.push(newString.slice(0, 500));
    } else {
      this.messages.push(newString);
      this.messagesSubject.next(this.messages);
    }
    let messagesLog: any[] = [];
    messagesLog.push(message);
    this.logMessages.push(messagesLog);
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

  getMessages() {
    this.messages.forEach((message: string) => {
      this.oldMessages.push(message);
    });
    return this.oldMessages;
  }
}
