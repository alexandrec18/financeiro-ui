import { LazyLoadEvent } from 'primeng/components/common/api';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { AuthService } from './../../seguranca/auth.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { TipoAcomodacaoFiltro, TipoAcomodacaoService } from './../tipo-acomodacao.service';

@Component({
  selector: 'app-tipo-acomodacoes-pesquisa',
  templateUrl: './tipo-acomodacoes-pesquisa.component.html',
  styleUrls: ['./tipo-acomodacoes-pesquisa.component.css']
})
export class TipoAcomodacoesPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new TipoAcomodacaoFiltro();
  tipoAcomodacoes = [];
  @ViewChild('tabela') grid;

  constructor(
    private tipoAcomodacaoService: TipoAcomodacaoService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private title: Title,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de tipo de acomodações');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.tipoAcomodacaoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.tipoAcomodacoes = resultado.tipoAcomodacoes;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(tipoAcomodacao: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(tipoAcomodacao);
      }
    });
  }

  excluir(tipoAcomodacao: any) {
    this.tipoAcomodacaoService.excluir(tipoAcomodacao.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
          this.pesquisar();
        }

        this.messageService.add({ severity: 'success', detail: 'Tipo de Acomodação excluída com sucesso!'});
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
