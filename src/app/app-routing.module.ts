import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './shared/components/home/home.component';
import { SettingsComponent } from './shared/components/settings/settings.component';
import { ViewBoardComponent } from './view/components/board/board.component';
import { MessagesComponent } from './shared/components/messages/message.component';
import { EntryFormComponent } from './upload/entry-form/entry-form.component';
import { DeleteFormComponent } from './upload/delete-form/delete-form.component';
import { SignInComponent } from './core/components/sign-in/sign-in.component';
import { SignUpComponent } from './core/components/sign-up/sign-up.component';
import { MenuEditorComponent } from './editor/components/menu-editor/menu-editor.component';

export const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'sign-in',
    component: SignInComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
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
    path: 'entry-form',
    component: EntryFormComponent,
  },
  {
    path: 'delete-form',
    component: DeleteFormComponent,
  },

  {
    path: 'message-center',
    component: MessagesComponent,
  },
  {
    path: 'menu-editor',
    component: MenuEditorComponent,
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
