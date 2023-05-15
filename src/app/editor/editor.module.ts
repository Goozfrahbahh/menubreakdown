import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuEditorComponent } from './components/menu-editor/menu-editor.component';
import { EntreeDetailComponent } from './components/entree-detail/entree-detail.component';
import { EntreeComponent } from './components/entree/entree.component';
import { SharedModule } from '../shared/shared.module';
import { DetailEditComponent } from './components/detail-edit/detail-edit.component';

export const IMPORTMODULES = [
  CommonModule,
  NgOptimizedImage,
  FormsModule,
  ReactiveFormsModule,
  SharedModule,
  HttpClientModule,
];

export const EXPORTCOMPONENTS = [
  MenuEditorComponent,
  EntreeDetailComponent,
  EntreeComponent,
  DetailEditComponent,
];

@NgModule({
  declarations: [...EXPORTCOMPONENTS],
  imports: [...IMPORTMODULES],
  exports: [...EXPORTCOMPONENTS],
})
export class MenuEditorModule {}
