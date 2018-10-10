import { AuthService } from './../../seguranca/auth.service';
import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';

import { ConfirmationService, LazyLoadEvent } from 'primeng/components/common/api';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { EmpresaFiltro, EmpresaService } from './../empresa.service';
import { ToastyService } from 'ng2-toasty';

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
    private toasty: ToastyService,
    private title: Title,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de empresas');
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
        }

        this.toasty.success('Empresa excluída com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
