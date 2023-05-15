import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-settings',
  template: `
    <div class="flex flex-col justify-center items-center h-[100vh]">
      <div
        class="!z-5 relative flex flex-col border-4 border-zinc-600 border-opacity-80 text-white rounded-[20px] max-w-[300px] md:max-w-[400px] bg-clip-border shadow-2xl flex flex-col w-full bg-slate-600/20 bg-opacity-40 !p-6 3xl:p-![18px]"
      >
        <div class="relative flex flex-row justify-between">
          <h4 class="text-xl font-bold text-white mb-3">Settings</h4>
        </div>
        <div class="mb-3 mt-6">
          <label for="email" class="text-sm text-gray-300 font-bold mb-4"
            >Navigation Info On/Off</label
          >
          <div
            class="toggle"
            (click)="navigationInfoToggle()"
            [ngClass]="{ toggle_active: navigationInfoActive }"
          >
            <div class="toggle__button"></div>
          </div>
        </div>
        <div class="mb-3 mt-6">
          <label for="email" class="text-sm text-gray-300 font-bold mb-4"
            >Log Messages On/Off</label
          >
          <div
            class="toggle"
            (click)="logMessagesToggle()"
            [ngClass]="{ toggle_active: messagesToggle }"
          >
            <div class="toggle__button"></div>
          </div>
        </div>
        <p class="font-normal text-gray-500 mt-10 mx-auto w-max">
          All Rights Reserved
          <a
            href="https://horizon-ui.com?ref=tailwindcomponents.com"
            target="_blank"
            class="text-gray-500 font-bold"
            >Invent Time LLC</a
          >
        </p>
      </div>
    </div>
  `,
  styles: [
    `
      .toggle {
        margin: 8px;
        margin-top: 20px;
        height: 24px;
        width: 50px;
        display: flex;
        border-radius: 12px;
        background: rgba(180 180 180);
        transition: background 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        box-shadow: 0 0 10px 1px rgba(74, 74, 74, 0.2);
        outline: none;

        &_active {
          background: rgb(75 85 99);
        }

        &__button {
          background: rgb(75 88 105);
          height: 24px;
          width: 24px;
          border-radius: 50%;
          margin-left: 0;
          box-shadow: 0 0 10px 1px rgba(74, 74, 74, 0.2);
          transition: margin-left 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }

        &_active &__button {
          margin-left: 26px;
          background: rgba(100 100 100);
        }
      }
    `,
  ],
})
export class SettingsComponent implements OnInit {
  public navigationInfoActive: boolean;
  public messagesToggle: boolean;
  private destroy$ = new Subject<void>();

  constructor(private settings: SettingsService) {}

  ngOnInit() {
    this.settings.navigationInfo$
      .pipe(takeUntil(this.destroy$))
      .subscribe((bool) => {
        this.navigationInfoActive = bool;
      });
    this.settings.messages$.pipe(takeUntil(this.destroy$)).subscribe((bool) => {
      this.messagesToggle = bool;
    });
  }
  public navigationInfoToggle(): void {
    this.navigationInfoActive = !this.navigationInfoActive;
    if (this.navigationInfoActive) {
      this.settings.turnOnInfo();
    } else if (!this.navigationInfoActive) {
      this.settings.turnOffInfo();
    }
  }
  public logMessagesToggle(): void {
    this.messagesToggle = !this.messagesToggle;
    if (this.messagesToggle) {
      this.settings.turnMessagesOn();
    } else if (!this.messagesToggle) {
      this.settings.turnMessagesOff();
    }
  }
}
