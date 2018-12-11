import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { ConfirmationService, MessageService } from 'primeng/api';

import { AuthService } from './../../seguranca/auth.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { AcomodacaoFiltro, AcomodacaoService } from './../acomodacao.service';

@Component({
  selector: 'app-acomodacoes-pesquisa',
  templateUrl: './acomodacoes-pesquisa.component.html',
  styleUrls: ['./acomodacoes-pesquisa.component.css']
})
export class AcomodacoesPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new AcomodacaoFiltro();
  acomodacoes = [];
  @ViewChild('tabela') grid;

  constructor(
    private acomodacaoService: AcomodacaoService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private title: Title,
    private auth: AuthService) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de acomodações');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.acomodacaoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.acomodacoes = resultado.acomodacoes;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(acomodacao: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(acomodacao);
      }
    });
  }

  excluir(acomodacao: any) {
    this.acomodacaoService.excluir(acomodacao.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
          this.pesquisar();
        }

        this.messageService.add({ severity: 'success', detail: 'Acomodação excluída com sucesso!'});
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
