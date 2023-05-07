import { Component, Input } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { NgOptimizedImage } from '@angular/common';
import { GroupEntreeList } from '../../../shared/models/menubreakdown';

@Component({
  selector: 'app-entree',
  providers: [NgOptimizedImage],
  template: `
    <div class="container" *ngFor="let entree of entreeList">
      <article
        class="group relative flex h-[12rem] w-[50rem] overflow-hidden rounded-2xl bg-transparent"
      >
        <!-- buttons right side -->
        <aside
          class="absolute left-1 flex h-full flex-col justify-center space-y-8 p-3"
        >
          <!-- download icon -->
          <!-- image (left side) -->
          <div
            class="absolute bg-blend-multiply left-0 h-28 w-48 px-4 py-4 mt-2 mb-2 saturate-150"
          >
            <ng-container *ngIf="entree.imageUrl; else none">
              <img
                ngSrc="{{ entree.imageUrl }}"
                fill
                class="h-full w-full object-cover object-center bg-clip-content opacity-95 rounded-xl prose-img:"
              />
            </ng-container>
            <ng-template #none>
              <img class="list-image-none" />
            </ng-template>
            <div
              class="invisible absolute inset-0 flex max-h-28 h-28 w-full p-4 rounded-xl items-center justify-center opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 hover:backdrop-blur-lg"
            >
              <button class="stats button" (click)="onClickMenuItem(entree)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="#ffffff"
                  class="bi bi-box-arrow-in-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- right side -->
          <div
            class="absolute inset-y-0 left-48 w-[39rem] overflow-hidden rounded-2xl transition-all duration-200 group-hover:w-[36rem]"
          >
            <!-- background image -->
            <div class="h-full w-full bg-cover bg-center">
              <div
                class="h-full w-full bg-zinc-800 bg-opacity-40 transition-all duration-200 group-hover:bg-[#31383b]/80"
              ></div>
            </div>

            <!-- content -->
            <section
              class="absolute inset-0 flex flex-col justify-between p-4 text-white"
            >
              <header class="space-y-1">
                <div class="text-3xl font-medium text-[#0fc8f6]">
                  {{ entree.item }}
                </div>

                <div class="font-medium">
                  {{ entree.description }}
                </div>
              </header>

              <div
                class="invisible relative flex flex-row space-x-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100"
              >
                <span
                  class="absolute right-2 bottom-3 justify-end items-center space-x-1"
                >
                  <!-- liked icon -->
                  <button
                    class="like-button"
                    type="button"
                    (click)="onLikeItem(entree)"
                  >
                    <svg
                      class="h-5 w-5"
                      fill="none"
                      stroke="#ff9eff"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      ></path>
                    </svg>
                  </button>
                </span>
              </div>
            </section>
          </div>
        </aside>
      </article>
    </div>
  `,
})
export class EntreeComponent {
  @Input() entreeList: GroupEntreeList[] = [];

  constructor(private menuService: MenuService) {}

  onClickEntree(item: GroupEntreeList) {
    console.log(item.item);
  }

  onClickMenuItem(menuItem: GroupEntreeList) {
    console.log(menuItem);
    this.menuService.updateSelectedMenuItem(menuItem);
  }

  onLikeItem(item: GroupEntreeList) {
    console.log(item.item);
  }
}
