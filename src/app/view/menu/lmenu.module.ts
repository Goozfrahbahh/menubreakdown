import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuEditorComponent } from './menu-editor/menu-editor.component';
import { EntreeDetailComponent } from './entree-detail/entree-detail.component';
import { EntreeComponent } from './entree/entree.component';
import { SharedModule } from '../../shared/shared.module';

export const IMPORTMODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  SharedModule,
  HttpClientModule,
];

export const EXPORTCOMPONENTS = [
  MenuEditorComponent,
  EntreeDetailComponent,
  EntreeComponent,
];

@NgModule({
  imports: [...IMPORTMODULES],
  exports: [...EXPORTCOMPONENTS],
  declarations: [...EXPORTCOMPONENTS],
})
export class MenuModule {}
