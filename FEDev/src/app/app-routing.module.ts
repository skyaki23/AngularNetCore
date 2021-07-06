import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUpdateItemComponent } from './components/create-update-item/create-update-item.component';
import { ListItemsComponent } from './components/list-items/list-items.component';

const routes: Routes = [
  { path: '', component: ListItemsComponent },
  { path: 'CreateUpdate', component: CreateUpdateItemComponent},
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
