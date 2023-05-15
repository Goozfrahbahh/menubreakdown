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
          class="flex items-center justify-center h-12 w-12 text-gray-500 rounded-2xl"
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
                class="flex items-center group justify-center text-[#bbbbc3] hover:bg-[#5a6367] hover:text-white h-12 w-12 rounded-2xl active:!text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 256"
                  height="24"
                  width="24"
                >
                  <path
                    d="M32,56H224a0,0,0,0,1,0,0V192a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V56A0,0,0,0,1,32,56Z"
                    fill="none"
                    stroke="#bbbbc3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="14"
                  />
                  <line
                    x1="32"
                    y1="104"
                    x2="224"
                    y2="104"
                    fill="none"
                    stroke="#fff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="8"
                  />
                  <line
                    x1="32"
                    y1="152"
                    x2="224"
                    y2="152"
                    fill="none"
                    stroke="#fff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="8"
                  />
                  <line
                    x1="88"
                    y1="104"
                    x2="88"
                    y2="200"
                    fill="none"
                    stroke="#fff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="8"
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
              routerLink="/menu-editor"
              [routerLinkActive]="'active'"
              class="flex flex-col items-center"
            >
              <span
                class="flex items-center justify-center text-[#bbbbc3] hover:bg-[#5a6367] hover:text-white h-12 w-12 rounded-2xl active:!text-white"
              >
                <svg
                  height="28px"
                  width="50px"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 512 512"
                  fill="none"
                >
                  <style type="text/css">
                    .st0 {
                      fill: #ffffff;
                    }
                    .st1 {
                      fill: #bbbbc3;
                    }
                  </style>
                  <rect
                    x="20%"
                    y="14%"
                    width="60%"
                    height="70%"
                    rx="30"
                    ry="30"
                    stroke="#bbbbc3"
                    fill="none"
                    stroke-width="16"
                    class="bg-none"
                  />
                  <g tranform="translate(-50, 70) scale(.1)">
                    <path
                      class="st0"
                      d="M167.621,238.116c16.762,19.996,25.436,21.556,37.786,21.774c9.949,0.18,17.242-1.08,27.732,11.352l5.807,6.85 l14.706-17.422l-3.316-3.939c-10.504-12.433-8.028-19.425-6.542-29.262c1.846-12.2,1.77-21.009-15.126-40.892 c0,0-13.416-15.891-24.385-28.886c-9.154-10.827-23.74,0.833-14.376,11.922l25.825,30.575c2.026,2.416,1.906,5.845-0.255,7.668 l-1.05,0.885c-2.146,1.823-5.567,1.365-7.593-1.043l-25.96-30.74c-5.237-6.19-10.564-4.87-14.151-1.823 c-3.616,3.039-5.807,8.066-0.57,14.263l25.946,30.74c2.04,2.408,1.921,5.838-0.241,7.668l-1.05,0.886 c-2.162,1.823-5.553,1.365-7.594-1.05l-25.81-30.568c-9.379-11.104-23.319,1.336-14.166,12.17 C154.206,222.233,167.621,238.116,167.621,238.116z"
                    ></path>
                    <polygon
                      class="st0"
                      points="323.79,343.722 280.437,292.378 265.731,309.808 306.608,358.24 "
                    ></polygon>
                    <path
                      class="st0"
                      d="M195.383,343.962l0.285-0.173l17.107,14.451l63.94-75.736c22.81-26.193,23.185,5.222,50.826-29.457 c11.9-14.091,22.524-40.561,28.451-54.99c9.229-22.449-10.144-32.278-21.834-18.435c-5.687,6.73-32.728,38.761-65.111,77.101 c-32.728,38.768-70.769,83.809-73.47,86.998C195.473,343.864,195.383,343.962,195.383,343.962z"
                    ></path>
                  </g>
                  <!-- <g transform="translate(-80, -200) scale(1.4)">
                    <polygon
                      class="st0"
                      points="186.769,413.08 174.944,387.9 166.961,387.9 166.961,432.31 175.29,432.31 175.29,407.01 183.798,424.604 189.756,424.604 198.023,407.108 198.023,432.31 206.352,432.31 206.352,387.9 198.369,387.9 "
                    ></polygon>
                    <polygon
                      class="st0"
                      points="219.062,432.31 248.115,432.31 248.115,424.642 227.376,424.642 227.376,413.725 245.068,413.725 245.068,406.117 227.376,406.117 227.376,395.56 248.115,395.56 248.115,387.9 219.062,387.9 "
                    ></polygon>
                    <polygon
                      class="st0"
                      points="284.249,415.578 266.031,387.9 258.679,387.9 258.679,432.31 267.007,432.31 267.007,404.572 285.224,432.31 292.562,432.31 292.562,387.9 284.249,387.9 "
                    ></polygon>
                    <path
                      class="st0"
                      d="M328.757,416.734c0,2.634-0.705,4.629-2.146,6.093c-1.441,1.455-3.317,2.168-5.762,2.168 c-2.431,0-4.292-0.705-5.718-2.161c-1.41-1.441-2.116-3.496-2.116-6.1V387.9h-8.328v29.134c0,2.311,0.42,4.457,1.23,6.378 c0.825,1.928,1.981,3.579,3.422,4.937c1.426,1.358,3.166,2.423,5.147,3.188c1.966,0.751,4.112,1.134,6.363,1.134 c2.25,0,4.412-0.383,6.377-1.134c1.982-0.765,3.707-1.823,5.178-3.181c1.455-1.358,2.611-3.016,3.452-4.945 c0.81-1.921,1.245-4.066,1.245-6.378V387.9h-8.343V416.734z"
                    ></path>
                  </g> -->
                </svg>
              </span>
              <span
                class="font-serif text-sm font-light"
                [ngClass]="toggleState ? 'textopen' : 'textclosed'"
                >Menu Editor</span
              >
            </a>
          </li>
          <li>
            <a
              routerLink="/entry-form"
              [routerLinkActive]="'active'"
              class="flex flex-col items-center"
            >
              <span
                class="flex items-center justify-center text-[#bbbbc3] hover:bg-[#5a6367] hover:text-white h-12 w-12 rounded-2xl active:text-white"
              >
                <svg viewBox="10 10 20 20" height="24" width="24" fill="none">
                  <path
                    fill="#bbbbc3"
                    d="M26.1,23H25c-0.3,0-0.5-0.2-0.5-0.5S24.7,22,25,22h1.1c0.4,0,0.8-0.2,1.1-0.5c0.3-0.3,0.4-0.7,0.3-1.2 c-0.1-0.5-0.6-1-1.2-1.1l-0.6-0.1c-0.7-0.1-1.1-0.8-1-1.4l0.1-0.7c0-0.2,0-0.3,0-0.4c0-0.8-0.3-1.5-0.8-2s-1.3-0.8-2-0.8 c-1,0-2,0.7-2.4,1.7l-0.2,0.4c-0.2,0.5-0.7,0.8-1.3,0.7l-0.5-0.1c-0.9-0.1-1.9,0.5-2.2,1.4l-0.1,0.4c-0.2,0.5-0.5,0.8-1,0.8 l-0.5,0.1c-0.4,0.1-0.8,0.3-1,0.7c-0.2,0.4-0.3,0.8-0.1,1.2c0.2,0.5,0.8,0.9,1.4,0.9h1c0.3,0,0.5,0.2,0.5,0.5S15.3,23,15,23h-1 c-1.1,0-2-0.6-2.3-1.6c-0.2-0.7-0.2-1.4,0.2-2c0.4-0.6,1-1,1.7-1.1l0.5-0.1c0.1,0,0.2-0.1,0.2-0.2l0.1-0.4 c0.4-1.2,1.6-2.1,2.9-2.1c0.1,0,0.2,0,0.3,0l0.5,0.1c0.1,0,0.2,0,0.3-0.1l0.2-0.4c0.6-1.3,1.9-2.2,3.3-2.3c1,0,2,0.3,2.8,1 c0.7,0.7,1.2,1.7,1.2,2.7c0,0.2,0,0.4-0.1,0.6l-0.1,0.7c0,0.1,0.1,0.3,0.2,0.3l0.6,0.1c1,0.2,1.8,0.9,2,1.9c0.1,0.7,0,1.4-0.5,2 C27.5,22.7,26.8,23,26.1,23z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M21.5,24.1c-0.1,0-0.3,0-0.4-0.1L20,22.8l-1.2,1.2c-0.2,0.2-0.5,0.2-0.7,0s-0.2-0.5,0-0.7l1.5-1.5 c0.2-0.2,0.5-0.2,0.7,0l1.5,1.5c0.2,0.2,0.2,0.5,0,0.7C21.8,24,21.7,24.1,21.5,24.1z"
                  ></path>

                  <path
                    fill="#fff"
                    d="M20,27.6c-0.3,0-0.5-0.2-0.5-0.5v-5c0-0.3,0.2-0.5,0.5-0.5s0.5,0.2,0.5,0.5v5 C20.5,27.3,20.3,27.6,20,27.6z"
                  ></path>
                </svg>
              </span>
              <span
                class="font-serif text-sm font-light"
                [ngClass]="toggleState ? 'textopen' : 'textclosed'"
                >Upload Data</span
              >
            </a>
          </li>
          <li>
            <a
              routerLink="/delete-form"
              [routerLinkActive]="'active'"
              class="flex flex-col items-center flex-nowrap"
            >
              <span
                class="flex items-center justify-center text-[#bbbbc3] hover:bg-[#5a6367] hover:text-white h-12 w-12 rounded-2xl active:!text-white"
              >
                <svg
                  viewBox="-3 -12 70 70"
                  height="26px"
                  width="26px"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
                  fill="none"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <g
                      id="Page-1"
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                      sketch:type="MSPage"
                    >
                      <g
                        id="Cloud-delete"
                        sketch:type="MSLayerGroup"
                        transform="translate(1.000000, 1.000000)"
                        stroke-width="3"
                        stroke="#bbbbc3"
                      >
                        <g id="Group" sketch:type="MSShapeGroup">
                          <path
                            d="M14.7,8.9 C17.6,3.6 23.3,0 29.8,0 C39.3,0 47,7.6 47,17.1 C47,18.4 46.8,19.7 46.6,20.9"
                            id="Shape"
                          ></path>
                          <path
                            d="M24.6,36 L13.6,36 C6.1,36 0,29.9 0,22.5 C0,15 6.1,9 13.6,9 C17.1,9 20.3,10.3 22.7,12.4"
                            id="Shape"
                          ></path>
                          <path
                            d="M47.4,14.5 C48.5,14.1 49.7,14 50.9,14 C57,14 62,18.9 62,25 C62,31.1 57,36 50.9,36 L39.8,36"
                            id="Shape"
                          ></path>
                        </g>
                        <path
                          d="M39.8,36.4 L36.3,32.9 L39.7,29.5 L35.5,25.2 L32,28.7 L28.5,25.2 L24.3,29.5 L27.8,33 L24.3,36.5 L28.5,40.7 L32,37.2 L35.5,40.8 L39.8,36.4 Z"
                          id="Shape"
                          stroke="#ffffff"
                          sketch:type="MSShapeGroup"
                        ></path>
                      </g>
                    </g>
                  </g>
                </svg>
              </span>
              <span
                class="font-serif text-sm font-light"
                [ngClass]="toggleState ? 'textopen' : 'textclosed'"
                >Delete Items</span
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
                class="flex items-center justify-center text-[#bbbbc3] hover:bg-[#5a6367] hover:text-white h-12 w-12 rounded-2xl active:!text-white"
              >
                <svg
                  viewBox="0 0 192 192"
                  width="26px"
                  height="26px"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      fill="#bbbbc3"
                      d="M18.5 46v-6a6 6 0 0 0-4.243 10.243L18.5 46ZM42 52h104V40H42v12Zm118 14v60h12V66h-12Zm-14 74H62v12h84v-12ZM42 40H18.5v12H42V40Zm6 86V76.127H36V126h12ZM14.257 50.243l18.814 18.813 8.485-8.485-18.813-18.814-8.486 8.486ZM48 76.127a22 22 0 0 0-6.444-15.556l-8.485 8.485A10 10 0 0 1 36 76.127h12ZM62 140c-7.732 0-14-6.268-14-14H36c0 14.359 11.64 26 26 26v-12Zm98-14c0 7.732-6.268 14-14 14v12c14.359 0 26-11.641 26-26h-12Zm-14-74c7.732 0 14 6.268 14 14h12c0-14.36-11.641-26-26-26v12Z"
                    ></path>
                    <path
                      stroke="#ffff"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="10"
                      d="M66 84h76m-76 24h44"
                    ></path>
                  </g>
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
                class="flex items-center justify-center text-[#bbbbc3] hover:bg-[#5a6367] hover:text-white h-12 w-12 rounded-2xl"
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
                    class="text-white"
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
        background-color: #5a6367;
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
