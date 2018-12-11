import { LazyLoadEvent } from 'primeng/components/common/api';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ConfirmationService, MessageService } from 'primeng/api';

import { AuthService } from './../../seguranca/auth.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { MoedaFiltro, MoedaService } from './../moeda.service';

@Component({
  selector: 'app-moedas-pesquisa',
  templateUrl: './moedas-pesquisa.component.html',
  styleUrls: ['./moedas-pesquisa.component.css']
})
export class MoedasPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new MoedaFiltro();
  moedas = [];
  @ViewChild('tabela') grid;

  constructor(
    private moedaService: MoedaService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private title: Title,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de moedas');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.moedaService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.moedas = resultado.moedas;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(moeda: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(moeda);
      }
    });
  }

  excluir(moeda: any) {
    this.moedaService.excluir(moeda.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
          this.pesquisar();
        }

        this.messageService.add({ severity: 'success', detail: 'Moeda excluída com sucesso!'});
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
