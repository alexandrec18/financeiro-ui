import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './../seguranca/auth.guard'
import { TransporteCadastroComponent } from './transporte-cadastro/transporte-cadastro.component';
import { TransportesPesquisaComponent } from './transportes-pesquisa/transportes-pesquisa.component';

const routes: Routes = [
  { path: 'transportes',
    component: TransportesPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_TRANSPORTE'] }
  },
  { path: 'transportes/novo',
    component: TransporteCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_TRANSPORTE'] }
  },
  { path: 'transportes/:codigo',
    component: TransporteCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_TRANSPORTE'] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransportesRoutingModule { }
