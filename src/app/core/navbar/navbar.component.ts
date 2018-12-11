import { Component, OnInit } from '@angular/core';

import { LogoutService } from './../../seguranca/logout.service';
import { AuthService } from './../../seguranca/auth.service';
import { ErrorHandlerService } from '../error-handler.service';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

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
        disabled: !this.auth.temPermissao('ROLE_PESQUISAR_LANCAMENTO')
      },
      {
          label: 'Cadastros',
          items: [
              {label: 'Acomodações', routerLink: '/acomodacoes',
                disabled: !this.auth.temPermissao('ROLE_PESQUISAR_ACOMODACAO')},
              {label: 'Empresas', routerLink: '/empresas',
                disabled: !this.auth.temPermissao('ROLE_PESQUISAR_EMPRESA')},
              {label: 'Categorias', routerLink: '/categorias',
                disabled: !this.auth.temPermissao('ROLE_PESQUISAR_CATEGORIA')},
              {label: 'Moedas', routerLink: '/moedas',
                disabled: !this.auth.temPermissao('ROLE_PESQUISAR_MOEDA')},
              {label: 'Pacotes', routerLink: '/pacotes',
                disabled: !this.auth.temPermissao('ROLE_PESQUISAR_PACOTE')},
              {label: 'Pessoas', routerLink: '/pessoas',
                disabled: !this.auth.temPermissao('ROLE_PESQUISAR_PESSOA')},
              {label: 'Regimes', routerLink: '/regimes',
                disabled: !this.auth.temPermissao('ROLE_PESQUISAR_REGIME')},
              {label: 'Tipos de Acomodações', routerLink: '/tipo-acomodacoes',
                disabled: !this.auth.temPermissao('ROLE_PESQUISAR_TIPO_ACOMODACAO')},
              {label: 'Transportes', routerLink: '/transportes',
                disabled: !this.auth.temPermissao('ROLE_PESQUISAR_TRANSPORTE')},
              {label: 'Usuários', routerLink: '/usuarios',
                disabled: !this.auth.temPermissao('ROLE_PESQUISAR_USUARIO')}
          ]
      },
      {
          label: 'Financeiro',
          items: [
              {label: 'Lançamentos', routerLink: '/lancamentos',
                disabled: !this.auth.temPermissao('ROLE_PESQUISAR_LANCAMENTO')}
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
                      }
              ]}
          ]
      },
      {
        label: 'Vendas',
        routerLink: '/vendas',
        disabled: !this.auth.temPermissao('ROLE_PESQUISAR_VENDA')
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
