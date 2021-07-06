import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUpdateItemComponent } from './components/create-update-item/create-update-item.component';
import { ListItemsComponent } from './components/list-items/list-items.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';

const routes: Routes = [
  { path: '', component: ListItemsComponent },
  { path: 'create', component: CreateUpdateItemComponent},
  { path: 'update/:id', component: CreateUpdateItemComponent },
  { path: 'menu/:id', component: MenuItemComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
