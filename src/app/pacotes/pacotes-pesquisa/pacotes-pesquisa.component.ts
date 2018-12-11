import { LazyLoadEvent } from 'primeng/components/common/api';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ConfirmationService, MessageService } from 'primeng/api';

import { AuthService } from './../../seguranca/auth.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { PacoteFiltro, PacoteService } from './../pacote.service';

@Component({
  selector: 'app-pacotes-pesquisa',
  templateUrl: './pacotes-pesquisa.component.html',
  styleUrls: ['./pacotes-pesquisa.component.css']
})
export class PacotesPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new PacoteFiltro();
  pacotes = [];
  @ViewChild('tabela') grid;

  constructor(
    private pacoteService: PacoteService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private title: Title,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de pacotes');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.pacoteService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.pacotes = resultado.pacotes;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(pacote: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(pacote);
      }
    });
  }

  excluir(pacote: any) {
    this.pacoteService.excluir(pacote.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
          this.pesquisar();
        }

        this.messageService.add({ severity: 'success', detail: 'Pacote excluído com sucesso!'});
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
