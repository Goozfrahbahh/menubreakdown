import { Component, Input } from '@angular/core';
import { GroupEntreeList } from '../../../shared/models/menubreakdown';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-entree',
  template: `
    <div class="container" *ngFor="let entree of entreeList">
      <article
        class="group relative flex h-[12rem] w-[50rem] overflow-hidden rounded-2xl bg-transparent"
      >
        <!-- buttons right side -->
        <aside
          class="absolute left-1 flex h-full flex-col justify-center space-y-8 p-3"
        >
          <!-- like icon -->
          <svg
            class="flex justify-end invisible right-1 h-7 w-7 text-stone-200 opacity-0 transition-all duration-200 hover:scale-[120%] hover:text-white group-hover:visible group-hover:opacity-100"
            fill="none"
            stroke="currentColor"
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

          <!-- download icon -->
          <!-- image (left side) -->
          <div class="absolute inset-y-0 left-0 w-48 p-4">
            <img
              src="{{ entree.imageUrl }}"
              class="h-full w-full object-cover object-center opacity-95 rounded-xl"
            />

            <div
              class="invisible absolute inset-0 flex h-full w-full p-4 rounded-xl items-center justify-center opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100"
            >
              <button class="stats button" (click)="onClickMenuItem(entree)">
                <svg
                  class="h-w-14 w-14 cursor-pointer text-white transition-all duration-200 hover:text-sky-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clip-rule="evenodd"
                  ></path>
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
                  <div>{{ entree.sold }}</div>
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
    this.menuService.updateSelectedMenuItem(menuItem);
  }
}
