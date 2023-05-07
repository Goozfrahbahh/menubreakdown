import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { UploadFormService } from '../services/upload-form.service';
import { MenuExtractionService } from '../services/menuextraction.service';
import {
  trigger,
  transition,
  query,
  style,
  stagger,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-delete-form',
  template: `
    <div
      class="upload flex align-middle items-center justify-center content-center p-12 mt-[10vh]"
      *ngIf="animationTrigger"
      @filterAnimation
    >
      <div
        class="mx-auto w-full max-w-[550px] p-10 pb-2 border-4 border-zinc-600 border-opacity-80 bg-zinc-800 bg-opacity-40 shadow-xl hover:shadow-2xl rounded-xl"
      >
        <h1
          class="text-2xl -mt-2 mb-6 text-gray-200 border-b border-b-zinc-700 pb-2"
        >
          Remove Menu-Breakdown Form
        </h1>
        <div class="mb-5">
          <label
            for="email"
            class="mb-3 block text-base font-medium text-gray-200"
          >
            Select Date:
          </label>
          <div class="date-selection">
            <input
              type="date"
              [formControl]="dateField"
              (change)="onDateSelected(dateField.value)"
              class="w-full rounded-md border border-[#e0e0e0] bg-zinc-800 py-3 px-6 text-base font-medium text-[#7c8392] outline-none focus:border-gray-700 focus:shadow-md"
            />
          </div>
        </div>
        <div [@listAnimation]="dateList.length">
          <div
            class="container-files"
            *ngFor="let date of dateList; let i = index"
          >
            <div
              class="mb-5 rounded-md bg-zinc-800 border border-gray-800 py-4 px-8"
            >
              <div class="flex items-center justify-between">
                <span
                  class="truncate pr-3 text-base font-medium text-[#31abc8]"
                >
                  Selected Date:
                  <span class="text-gray-200">
                    {{ date }}
                  </span>
                </span>
                <button value="file" class="text-white" (click)="removeFile(i)">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z"
                      fill="currentColor"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-row justify-center items-center text-center">
          <button
            (click)="onDelete()"
            class="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-zinc-600 text-[#31abc8]"
          >
            <span
              class="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-[#31abc8] bg-opacity-70 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"
            ></span>
            <span
              class="relative text-[#31abc8] transition duration-300 group-hover:text-gray-100 ease"
              >Delete</span
            >
          </button>
        </div>
      </div>
    </div>
  `,
  animations: [
    trigger('filterAnimation', [
      transition(':enter', [
        style({
          opacity: 0,
          width: '0',
        }),
        animate('300ms ease', style({ opacity: 1, width: '100%' })),
      ]),
      transition(':leave', [
        style({ opacity: 1, width: '100%' }), //apply default styles before animation starts
        animate('300ms ease', style({ opacity: 0, width: '0' })),
      ]),
    ]),
  ],
})

// animate('300ms ease-out', style({ opacity: 1, width: '*' })),
// animate('300ms ease-out', style({ opacity: 0, width: '0px' })),
export class DeleteFormComponent implements OnInit, OnDestroy {
  animationTrigger: boolean = false;
  dateField = new FormControl();
  id: number;
  dateList: any[] = [];
  private destroy$ = new Subject<void>();
  constructor(
    private uploadFormService: UploadFormService,
    private menuExtractionService: MenuExtractionService
  ) {}

  ngOnInit() {
    this.animationTrigger = true;
    this.uploadFormService.id$
      .pipe(takeUntil(this.destroy$))
      .subscribe((id: number) => {
        this.id = id;
      });
  }

  onDateSelected(date: any) {
    this.dateList = [];
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);
    const year = date.slice(0, 4);
    const newDate = `${month}/${day}/${year}`;
    this.dateList.push(newDate);
    this.uploadFormService.updateSelectedDate(date);
  }

  removeFile(index: any) {
    this.dateList = [];
  }

  onDelete() {
    this.menuExtractionService.deleteMenuBreakdown(this.id);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
