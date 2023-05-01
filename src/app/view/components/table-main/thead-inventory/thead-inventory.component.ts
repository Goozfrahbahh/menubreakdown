import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-thead-inventory',
  template: `
    <thead
      class="w-full bg-gray-50 dark:bg-zinc-700 dark:bg-opacity-[.45] shadow-2xl"
    >
      <tr class="border-b-[1px] border-zinc-600 border-b-zinc-500">
        <th
          scope="col"
          class="py-5 pr-7 pl-5 w-[220px] text-xs font-semibold font-serif text-left rtl:text-right text-gray-300 dark:text-gray-300"
        >
          <span>Inventory Category</span>
        </th>

        <th
          scope="col"
          class="px-12 py-5 w-[130px] text-center text-xs font-semibold font-serif text-gray-300 dark:text-gray-300"
        >
          Total Portion
        </th>
        <th scope="col" class="relative py-3.5 px-7 w-[60px]">
          <span class="sr-only">Expand</span>
        </th>
      </tr>
    </thead>
  `,
})
export class TheadInventoryComponent {
  @Output('checkAllBoxes') checkAll = new EventEmitter<any>();
}
