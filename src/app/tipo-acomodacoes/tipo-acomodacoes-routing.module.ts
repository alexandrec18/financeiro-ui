import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './../seguranca/auth.guard';
import { TipoAcomodacaoCadastroComponent } from './tipo-acomodacao-cadastro/tipo-acomodacao-cadastro.component';
import { TipoAcomodacoesPesquisaComponent } from './tipo-acomodacoes-pesquisa/tipo-acomodacoes-pesquisa.component';

const routes: Routes = [
  {
    path: 'tipo-acomodacoes',
    component: TipoAcomodacoesPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_TIPO_ACOMODACAO'] }
  },
  {
    path: 'tipo-acomodacoes/nova',
    component: TipoAcomodacaoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_TIPO_ACOMODACAO'] }
  },
  {
    path: 'tipo-acomodacoes/:codigo',
    component: TipoAcomodacaoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_TIPO_ACOMODACAO'] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoAcomodacoesRoutingModule { }
