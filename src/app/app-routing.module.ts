import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './shared/components/home/home.component';
import { SettingsComponent } from './shared/components/settings/settings.component';
import { ViewBoardComponent } from './view/components/board/board.component';
import { MessagesComponent } from './shared/components/messages/message.component';
import { SelectionMenuComponent } from './upload/selection-menu/selection-menu.component';
import { EntryFormComponent } from './upload/entry-form/entry-form.component';
import { DeleteFormComponent } from './upload/delete-form/delete-form.component';

export const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: 'view',
    component: ViewBoardComponent,
  },
  {
    path: 'upload',
    component: SelectionMenuComponent,
  },
  {
    path: 'message-center',
    component: MessagesComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
