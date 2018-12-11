import { RegimeCadastroComponent } from './regime-cadastro/regime-cadastro.component';
import { AuthGuard } from './../seguranca/auth.guard';
import { RegimesPesquisaComponent } from './regimes-pesquisa/regimes-pesquisa.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'regimes',
    component: RegimesPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_REGIME'] }
  },
  { path: 'regimes/novo',
    component: RegimeCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_REGIME'] }
  },
  { path: 'regimes/:codigo',
    component: RegimeCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_REGIME'] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegimesRoutingModule { }
