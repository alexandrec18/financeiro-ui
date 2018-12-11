import { ConfirmationService } from 'primeng/api';
import { LazyLoadEvent, MessageService } from 'primeng/components/common/api';
import { VendaFiltro, VendaService } from './../venda.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PessoaService } from 'app/pessoas/pessoa.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-vendas-pesquisa',
  templateUrl: './vendas-pesquisa.component.html',
  styleUrls: ['./vendas-pesquisa.component.css']
})

export class VendasPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new VendaFiltro();
  vendas = [];
  @ViewChild('tabela') grid;

  situacao = [
    { label: 'Aberta', value: 'ABERTA' },
    { label: 'Fechada', value: 'FECHADA' }
  ];

  pagantes = [];

  constructor(
    private vendaService: VendaService,
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private title: Title) {
  }

  ngOnInit() {
    this.title.setTitle('Pesquisa de Vendas');

    this.carregarPagantes();
  }

  carregarPagantes() {
    return this.pessoaService.listarTodas()
      .then(pagantes => {
        this.pagantes = pagantes.map(c => ({ label: c.nome, value: c.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.vendaService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.vendas = resultado.vendas;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(venda: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(venda);
      }
    });
  }

  excluir(venda: any) {
    this.vendaService.excluir(venda.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
          this.pesquisar();
        }

        this.messageService.add({ severity: 'success', detail: 'Venda excluída com sucesso!'});
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
