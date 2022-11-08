import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home/home.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VeiculoResolverGuard as VeiculoResolverGuard } from './guards/veiculo-resolver.guard';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { MenuComponent } from './views/home/menu/menu.component';
import { SearchComponent } from './views/home/search/search.component';
import { VeiculoEditComponent } from './views/home/veiculo-edit/veiculo-edit.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent
  },
  {
    path: 'veiculos',
    component: HomeComponent,
    resolve: {
      veiculo: VeiculoResolverGuard
    }},
  {
    path: 'search',
    component: SearchComponent,
    resolve: {
      veiculo: VeiculoResolverGuard
    }},
  {
    path: 'menu',
    component: MenuComponent
  },
  {
    path: 'veiculos/editar/:idVeiculo',
    component: VeiculoEditComponent,
    resolve: {
      veiculo: VeiculoResolverGuard
    }},
  {
      path: 'not-found',
      component: NotFoundComponent,
      data: {
        title: 'Not Found'
      }
  },
  {
      path: '**',
      redirectTo: 'not-found'
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
