import {
  trigger,
  transition,
  query,
  stagger,
  animate,
  style,
  useAnimation,
  sequence,
  state,
  animation,
} from '@angular/animations';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ParamMap } from '@angular/router';
import { Subject, map, takeUntil } from 'rxjs';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-menu',
  template: `
    <div
      class="flex flex-row antialiased text-gray-800 ml-3 max-h-[95vh] min-h-[95vh] mt-[2vh]"
    >
      <div
        class="flex flex-col drop-shadow-2xl shadow-zinc-800 items-center py-4 flex-shrink-0 w-20 text-gray-600 dark:text-slate-100 divide-gray-200 font-serif dark:divide-gray-700 dark:bg-zinc-700 dark:bg-opacity-50 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-800/20 to-zinc-900 rounded-3xl"
      >
        <a
          routerLink="/home"
          [routerLinkActive]="'active'"
          class="flex items-center justify-center h-12 w-12 hover:bg-[#31abc8] text-gray-500 rounded-full active:bg-[#31abc8]"
        >
          <svg
            viewBox="100 110 800 800"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <circle
                cx="512"
                cy="512"
                r="512"
                style="fill:transparent"
              ></circle>
              <path
                d="m502.4 719-.4-.4.4.4H315.2c-5.8 0-10.4-4.7-10.4-10.4v-179H258c-6.9 0-12.5-5.6-12.5-12.5 0-3.3 1.3-6.5 3.6-8.8l251.7-254.7c6.1-6.2 16-6.2 22.2-.1l.1.1 131.5 132.3v-24.5c0-5.8 4.7-10.4 10.4-10.4h43.7c5.8 0 10.4 4.7 10.4 10.4v89.9l55.9 57c4.8 4.9 4.8 12.9-.2 17.7-2.3 2.3-5.5 3.6-8.8 3.6h-46.9v178.9c0 5.8-4.7 10.4-10.4 10.4H521.4l.2-.2-.2.2 39-38.9h36c2.8 7.8 10.2 13.4 19 13.4 11.1 0 20.2-9 20.2-20.1 0-11.1-9-20.1-20.2-20.1-8.8 0-16.3 5.6-19 13.4h-41.6l-36.2 36.2v-44.1l43.1-43.1h69.7c2.8 7.8 10.2 13.4 19 13.4 11.1 0 20.2-9 20.2-20.1 0-11.1-9-20.1-20.2-20.1-8.8 0-16.3 5.6-19 13.4h-56.2l40.3-40.2v-33.6l29-28.9c2.6 1.3 5.6 2 8.7 2 11.1 0 20.2-9 20.2-20.1 0-11.1-9-20.1-20.2-20.1-11.1 0-20.2 9-20.2 20.1 0 3.1.7 6.1 2 8.7l-19.5 19.4V448c7.8-2.8 13.5-10.2 13.5-19 0-11.1-9-20.1-20.2-20.1-11.1 0-20.2 9-20.2 20.1 0 8.8 5.6 16.2 13.5 19v61.5L582.6 490c1.3-2.6 2-5.6 2-8.7 0-11.1-9-20.1-20.2-20.1s-20.2 9-20.2 20.1c0 11.1 9 20.1 20.2 20.1 3.1 0 6.1-.7 8.7-2l29 28.9v28l-36.3 36.3V566c7.8-2.8 13.5-10.2 13.5-19 0-11.1-9-20.1-20.2-20.1-11.1 0-20.2 9-20.2 20.1 0 8.8 5.6 16.2 13.5 19v40l-33.6 33.6V442.4l27.6-27.6c2.6 1.3 5.6 2 8.7 2 11.1 0 20.2-9 20.2-20.1 0-11.1-9-20.1-20.2-20.1-11.1 0-20.2 9-20.2 20.1 0 3.1.7 6.1 2 8.7l-24.8 24.8-24.8-24.8c1.3-2.6 2-5.6 2-8.7 0-11.1-9-20.1-20.2-20.1-11.1 0-20.2 9-20.2 20.1 0 11.1 9 20.1 20.2 20.1 3.1 0 6.1-.7 8.7-2l27.6 27.6v140.8L457 534.9v-38.6c7.8-2.8 13.5-10.2 13.5-19 0-11.1-9-20.1-20.2-20.1-11.1 0-20.2 9-20.2 20.1 0 8.8 5.6 16.2 13.5 19v25.2l-37.7-37.6v-37.3c7.8-2.8 13.5-10.2 13.5-19 0-11.1-9-20.1-20.2-20.1-11.1 0-20.2 9-20.2 20.1 0 8.8 5.6 16.2 13.5 19v42.9l41.6 41.5h-23.9c-2.8-7.8-10.2-13.4-19-13.4-11.1 0-20.2 9-20.2 20.1s9 20.1 20.2 20.1c8.8 0 16.3-5.6 19-13.4h37.4l57.9 57.8v100.5l-30.9-30.9v-38.7c7.8-2.8 13.5-10.2 13.5-19 0-11.1-9-20.1-20.2-20.1-11.1 0-20.2 9-20.2 20.1 0 8.8 5.6 16.2 13.5 19v25.2l-45-44.9c1.3-2.6 2-5.6 2-8.7 0-11.1-9-20.1-20.2-20.1-11.1 0-20.2 9-20.2 20.1 0 11.1 9 20.1 20.2 20.1 3.1 0 6.1-.7 8.7-2l45 44.9h-23.9c-2.8-7.8-10.2-13.4-19-13.4-11.1 0-20.2 9-20.2 20.1 0 11.1 9 20.1 20.2 20.1 8.8 0 16.3-5.6 19-13.4h37.4l37.2 37.9M398.9 419.5c-4.5 0-8.1 3.6-8.1 8.1 0 4.4 3.6 8.1 8.1 8.1s8.1-3.6 8.1-8.1-3.6-8.1-8.1-8.1zm51.1 49.7c-4.5 0-8.1 3.6-8.1 8.1 0 4.4 3.6 8.1 8.1 8.1s8.1-3.6 8.1-8.1-3.6-8.1-8.1-8.1zm18.9-80.6c-4.5 0-8.1 3.6-8.1 8.1s3.6 8.1 8.1 8.1 8.1-3.6 8.1-8.1-3.7-8.1-8.1-8.1zm184.3 100.7c4.5 0 8.1-3.6 8.1-8.1s-3.6-8.1-8.1-8.1-8.1 3.6-8.1 8.1 3.6 8.1 8.1 8.1zM555 404.7c4.5 0 8.1-3.6 8.1-8.1s-3.6-8.1-8.1-8.1-8.1 3.6-8.1 8.1 3.6 8.1 8.1 8.1zm9.4 68.5c-4.5 0-8.1 3.6-8.1 8.1s3.6 8.1 8.1 8.1 8.1-3.6 8.1-8.1-3.7-8.1-8.1-8.1zm-173.6 56.4c-4.5 0-8.1 3.6-8.1 8.1 0 4.4 3.6 8.1 8.1 8.1s8.1-3.6 8.1-8.1-3.6-8.1-8.1-8.1zm259.7 87.3c4.5 0 8.1-3.6 8.1-8.1s-3.6-8.1-8.1-8.1-8.1 3.6-8.1 8.1 3.6 8.1 8.1 8.1zm-41.7-196c-4.5 0-8.1 3.6-8.1 8.1 0 4.4 3.6 8.1 8.1 8.1s8.1-3.6 8.1-8.1c-.1-4.5-3.7-8.1-8.1-8.1zM559 539c-4.5 0-8.1 3.6-8.1 8.1s3.6 8.1 8.1 8.1 8.1-3.6 8.1-8.1-3.6-8.1-8.1-8.1zm-161.4 57.8c-4.5 0-8.1 3.6-8.1 8.1 0 4.4 3.6 8.1 8.1 8.1s8.1-3.6 8.1-8.1c-.1-4.5-3.7-8.1-8.1-8.1zm10.7 69.8c-4.5 0-8.1 3.6-8.1 8.1 0 4.4 3.6 8.1 8.1 8.1s8.1-3.6 8.1-8.1-3.6-8.1-8.1-8.1zm207.2 14.8c4.5 0 8.1-3.6 8.1-8.1 0-4.4-3.6-8.1-8.1-8.1s-8.1 3.6-8.1 8.1 3.6 8.1 8.1 8.1zm-148-75.2c-4.5 0-8.1 3.6-8.1 8.1 0 4.4 3.6 8.1 8.1 8.1s8.1-3.6 8.1-8.1-3.6-8.1-8.1-8.1z"
                style="fill:#fff"
              ></path>
            </g>
          </svg>
        </a>
        <span
          class="font-serif text-sm font-light"
          [ngClass]="toggleState ? 'textopen' : 'textclosed'"
          >Home</span
        >
        <ul class="flex flex-col space-y-2 mt-12">
          <li>
            <a
              routerLink="/view"
              [routerLinkActive]="'active'"
              class="flex flex-col items-center"
            >
              <span
                class="flex items-center group justify-center text-zinc-500 hover:bg-[#31abc8] hover:text-white h-12 w-12 rounded-2xl active:!text-white"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="hover:stroke-white"
                >
                  <path
                    d="M9 17.25V18.2574C9 19.053 8.68393 19.8161 8.12132 20.3787L7.5 21H16.5L15.8787 20.3787C15.3161 19.8161 15 19.053 15 18.2574V17.25M21 5.25V15C21 16.2426 19.9926 17.25 18.75 17.25H5.25C4.00736 17.25 3 16.2426 3 15V5.25M21 5.25C21 4.00736 19.9926 3 18.75 3H5.25C4.00736 3 3 4.00736 3 5.25M21 5.25V12C21 13.2426 19.9926 14.25 18.75 14.25H5.25C4.00736 14.25 3 13.2426 3 12V5.25"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
              <span
                class="font-serif text-sm font-light"
                [ngClass]="toggleState ? 'textopen' : 'textclosed'"
                >Table View</span
              >
            </a>
          </li>
          <li>
            <a
              routerLink="/upload"
              [routerLinkActive]="'active'"
              class="flex flex-col items-center"
            >
              <span
                class="flex items-center justify-center text-[#8e8e8e] hover:bg-[#31abc8] hover:text-white h-12 w-12 rounded-2xl active:!text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 23 23"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>
              </span>
              <span
                class="font-serif text-sm font-light"
                [ngClass]="toggleState ? 'textopen' : 'textclosed'"
                >Upload</span
              >
            </a>
          </li>
          <li>
            <a
              routerLink="/menu-editor"
              [routerLinkActive]="'active'"
              class="flex flex-col items-center"
            >
              <span
                class="flex items-center justify-center text-[#8e8e8e] hover:bg-[#31abc8] hover:text-white h-12 w-12 rounded-2xl active:!text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="active:!stroke-white"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
                  />
                </svg>
              </span>
              <span
                class="font-serif text-sm font-light"
                [ngClass]="toggleState ? 'textopen' : 'textclosed'"
                >Menu Editor</span
              >
            </a>
          </li>
        </ul>
        <ul class="flex justify-end items-center h-full flex-col space-y-2">
          <li>
            <a
              routerLink="/message-center"
              [routerLinkActive]="'active'"
              class="flex flex-col items-center"
            >
              <span
                class="flex items-center justify-center text-[#8e8e8e] hover:bg-[#31abc8] hover:text-white h-12 w-12 rounded-2xl active:!text-white"
              >
                <svg
                  class="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="-2 0 26 26"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  ></path>
                </svg>
              </span>
              <span
                class="font-serif text-sm font-light"
                [ngClass]="toggleState ? 'textopen' : 'textclosed'"
                >Message's</span
              >
            </a>
          </li>
          <li>
            <a
              routerLink="/settings"
              [routerLinkActive]="'active'"
              class="flex flex-col items-center"
            >
              <span
                class="flex items-center justify-center text-[#8e8e8e] hover:bg-[#31abc8] hover:text-white h-12 w-12 rounded-2x active:!text-white"
              >
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
              </span>
              <span
                class="font-serif text-sm font-light"
                [ngClass]="toggleState ? 'textopen' : 'textclosed'"
                >Settings</span
              >
            </a>
          </li>
        </ul>
      </div>
    </div>
  `,
  styles: [
    `
      .open {
        width: 60px;
      }
      .textopen {
        display: flex;
      }
      .textclosed {
        display: none;
      }
      .active {
        background-color: #626262;
        border-radius: 0.5rem;
        color: #fff !important;
        --currentColor: #fff !important;
      }
    `,
  ],
  animations: [
    trigger('openClose', [
      state(
        'closed',
        style({
          transform: 'translateY(200%)',
          opacity: 0,
        })
      ),
      state(
        'open',
        style({
          transform: 'translateY(0)',
          opacity: 1,
        })
      ),
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateX(0%)',
        }),
        animate('500ms ease-in'),
      ]),
      transition(':leave', [
        style({
          transform: 'translateX(200%)',
        }),
        animate('3s ease-out'),
      ]),
    ]),
  ],
})
export class MenuComponent implements OnInit, OnDestroy {
  @ViewChild('menuitem', { static: true }) menuitem: ElementRef;
  toggleState: boolean = false;
  navOpacityController: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(private settings: SettingsService) {}

  ngOnInit() {
    this.settings.navigationInfo$
      .pipe(takeUntil(this.destroy$))
      .subscribe((info) => {
        this.toggleState = info;
      });
  }

  toggleMenu() {
    this.toggleState = !this.toggleState;
  }

  clickOutsideMenu() {
    if (this.toggleState === false) {
      return;
    } else if (this.toggleState === true) {
      this.toggleMenu();
    }
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  navigationDim() {
    this.navOpacityController = !this.navOpacityController;
  }
}
