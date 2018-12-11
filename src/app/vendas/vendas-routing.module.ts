import { VendaCadastroComponent } from './venda-cadastro/venda-cadastro.component';
import { AuthGuard } from './../seguranca/auth.guard';
import { VendasPesquisaComponent } from './vendas-pesquisa/vendas-pesquisa.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '',
    component: VendasPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_VENDA'] }
  },
  { path: 'nova',
    component: VendaCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_VENDA'] }
  },
  { path: ':codigo',
    component: VendaCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_VENDA'] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendasRoutingModule { }
