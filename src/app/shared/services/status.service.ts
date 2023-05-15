import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StatusService {
  protected uploadStatusSubject: BehaviorSubject<any> =
    new BehaviorSubject<any>(null);

  uploadStatus$ = this.uploadStatusSubject.asObservable();
  protected menuItemEditSubject: BehaviorSubject<any> =
    new BehaviorSubject<any>(null);

  menuItemEdit$ = this.menuItemEditSubject.asObservable();
  constructor() {}

  updateUploadStatus(status: string) {
    this.uploadStatusSubject.next(status);
  }

  updateMenuItemEdit(status: string) {
    this.menuItemEditSubject.next(status);
  }
}
