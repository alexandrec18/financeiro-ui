import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ConfirmationService, MessageService } from 'primeng/api';
import { LazyLoadEvent } from 'primeng/components/common/api';

import { AuthService } from './../../seguranca/auth.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { RegimeFiltro, RegimeService } from './../regime.service';

@Component({
  selector: 'app-regimes-pesquisa',
  templateUrl: './regimes-pesquisa.component.html',
  styleUrls: ['./regimes-pesquisa.component.css']
})
export class RegimesPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new RegimeFiltro();
  regimes = [];
  @ViewChild('tabela') grid;

  constructor(
    private regimeService: RegimeService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private title: Title,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de regimes');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.regimeService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.regimes = resultado.regimes;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(regime: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(regime);
      }
    });
  }

  excluir(regime: any) {
    this.regimeService.excluir(regime.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
          this.pesquisar();
        }

        this.messageService.add({ severity: 'success', detail: 'Regime excluído com sucesso!'});
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
