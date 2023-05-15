import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-close',
  template: `<div class="close-container">
    <div class="leftright bg-gray-300"></div>
    <div class="rightleft bg-gray-300"></div>
    <label class="close absolute -right-[8px] -top-6">close</label>
  </div>`,
  styles: [
    `
      body {
        background-color: transparent;
      }

      .close-container {
        position: relative;
        margin: auto;
        width: 22px;
        height: 25px;
        margin-top: 100px;
        cursor: pointer;
      }

      .leftright {
        height: 4px;
        width: 18px;
        position: absolute;
        font-weight: light;
        margin-top: 24px;
        border-radius: 2px;
        transform: rotate(45deg);
        transition: all 0.3s ease-in;
      }

      .rightleft {
        height: 4px;
        width: 18px;
        position: absolute;
        margin-top: 24px;
        border-radius: 2px;
        transform: rotate(-45deg);
        transition: all 0.3s ease-in;
      }

      label {
        color: white;
        font-family: Helvetica, Arial, sans-serif;
        font-size: 0.6em;
        text-transform: uppercase;
        letter-spacing: 2.5px;
        transition: all 0.3s ease-in;
        opacity: 0;
      }

      .close {
        margin: 60px 0 0 5px;
        position: absolute;
      }

      .close-container:hover .leftright {
        transform: rotate(-45deg);
        background-color: #f25c66;
      }

      .close-container:hover .rightleft {
        transform: rotate(45deg);
        background-color: #f25c66;
      }

      .close-container:hover label {
        opacity: 1;
      }
    `,
  ],
})
export class ButtonCloseComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
