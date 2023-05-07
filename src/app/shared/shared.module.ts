import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { MessagesComponent } from './components/messages/message.component';
import { ClickOutsideDirective } from './animations/click-outside.directive';
import { SettingsComponent } from './components/settings/settings.component';
import { ListFilterPipe } from './pipes/list-filter.pipe';
import { MenuComponent } from './components/navigation/navigation.component';
import { AppRoutingModule } from '../app-routing.module';
import { ButtonCloseComponent } from './components/button-close/button-close.component';

export const ExportComponents = [
  MessagesComponent,
  MenuComponent,
  ClickOutsideDirective,
  SettingsComponent,
  ButtonCloseComponent,
  ListFilterPipe,
  HomeComponent,
];
export const ImportModules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  AppRoutingModule,
];

@NgModule({
  imports: [...ImportModules],
  exports: [...ExportComponents],
  declarations: [...ExportComponents],
})
export class SharedModule {}
