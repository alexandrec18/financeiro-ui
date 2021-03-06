import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';
import { NaoAutorizadoComponent } from './core/nao-autorizado.component';

const routes: Routes = [

  // CARREGAMENTO TARDIO
  { path: 'lancamentos', loadChildren: 'app/lancamentos/lancamentos.module#LancamentosModule' },
  { path: 'pessoas', loadChildren: 'app/pessoas/pessoas.module#PessoasModule' },
  { path: 'dashboard', loadChildren: 'app/dashboard/dashboard.module#DashboardModule' },
  { path: 'relatorios', loadChildren: 'app/relatorios/relatorios.module#RelatoriosModule' },
  { path: 'vendas', loadChildren: 'app/vendas/vendas.module#VendasModule' },

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  { path: 'nao-autorizado', component: NaoAutorizadoComponent },
  { path: '**', redirectTo: 'pagina-nao-encontrada' }
 ]

 @NgModule({
   imports: [
     RouterModule.forRoot(routes, { useHash: true })
   ],
   exports: [RouterModule]
 })
 export class AppRoutingModule { }
