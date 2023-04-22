import { NgModule } from '@angular/core';
import { EntryFormComponent } from './entry-form/entry-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { SelectionMenuComponent } from './selection-menu/selection-menu.component';
import { DeleteFormComponent } from './delete-form/delete-form.component';

const EXPORTCOMPONENTS = [
  SelectionMenuComponent,
  EntryFormComponent,
  DeleteFormComponent,
];

const IMPORTMODULES = [
  CommonModule,
  SharedModule,
  ReactiveFormsModule,
  FormsModule,
  HttpClientModule,
];

@NgModule({
  imports: [...IMPORTMODULES],
  declarations: [...EXPORTCOMPONENTS],
  exports: [...EXPORTCOMPONENTS],
})
export class UploadModule {}
