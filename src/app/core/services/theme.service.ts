import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  default = 'dark';
  protected themeChanged: BehaviorSubject<any> = new BehaviorSubject<any>(
    'dark'
  );
  theme$ = this.themeChanged.asObservable();
  constructor() {}

  changeTheme(theme: string) {
    this.themeChanged.next(theme);
  }

  changeDefaultTheme() {
    this.themeChanged.next(this.default);
  }
}
