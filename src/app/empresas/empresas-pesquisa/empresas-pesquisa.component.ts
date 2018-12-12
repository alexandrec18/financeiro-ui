import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';

import { ConfirmationService, LazyLoadEvent } from 'primeng/components/common/api';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { EmpresaFiltro, EmpresaService } from './../empresa.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { AuthService } from 'app/seguranca/auth.service';

@Component({
  selector: 'app-empresas-pesquisa',
  templateUrl: './empresas-pesquisa.component.html',
  styleUrls: ['./empresas-pesquisa.component.css']
})
export class EmpresasPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new EmpresaFiltro();
  empresas = [];
  @ViewChild('tabela') grid;

  constructor(
    private empresaService: EmpresaService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private title: Title,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de empresas');
  }

  get admin() {
    return Boolean(this.auth.jwtPayload.empresa.codigo === 1);
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.empresaService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.empresas = resultado.empresas;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(empresa: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(empresa);
      }
    });
  }

  excluir(empresa: any) {
    this.empresaService.excluir(empresa.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
          this.pesquisar();
        }

        this.messageService.add({ severity: 'success', detail: 'Empresa excluída com sucesso!'});
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
