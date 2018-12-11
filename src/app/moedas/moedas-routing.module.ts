import { MoedaCadastroComponent } from './moeda-cadastro/moeda-cadastro.component';
import { AuthGuard } from './../seguranca/auth.guard';
import { MoedasPesquisaComponent } from './moedas-pesquisa/moedas-pesquisa.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'moedas',
    component: MoedasPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_MOEDA'] }
  },
  { path: 'moedas/nova',
    component: MoedaCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_MOEDA'] }
  },
  { path: 'moedas/:codigo',
    component: MoedaCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_MOEDA'] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoedasRoutingModule { }
