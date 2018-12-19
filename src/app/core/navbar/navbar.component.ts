import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MenuItem } from 'primeng/api';

import { LogoutService } from './../../seguranca/logout.service';
import { AuthService } from './../../seguranca/auth.service';
import { ErrorHandlerService } from '../error-handler.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  exibindoMenu = false;
  items: MenuItem[];

  constructor(
    public auth: AuthService,
    private logoutService: LogoutService,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.items = [
      {
        label: 'Dashboard',
        routerLink: '/dashboard',
        visible: this.auth.temPermissao('ROLE_PESQUISAR_LANCAMENTO')
      },
      {
          label: 'Cadastros',
          items: [
              {label: 'Acomodações', routerLink: '/acomodacoes',
                visible: this.auth.temPermissao('ROLE_PESQUISAR_ACOMODACAO')},
              {label: 'Empresas', routerLink: '/empresas',
                visible: this.auth.temPermissao('ROLE_PESQUISAR_EMPRESA')},
              {label: 'Categorias', routerLink: '/categorias',
                visible: this.auth.temPermissao('ROLE_PESQUISAR_CATEGORIA')},
              {label: 'Moedas', routerLink: '/moedas',
                visible: this.auth.temPermissao('ROLE_PESQUISAR_MOEDA')},
              {label: 'Pacotes', routerLink: '/pacotes',
                visible: this.auth.temPermissao('ROLE_PESQUISAR_PACOTE')},
              {label: 'Pessoas', routerLink: '/pessoas',
                visible: this.auth.temPermissao('ROLE_PESQUISAR_PESSOA')},
              {label: 'Regimes', routerLink: '/regimes',
                visible: this.auth.temPermissao('ROLE_PESQUISAR_REGIME')},
              {label: 'Tipos de Acomodações', routerLink: '/tipo-acomodacoes',
                visible: this.auth.temPermissao('ROLE_PESQUISAR_TIPO_ACOMODACAO')},
              {label: 'Transportes', routerLink: '/transportes',
                visible: this.auth.temPermissao('ROLE_PESQUISAR_TRANSPORTE')},
              {label: 'Usuários', routerLink: '/usuarios',
                visible: this.auth.temPermissao('ROLE_PESQUISAR_USUARIO')}
          ]
      },
      {
          label: 'Financeiro',
          items: [
              {label: 'Lançamentos', routerLink: '/lancamentos',
               visible: this.auth.temPermissao('ROLE_PESQUISAR_LANCAMENTO')}
          ]
      },
      {
          label: 'Relatórios',
          items: [
              {
                  label: 'Financeiros',
                  items: [
                      {
                          label: 'Lançamentos por pessoa',
                          routerLink: '/relatorios/lancamentos'
                      },
                      {
                        label: 'Lançamentos por período',
                        routerLink: '/relatorios/lancamentos/por-periodo'
                      }
              ]}
          ]
      },
      {
        label: 'Vendas',
        routerLink: '/vendas',
        visible: this.auth.temPermissao('ROLE_PESQUISAR_VENDA')
      },
      {
          label: 'Sair',
          command: (event) => {
            this.logout();
          }
      }
  ];
  }

  logout() {
    this.logoutService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
