import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactListPage } from '../pages/contact-list-page';
import { ContactEditPage } from '../pages/contact-edit-page';
import { LoginPage } from '../pages/login-page';


const routes: Routes = [
  { path: '', component: ContactListPage },
  { path: 'create', component: ContactEditPage },
  { path: 'edit/:id', component: ContactEditPage },
  { path: 'login', component: LoginPage }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
