import { FormControl } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { VendaProduto } from 'app/core/model';
import { PessoaService } from 'app/pessoas/pessoa.service';
import { VendaService } from '../venda.service';

@Component({
  selector: 'app-venda-cadastro-produto-generico',
  templateUrl: './venda-cadastro-produto-generico.component.html',
  styleUrls: ['./venda-cadastro-produto-generico.component.css']
})
export class VendaCadastroProdutoGenericoComponent implements OnInit, OnChanges {

  @Input() vendaProduto: VendaProduto;

  @Output() emiterConfirmarProduto = new EventEmitter();

  exibindoFormularioVendaProduto = true;

  fornecedores: [];
  representantes: [];

  labelCabecalho: string;
  labelReserva: string;
  labelFornecedor: string;
  labelDataInicial: string;
  labelDataFinal: string;
  labelHoraInicial: string;
  labelHoraFinal: string;

  constructor(
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private vendaService: VendaService
  ) { }

  ngOnInit() {
    this.carregarFornecedor();
    this.carregarRepresentante();
  }

  get exibirHoras() {
    return Boolean(this.vendaProduto.produto !== 'SV' &&
      this.vendaProduto.produto !== 'CI')
  }

  get editando() {
    return this.vendaProduto && this.vendaProduto.codigo
  }

  onShow() {
    this.definirLabels();
  }

  definirLabels() {
    this.labelReserva = 'Reserva';
    this.labelFornecedor = 'Fornecedor';
    this.labelDataInicial = 'Data Inicial';
    this.labelDataFinal = 'Data Final';
    this.labelHoraInicial = 'Hora Inicial';
    this.labelHoraFinal = 'Data Final';

    if (this.vendaProduto.produto === 'AC') {
      this.labelFornecedor = 'Locadora';
      this.labelDataInicial = 'Data Retirada';
      this.labelDataFinal = 'Data Devolução';
      this.labelHoraInicial = 'Hora Retirada';
      this.labelHoraFinal = 'Data Devolução';
    }

    if (this.vendaProduto.produto === 'VI') {
      this.labelReserva = 'DS-160';
    }

    if (this.vendaProduto.produto === 'SV') {
      this.labelFornecedor = 'Seguradora';
      this.labelReserva = 'Plano';
    }

    this.labelCabecalho = this.defineCabecalho();
  }

  defineCabecalho() {
    return this.vendaService.descricaoProduto(this.vendaProduto.produto);
  }

  carregarFornecedor() {
    return this.pessoaService.listarTodas()
    .then(fornecedores => {
      this.fornecedores = fornecedores.map(f => ({ label: f.nome, value: f.codigo }));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarRepresentante() {
    return this.pessoaService.listarTodas()
    .then(representantes => {
      this.representantes = representantes.map(r => ({ label: r.nome, value: r.codigo }));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  aoSalvarPassageiro() {
    this.vendaService.eventPassageiroValores(this.vendaProduto);
  }

  confirmarVendaProduto(frm: FormControl) {
    this.emiterConfirmarProduto.emit();
    frm.reset(frm.value);
  }

  ngOnChanges() {
    this.exibindoFormularioVendaProduto = true;
  }

}
