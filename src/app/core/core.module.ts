import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { GrowlModule } from 'primeng/growl';
import { MessageService } from 'primeng/components/common/messageservice';
import { JwtHelperService } from '@auth0/angular-jwt';

import { RelatoriosService } from './../relatorios/relatorios.service';
import { DashboardService } from './../dashboard/dashboard.service';
import { PermissaoService } from './../permissoes/permissao.service';
import { UsuarioService } from './../usuarios/usuario.service';
import { EmpresaService } from './../empresas/empresa.service';
import { AuthService } from './../seguranca/auth.service';
import { CategoriaService } from './../categorias/categoria.service';
import { PessoaService } from './../pessoas/pessoa.service';
import { ErrorHandlerService } from './error-handler.service';
import { LancamentoService } from './../lancamentos/lancamento.service';
import { NavbarComponent } from './navbar/navbar.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { NaoAutorizadoComponent } from './nao-autorizado.component';
import { GlobalHttp } from 'app/seguranca/global-http';

registerLocaleData(localePt);

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,

    GrowlModule,
    ConfirmDialogModule,
  ],
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent
  ],
  exports: [
    NavbarComponent,
    GrowlModule,
    ConfirmDialogModule
  ],
  providers: [
    LancamentoService,
    PessoaService,
    CategoriaService,
    EmpresaService,
    UsuarioService,
    PermissaoService,
    DashboardService,
    RelatoriosService,
    ErrorHandlerService,
    AuthService,
    GlobalHttp,

    ConfirmationService,
    MessageService,
    JwtHelperService,
    Title,
    { provide: LOCALE_ID, useValue: 'pt' }
  ]
})
export class CoreModule { }
