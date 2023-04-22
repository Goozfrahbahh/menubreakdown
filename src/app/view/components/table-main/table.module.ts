import { NgModule } from '@angular/core';
import { TbodyComponent } from './tbody/tbody.component';
import { TheadComponent } from './thead/thead.component';
import { TableComponent } from './table/table.component';
import { ContentComponent } from './content/content.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../../shared/shared.module';
import { TheadInventoryComponent } from './thead-inventory/thead-inventory.component';
import { TbodyInventoryComponent } from './tbody-inventory/tbody-inventory.component';

const EXPORTCOMPONENTS = [
  TableComponent,
  TbodyComponent,
  TheadComponent,
  ContentComponent,
];

const IMPORTMODULES = [
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  SharedModule,
  HttpClientModule,
];

@NgModule({
  declarations: [...EXPORTCOMPONENTS, TheadInventoryComponent, TbodyInventoryComponent],
  imports: [...IMPORTMODULES],
  exports: [...EXPORTCOMPONENTS],
})
export class Tablemodule {}
