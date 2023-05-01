import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  trigger,
  transition,
  query,
  style,
  stagger,
  animate,
} from '@angular/animations';
import {
  DailyMenuBreakdown,
  MenuBreakdown,
  Totals,
} from '../../shared/models/menubreakdown';
import { MenuExtractionService, csv } from '../services/menuextraction.service';
import {
  map,
  catchError,
  switchMap,
  of,
  takeUntil,
  Observable,
  concatAll,
  takeLast,
  distinctUntilChanged,
  zipAll,
  tap,
  Subject,
  BehaviorSubject,
  filter,
  from,
} from 'rxjs';
import { CsvParserService } from '../services/csvparser.service';
import { UploadFormService } from '../services/upload-form.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entry-form',
  template: `
    <div
      class="upload flex align-middle items-center justify-center content-center p-12 mt-[10vh]"
    >
      <div
        class="mx-auto w-full max-w-[550px] p-10 pb-2 border-4 border-zinc-600 border-opacity-80 dark:divide-gray-700 bg-zinc-800 bg-opacity-40 shadow-xl hover:shadow-2xl rounded-xl"
      >
        <h1
          class="text-2xl -mt-2 mb-6 text-gray-200 border-b border-b-zinc-700 pb-2"
        >
          Entry Menu-Breakdown Form
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
              [value]="date"
              [formControl]="dateField"
              (change)="onDateSelected(dateField.value)"
              class="w-full rounded-md border border-[#e0e0e0] bg-zinc-800 py-3 px-6 text-base font-medium text-[#7c8392] outline-none focus:border-gray-700 focus:shadow-md"
            />
          </div>
        </div>

        <div class="mb-6 pt-4">
          <label class="mb-5 block text-xl font-semibold text-gray-200">
            Upload File
          </label>

          <div class="mb-8">
            <input
              hidden
              type="file"
              #uploader
              (change)="onFileChangeListener($event)"
            />
            <label
              for="file"
              class="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
            >
              <div>
                <span class="mb-2 block text-xl font-semibold text-gray-200">
                  Drop files here
                </span>
                <span class="mb-2 block text-base font-medium text-[#7b8394]">
                  Or
                </span>
                <button
                  class="flex-no-shrink hover:shadow-lg bg-zinc-800/70 px-5 py-2 ml-4 text-sm font-medium tracking-wider text-white border border-gray-700 rounded-lg shadow-sm"
                  role="button"
                  (click)="uploader.click()"
                >
                  <span
                    class="mr-1 !text-white inline-block pb-1 align-middle md:mr-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 22 22"
                      fill="#ffffff"
                      class="mr-1 h-4 w-4"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M19.5 21a3 3 0 003-3V9a3 3 0 00-3-3h-5.379a.75.75 0 01-.53-.22L11.47 3.66A2.25 2.25 0 009.879 3H4.5a3 3 0 00-3 3v12a3 3 0 003 3h15zm-6.75-10.5a.75.75 0 00-1.5 0v4.19l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V10.5z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                  Click to Expand
                </button>
              </div>
            </label>
          </div>
          <div
            class="container-files"
            *ngFor="let file of filesList; let i = index"
          >
            <div
              class="mb-5 rounded-md bg-zinc-800 border border-gray-800 py-4 px-8"
            >
              <div class="flex items-center justify-between">
                <span class="truncate pr-3 text-base font-medium text-gray-200">
                  {{ file.name }}
                </span>
                <button value="file" class="text-white" (click)="removeFile(i)">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="#31abc8"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z"
                      fill="#31abc8"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z"
                      fill="#31abc8"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="flex flex-row justify-center items-center text-center">
            <button
              (click)="onSubmit()"
              class="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-zinc-600 text-[#31abc8]"
            >
              <span
                class="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-[#31abc8] bg-opacity-70 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"
              ></span>
              <span
                class="relative text-[#31abc8] transition duration-300 group-hover:text-gray-100 ease"
                >Submit</span
              >
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class EntryFormComponent implements OnInit, OnDestroy {
  @HostBinding('@pageAnimations')
  dateField = new FormControl();
  date: any;
  filesList: File[] = [];
  files: string[] = [];
  file: string;
  header = true;
  csvnew: csv[] = [];
  entreeList: any[] = [];
  csv: any[] = [];
  d: Date = new Date();
  f: string;
  id: number;
  totals: Totals[] = [];
  menubreakdown: DailyMenuBreakdown;
  MenuGroups = [
    { group: 'Entrees' },
    { group: 'Appetizers' },
    { group: 'Soups' },
    { group: 'Burgers' },
    { group: 'Kids Menu' },
    { group: 'Desserts' },
    { group: 'Sides' },
    { group: 'Only Meats' },
    { group: 'Salads' },
  ];

  protected csvSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private destroy$ = new Subject<void>();

  constructor(
    private csvParserService: CsvParserService,
    private uploadFormService: UploadFormService,
    private menuExtractionService: MenuExtractionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.dateField.setValue(new Date());
    this.dateField.valueChanges.pipe(takeUntil(this.destroy$)).subscribe();

    this.uploadFormService.id$
      .pipe(takeUntil(this.destroy$))
      .subscribe((id) => (this.id = id));
    this.uploadFormService.fileList$
      .pipe(takeUntil(this.destroy$))
      .subscribe((file) => (this.f = file));
    this.uploadFormService.selectedDate$
      .pipe(takeUntil(this.destroy$))
      .subscribe((date) => (this.d = date));
    this.uploadFormService.totals$
      .pipe(
        tap((_) => console.log(_)),
        takeUntil(this.destroy$)
      )
      .subscribe((totals) => (this.totals = totals));
  }

  // Remove Button on File Names List
  removeFile(index: any) {
    this.filesList.splice(index, 1);
    this.files.splice(index, 1);
  }

  onDateSelected(date: any) {
    this.uploadFormService.updateSelectedDate(date);
  }
  onFileChangeListener(event: any): void {
    const files = event.srcElement.files;
    this.filesList = files;
    this.file = files[0].name;
    this.uploadFormService.updateUploadFilesList(this.file);

    this.header =
      (this.header as unknown as string) === 'true' || this.header === true;

    const csvRecords = this.csvParserService
      .parse(files[0], { header: this.header, delimiter: ',' })
      .pipe(
        map((result) => (result = result)),

        catchError(
          this.handleError('CsvFileParser.parse', 'Failed to parse Csv file')
        )
      )
      .pipe(
        concatAll<any>(),
        map((result: any) =>
          this.csvnew.push({
            group: result[1],
            item: result[2],
            modifier: result[3],
            sold: Number(result[5]) || 0,
          })
        ),
        switchMap((csvnew) => of(this.csvnew)),
        takeLast(1),
        switchMap((csv) => from(csv)),
        filter((item) => item.item !== ''),
        filter((item) => this.MenuGroups.some((id) => item.group === id.group)),
        map((items) => this.csv.push(items)),
        takeUntil(this.destroy$)
      )
      .subscribe((results) => {
        this.csvSubject.next(this.csv);
      });
  }

  onSubmit() {
    const data = this.csvSubject.asObservable();
    console.log('hey');
    data
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => (this.totals = data));

    console.log(this.totals);
    this.menubreakdown = {
      id: this.id,
      date: this.d,
      totals: this.totals,
    };
    console.log(this.menubreakdown);
    this.menuExtractionService.addMenuBreakdown(this.menubreakdown);
    this.router.navigate(['/message-center']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private handleError<T>(options: string, results?: any) {
    return (error: any): Observable<T> => {
      console.log(error);

      return of(results as T);
    };
  }
}
