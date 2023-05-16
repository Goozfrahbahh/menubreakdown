import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-thead-inventory',
  template: `
    <thead
      class="w-full inline-block bg-gray-50 dark:bg-zinc-700 dark:bg-opacity-[.45] shadow-2xl"
    >
      <tr class="border-b-[1px] border-zinc-600 border-b-zinc-500">
        <th
          scope="col"
          class="px-10 pl-9 pr-9 w-[370px] text-sm tracking-wider font-bold text-left rtl:text-right text-gray-700 dark:text-gray-400"
        >
          <span>Inventory Category</span>
        </th>

        <th
          scope="col"
          class="px-8 py-4 w-[160px] text-center tracking-wider text-sm font-bold text-gray-700 dark:text-gray-400"
        >
          Total Portion
        </th>
        <th scope="col" class="w-[120px]">
          <span class="sr-only">Expand</span>
        </th>
      </tr>
    </thead>
  `,
})
export class TheadInventoryComponent {
  @Output('checkAllBoxes') checkAll = new EventEmitter<any>();
}
