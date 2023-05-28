import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemsListComponent } from './pages/items-list/items-list.component';
import { ItemsRegisterComponent } from './pages/items-register/items-register.component';

const routes: Routes = [
  { path: 'Listar', component: ItemsListComponent },
  { path: 'Cadastrar', component: ItemsRegisterComponent },
  { path: 'Editar/:id', component: ItemsRegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
