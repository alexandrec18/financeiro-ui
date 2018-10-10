import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { EmpresaCadastroComponent } from './empresa-cadastro/empresa-cadastro.component';
import { EmpresasPesquisaComponent } from './empresas-pesquisa/empresas-pesquisa.component';
import { AuthGuard } from './../seguranca/auth.guard';

const routes: Routes = [
  { path: 'empresas',
    component: EmpresasPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_EMPRESA'] }
  },
  { path: 'empresas/nova',
    component: EmpresaCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_EMPRESA'] }
  },
  { path: 'empresas/:codigo',
    component: EmpresaCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_EMPRESA'] }
  }
 ]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class EmpresasRoutingModule { }
