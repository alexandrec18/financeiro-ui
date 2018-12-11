import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ConfirmationService, MessageService } from 'primeng/api';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { TransporteFiltro, TransporteService } from './../transporte.service';
import { LazyLoadEvent } from 'primeng/components/common/api';
import { AuthService } from './../../seguranca/auth.service';

@Component({
  selector: 'app-transportes-pesquisa',
  templateUrl: './transportes-pesquisa.component.html',
  styleUrls: ['./transportes-pesquisa.component.css']
})
export class TransportesPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new TransporteFiltro();
  transportes = [];
  @ViewChild('tabela') grid;

  constructor(
    private transporteService: TransporteService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private title: Title,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de transportes');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.transporteService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.transportes = resultado.transportes;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(transporte: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(transporte);
      }
    });
  }

  excluir(transporte: any) {
    this.transporteService.excluir(transporte.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
          this.pesquisar();
        }

        this.messageService.add({ severity: 'success', detail: 'Transporte excluído com sucesso!'});
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
