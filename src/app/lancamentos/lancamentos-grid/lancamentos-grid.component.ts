import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';

import { MessageService } from 'primeng/components/common/messageservice';
import { AuthService } from './../../seguranca/auth.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { LancamentoFiltro, LancamentoService } from './../lancamento.service';

@Component({
  selector: 'app-lancamentos-grid',
  templateUrl: './lancamentos-grid.component.html',
  styleUrls: ['./lancamentos-grid.component.css']
})
export class LancamentosGridComponent {

  @Input() lancamentos = [];
  @Input() totalRegistros;
  @Input() filtro: LancamentoFiltro;

  @Output() mudarPagina = new EventEmitter();
  @Output() consultar = new EventEmitter();

  @ViewChild('tabela') grid;

  constructor(
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private auth: AuthService) {}

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;

    this.mudarPagina.emit(pagina);
  }

  confirmarExclusao(lancamento: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(lancamento);
      }
    })
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.consultar.emit();
        } else {
          this.grid.first = 0;
          this.consultar.emit();
        }

        this.messageService.add({ severity: 'success', detail: 'Lançamento excluído com sucesso!'});
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
