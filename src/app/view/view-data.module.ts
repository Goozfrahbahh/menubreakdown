import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ViewBoardComponent } from './components/board/board.component';
import { ViewBoardDaysComponent } from './components/view-board-days/view-board.component';
import { InterfaceTableComponent } from './components/interface-table/interface-table.component';
import { HttpClientModule } from '@angular/common/http';
import { TableComponent } from './components/table-main/table/table.component';
import { Tablemodule } from './components/table-main/table.module';

export const EXPORTCOMPONENTS = [
  ViewBoardComponent,
  ViewBoardDaysComponent,
  InterfaceTableComponent,
];
export const IMPORTmODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  Tablemodule,
  SharedModule,
  HttpClientModule,
];

@NgModule({
  imports: [...IMPORTmODULES],
  exports: [...EXPORTCOMPONENTS],
  declarations: [...EXPORTCOMPONENTS, InterfaceTableComponent],
})
export class ViewDataModule {}
