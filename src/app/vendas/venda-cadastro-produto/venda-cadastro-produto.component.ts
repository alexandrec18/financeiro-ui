import { VendaService } from './../venda.service';
import { Component, OnInit, Input, AfterViewInit, OnChanges } from '@angular/core';

import { MenuItem } from 'primeng/api';

import { VendaProduto, Aeroporto, VendaFormaPagamento } from './../../core/model';

@Component({
  selector: 'app-venda-cadastro-produto',
  templateUrl: './venda-cadastro-produto.component.html',
  styleUrls: ['./venda-cadastro-produto.component.css']
})
export class VendaCadastroProdutoComponent implements OnInit, OnChanges {

  @Input() vendaProdutos: Array<VendaProduto>;
  @Input() vendaFormaPagamentos: Array<VendaFormaPagamento>;

  vendaProduto: VendaProduto;
  exibindoFormularioVendaProduto = false;
  vendaProdutoIndex: number;

  items: MenuItem[];

  exibirDiariaHospedagem = false;
  exibirPassagemAerea = false;
  exibirPacoteTuristico = false;

  valorTotalGeral: number;

  constructor( private vendaService: VendaService ) { }

  ngOnInit() {
    this.items = [
      {label: 'Diária de Hospedagem', command: () => {
        this.diariaHospedagem();
      }},
      {label: 'Passagem Aérea', command: () => {
        this.passagemAerea();
      }},
      {label: 'Pacote Turistico', command: () => {
        this.pacoteTuristico();
      }}
    ];
  }

  ngOnChanges() {
    this.calcularValorTotalProdutos();
  }

  descricaoProduto(produto) {
    if (produto === 'PA') {
      return 'Passagem Aérea';
    }
    if (produto === 'DH') {
      return 'Diárias de Hospedagem';
    }
    if (produto === 'PT') {
      return 'Pacote Turístico';
    }
    return '';
  }

  prepararNovoVendaProduto() {
    this.exibindoFormularioVendaProduto = true;
    this.vendaProduto = new VendaProduto();
    this.iniciaValoresProduto();
    this.vendaProdutoIndex = this.vendaProdutos.length;
  }

  prepararEdicaoVendaProduto(vendaProduto: VendaProduto, index: number) {
    this.vendaProduto = this.clonarVendaProduto(vendaProduto);
    this.iniciarVerificacoes();
    this.exibindoFormularioVendaProduto = true;
    this.exibirFormularioProdutos();
    this.vendaProdutoIndex = index;
  }

  confirmarVendaProduto() {
    this.vendaProdutos[this.vendaProdutoIndex] = this.clonarVendaProduto(this.vendaProduto);
    this.calcularSaldoProdutos();
    this.calcularValorTotalProdutos();
    this.exibindoFormularioVendaProduto = false;
  }

  removerVendaProduto(index: number) {
    this.vendaProdutos.splice(index, 1);
  }

  clonarVendaProduto(vendaProduto: VendaProduto) {
    return new VendaProduto(vendaProduto.codigo,
      vendaProduto.produto, vendaProduto.fornecedor, vendaProduto.representante,
      vendaProduto.dataInicio, vendaProduto.horaInicio,
      vendaProduto.dataFim, vendaProduto.horaFim, vendaProduto.acomodacao,
      vendaProduto.tipoAcomodacao, vendaProduto.regime, vendaProduto.pacote,
      vendaProduto.transporte, vendaProduto.servicosInclusos, vendaProduto.documento,
      vendaProduto.destino, vendaProduto.vendaProdutoPassageiro, vendaProduto.vendaProdutoTrecho,
      vendaProduto.valoresVendaProduto, vendaProduto.numeroNf, vendaProduto.numeroExterno,
      vendaProduto.reciboOperadora, vendaProduto.observacao);
  }

  get editando() {
    return this.vendaProduto && this.vendaProduto.codigo
  }

  diariaHospedagem() {
    this.prepararNovoVendaProduto();
    this.vendaProduto.produto = 'DH';
    this.desabilitandoProdutos();
    this.exibirDiariaHospedagem = true;
  }

  passagemAerea() {
    this.prepararNovoVendaProduto();
    this.vendaProduto.produto = 'PA';
    this.desabilitandoProdutos();
    this.exibirPassagemAerea = true;
  }

  pacoteTuristico() {
    this.prepararNovoVendaProduto();
    this.vendaProduto.produto = 'PT';
    this.desabilitandoProdutos();
    this.exibirPacoteTuristico = true;
  }

  aoConfirmarProduto(produto) {
    this.confirmarVendaProduto();
    this.vendaService.eventCalcularFormaPagamentoSaldo();
    this.desabilitandoProdutos();
  }

  desabilitandoProdutos() {
    this.exibirPassagemAerea = false;
    this.exibirPacoteTuristico = false;
    this.exibirDiariaHospedagem = false;
  }

  exibirFormularioProdutos() {
    this.exibirPassagemAerea = (this.vendaProduto.produto === 'PA');
    this.exibirPacoteTuristico = (this.vendaProduto.produto === 'PT');
    this.exibirDiariaHospedagem = (this.vendaProduto.produto === 'DH');
  }

  calcularSaldoProdutos() {
    for (const vendaProduto of this.vendaProdutos) {
      vendaProduto.valoresVendaProduto.saldo = vendaProduto.valoresVendaProduto.valorTotal;
      vendaProduto.valoresVendaProduto.saldoBrl = vendaProduto.valoresVendaProduto.valorTotalBrl;
    }

    for (const vendaFormaPagamento of this.vendaFormaPagamentos) {
      for (const vendaFormaPagamentoProduto of vendaFormaPagamento.vendaFormaPagamentoProduto) {

        for (const vendaProduto of this.vendaProdutos) {
          if (vendaProduto.produto === vendaFormaPagamentoProduto.produto) {
            vendaProduto.valoresVendaProduto.saldo -= vendaFormaPagamentoProduto.valor / vendaProduto.valoresVendaProduto.cambioValor;
            vendaProduto.valoresVendaProduto.saldoBrl -= vendaFormaPagamentoProduto.valor;
          }
        }

      }
    }
  }

  calcularValorTotalProdutos() {
    this.valorTotalGeral = 0;
    for (const produto of this.vendaProdutos) {
      this.valorTotalGeral += produto.valoresVendaProduto.valorTotalBrl;
    }
  }

  iniciarVerificacoes() {
    for (const vendaProdutoTrecho of this.vendaProduto.vendaProdutoTrecho) {

      if (vendaProdutoTrecho.aeroportoOrigem === null) {
        vendaProdutoTrecho.aeroportoOrigem = new Aeroporto(); }

      if (vendaProdutoTrecho.aeroportoDestino === null) {
        vendaProdutoTrecho.aeroportoDestino = new Aeroporto(); }

    }
  }

  iniciaValoresProduto() {
    this.vendaProduto.valoresVendaProduto.comissaoPorcentagem = 0;
    this.vendaProduto.valoresVendaProduto.comissaoValor = 0;
    this.vendaProduto.valoresVendaProduto.overPorcentagem = 0;
    this.vendaProduto.valoresVendaProduto.overSobre = 100;
    this.vendaProduto.valoresVendaProduto.overValor = 0;
    this.vendaProduto.valoresVendaProduto.cambioValor = 1;
    this.vendaProduto.valoresVendaProduto.operadoraAbatimentos = 0;
    this.vendaProduto.valoresVendaProduto.operadoraTaxaCcRav = 0;
    this.vendaProduto.valoresVendaProduto.agenciaTaxaServDestac = 0;
    this.vendaProduto.valoresVendaProduto.agenciaDesconto = 0;
    this.vendaProduto.valoresVendaProduto.valorTotal = 0;
    this.vendaProduto.valoresVendaProduto.valorTotalBrl = 0;
  }
}
