import { VendaService } from 'app/vendas/venda.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';

import { MenuItem } from 'primeng/api';

import { VendaFormaPagamento, VendaProduto } from './../../core/model';

@Component({
  selector: 'app-venda-cadastro-pagamento',
  templateUrl: './venda-cadastro-pagamento.component.html',
  styleUrls: ['./venda-cadastro-pagamento.component.css']
})
export class VendaCadastroPagamentoComponent implements OnInit, OnChanges, OnDestroy {

  @Input() vendaFormaPagamentos: Array<VendaFormaPagamento>;
  @Input() vendaProdutos: Array<VendaProduto>;

  vendaFormaPagamento: VendaFormaPagamento;

  exibindoFormularioVendaFormaPagamento = false;
  vendaFormaPagamentoIndex: number;

  items: MenuItem[];

  produtos: MenuItem[];

  totalSaldo = 0;
  totalValorTotal = 0;

  formHeader: any;

  private subscription;

  constructor(
    private vendaService: VendaService
  ) { }

  ngOnInit() {
    this.carregarFormaPagamento();
    this.carregarProdutosVendaProduto();

    this.subscription = this.vendaService.emitirCalcularFormaPagamentoSaldo.subscribe( () => {
        this.calcularTotais()
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  carregarFormaPagamento() {
    this.items = [
      {label: 'Cartão de Crédito Fornecedor', command: () => {
        this.cartaoCreditoFornecedor();
      }},
      {label: 'Depósito em Conta', command: () => {
        this.depositoConta();
      }},
      {label: 'Dinheiro', command: () => {
        this.dinehiro();
      }}
    ];
  }

  carregarProdutosVendaProduto() {
    this.produtos = this.vendaProdutos.map(v => ({
      label: this.descricaoProduto(v.produto),
      value: v.produto
    }));
  }

  descricaoPagamento(formaPagamento) {
    if (formaPagamento === 'CCF') {
      return 'Cartão de Crédito Fornecedor';
    }
    if (formaPagamento === 'DIN') {
      return 'Dinheiro';
    }
    if (formaPagamento === 'DPC') {
      return 'Depósito em Conta';
    }
    return '';
  }

  descricaoProduto(produto: string) {
    return this.vendaService.descricaoProduto(produto);
  }

  prepararNovaVendaPagamento() {
    this.exibindoFormularioVendaFormaPagamento = true;
    this.vendaFormaPagamento = new VendaFormaPagamento();
    this.vendaFormaPagamentoIndex = this.vendaFormaPagamentos.length;
  }

  prepararEdicaoVendaPagamento(vendaFormaPagamento: VendaFormaPagamento, index: number) {
    this.vendaFormaPagamento = this.clonarVendaFormaPagamento(vendaFormaPagamento);
    this.formHeader = this.descricaoPagamento(this.vendaFormaPagamento.formaPagamento);
    this.exibindoFormularioVendaFormaPagamento = true;
    this.vendaFormaPagamentoIndex = index;
  }

  clonarVendaFormaPagamento(vendaFormaPagamento: VendaFormaPagamento) {
    return new VendaFormaPagamento(vendaFormaPagamento.codigo,
      vendaFormaPagamento.formaPagamento, vendaFormaPagamento.parcelas,
      vendaFormaPagamento.autorizacao, vendaFormaPagamento.numero,
      vendaFormaPagamento.data, vendaFormaPagamento.banco, vendaFormaPagamento.agencia,
      vendaFormaPagamento.contaCorrente, vendaFormaPagamento.valorTotal,
      vendaFormaPagamento.vendaFormaPagamentoProduto);
  }

  confirmarVendaFormaPagamento(frm: FormControl) {
    this.vendaFormaPagamentos[this.vendaFormaPagamentoIndex] =
      this.clonarVendaFormaPagamento(this.vendaFormaPagamento);
    this.exibindoFormularioVendaFormaPagamento = false;
    this.calclularTotaisPorPagamento();
    this.calcularTotais();
    this.calcularSaldoProdutos();
    frm.reset(frm.value);
  }

  removerVendaPagamento(index: number) {
    this.vendaFormaPagamentos.splice(index, 1);
    this.calclularTotaisPorPagamento();
    this.calcularTotais();
    this.calcularSaldoProdutos();
  }

  cartaoCreditoFornecedor() {
    this.novaVendaPagamento('CCF');
  }

  depositoConta() {
    this.novaVendaPagamento('DPC');
  }

  dinehiro() {
    this.novaVendaPagamento('DIN');
  }

  novaVendaPagamento(tipo) {
    this.prepararNovaVendaPagamento();
    this.vendaFormaPagamento.formaPagamento = tipo;
    this.formHeader = this.descricaoPagamento(tipo);
  }

  calclularTotaisPorPagamento() {
    for (const formaPagamento of this.vendaFormaPagamentos) {
      formaPagamento.valorTotal = 0;
      for ( const formaPagamentoProduto of formaPagamento.vendaFormaPagamentoProduto) {
        formaPagamento.valorTotal += formaPagamentoProduto.valor;
      }
    }
  }

  calcularTotais() {
    this.totalSaldo = 0;
    this.totalValorTotal = 0;

    for (let index = 0; index < this.vendaFormaPagamentos.length; index++) {
      this.totalValorTotal  += this.vendaFormaPagamentos[index].valorTotal;
    }

    for (const vendaProduto of this.vendaProdutos) {
      this.totalSaldo += vendaProduto.valoresVendaProduto.valorTotalBrl;
    }

    this.totalSaldo =
      (this.totalSaldo > 0 ? this.totalSaldo - this.totalValorTotal : this.totalValorTotal);
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
            vendaProduto.valoresVendaProduto.saldoBrl -= vendaFormaPagamentoProduto.valor;
          }
        }

      }
    }
  }

  ngOnChanges() {
    this.calcularTotais();
  }
}
