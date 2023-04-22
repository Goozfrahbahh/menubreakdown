import {
  trigger,
  transition,
  query,
  animate,
  style,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selection',
  template: `
    <div
      class="selection-container fixed flex justify-start mt-[15vh]  max-w-fit z-0 bg-zinc-900 bg-opacity-40 rounded-xl border border-l-0 border-zinc-700 border-opacity-40 shadow-xl"
      *ngIf="forms"
      @inOutPaneAnimation
    >
      <ul
        class="mr-4 flex list-none flex-col flex-wrap pl-0"
        role="tablist"
        data-te-nav-ref
      >
        <li role="presentation" class="flex-grow text-left">
          <button
            (click)="onSelectEntryForm()"
            class="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 dark:hover:text-indigo-300 hover:isolate focus:isolate focus:border-transparent dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
            role="tab"
          >
            Entry Form
          </button>
        </li>
        <hr
          class="my-2 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-25 dark:opacity-100"
        />
        <li role="presentation" class="flex-grow text-left">
          <button
            (click)="onSelectDelete()"
            class="focus:border-transparent bg-zinc--800/20 my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate focus:isolate  dark:text-neutral-400 dark:hover:text-indigo-300 dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
            href="delete-form"
          >
            Remove Form
          </button>
        </li>
      </ul>
    </div>
    <div @listAnimation>
      <div class="" *ngIf="addForm">
        <app-entry-form></app-entry-form>
      </div>
      <div class="" *ngIf="deleteForm">
        <app-delete-form></app-delete-form>
      </div>
    </div>
  `,
  animations: [
    trigger('inOutPaneAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-100%)' }), //apply default styles before animation starts
        animate(
          '750ms ease-in-out',
          style({ opacity: 1, transform: 'translateX(0)' })
        ),
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateX(0)' }), //apply default styles before animation starts
        animate(
          '600ms ease-in-out',
          style({ opacity: 0, transform: 'translateX(-100%)' })
        ),
      ]),
    ]),
    trigger('listAnimation', [
      transition(':enter, * => 0, * => -1', []),
      transition(':increment', [
        query(':enter', [
          animate(
            '150ms cubic-bezier(.17,.67,.83,.67)',
            style({
              opacity: 1,
              width: '*',
            })
          ),
        ]),
      ]),
      transition(':decrement', [
        query(':leave', [
          animate(
            '300ms cubic-bezier(.17,.67,.83,.67)',
            style({
              opacity: 0,
              width: '0px',
            })
          ),
        ]),
      ]),
    ]),
  ],
})
export class SelectionMenuComponent implements OnInit {
  forms: boolean = false;
  addForm: boolean = false;
  deleteForm: boolean = false;
  constructor(private router: Router) {}

  ngOnInit() {
    this.forms = true;
  }

  onSelectDelete() {
    this.addForm = false;
    this.deleteForm = true;
  }
  onSelectEntryForm() {
    this.deleteForm = false;
    this.addForm = true;
  }
}
