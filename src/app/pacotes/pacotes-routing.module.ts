import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PacoteCadastroComponent } from './pacote-cadastro/pacote-cadastro.component';
import { AuthGuard } from './../seguranca/auth.guard';
import { PacotesPesquisaComponent } from './pacotes-pesquisa/pacotes-pesquisa.component';

const routes: Routes = [
  { path: 'pacotes',
    component: PacotesPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_PACOTE'] }
  },
  { path: 'pacotes/novo',
    component: PacoteCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_PACOTE'] }
  },
  { path: 'pacotes/:codigo',
    component: PacoteCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_PACOTE'] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacotesRoutingModule { }
