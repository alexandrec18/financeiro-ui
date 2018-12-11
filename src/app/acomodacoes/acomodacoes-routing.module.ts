import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './../seguranca/auth.guard';
import { AcomodacoesPesquisaComponent } from './acomodacoes-pesquisa/acomodacoes-pesquisa.component';
import { AcomodacaoCadastroComponent } from './acomodacao-cadastro/acomodacao-cadastro.component';

const routes: Routes = [
  { path: 'acomodacoes',
    component: AcomodacoesPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_ACOMODACAO'] }
  },
  { path: 'acomodacoes/nova',
    component: AcomodacaoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_ACOMODACAO'] }
  },
  { path: 'acomodacoes/:codigo',
    component: AcomodacaoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_ACOMODACAO'] }
  }
 ]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcomodacoesRoutingModule { }
