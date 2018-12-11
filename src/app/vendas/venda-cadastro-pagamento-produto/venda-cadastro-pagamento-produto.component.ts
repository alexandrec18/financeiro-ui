import { FormControl } from '@angular/forms';
import { VendaFormaPagamentoProduto } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-venda-cadastro-pagamento-produto',
  templateUrl: './venda-cadastro-pagamento-produto.component.html',
  styleUrls: ['./venda-cadastro-pagamento-produto.component.css']
})
export class VendaCadastroPagamentoProdutoComponent implements OnInit {

  @Input() vendaFormaPagamentoProdutos: Array<VendaFormaPagamentoProduto>;
  @Input() produtos: MenuItem[];

  vendaFormaPagamentoProduto: VendaFormaPagamentoProduto;

  exibindoFormularioVendaFormaPagamentoProduto = false;
  vendaFormaPagamentoProdutoIndex: number;

  constructor() { }

  ngOnInit() {
    this.carregarProdutos();
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

  prepararNovoFormaPagamentoProduto() {
    this.exibindoFormularioVendaFormaPagamentoProduto = true;
    this.vendaFormaPagamentoProduto = new VendaFormaPagamentoProduto();
    this.vendaFormaPagamentoProdutoIndex = this.vendaFormaPagamentoProdutos.length;
    console.log(this.vendaFormaPagamentoProduto);
  }

  prepararEdicaoFormaPagamentoProduto(vendaFormaPagamentoProduto: VendaFormaPagamentoProduto, index: number) {
    this.vendaFormaPagamentoProduto = this.clonarFormaPagamentoProduto(vendaFormaPagamentoProduto);
    this.exibindoFormularioVendaFormaPagamentoProduto = true;
    this.vendaFormaPagamentoProdutoIndex = index;
  }

  confirmarFormaPagamentoProduto(frm: FormControl) {
    this.vendaFormaPagamentoProdutos[this.vendaFormaPagamentoProdutoIndex] =
      this.clonarFormaPagamentoProduto(this.vendaFormaPagamentoProduto);
    this.exibindoFormularioVendaFormaPagamentoProduto = false;
    frm.reset(frm.value);
    console.log(this.vendaFormaPagamentoProduto);
  }

  removerFormaPagamentoProduto(index: number) {
    this.vendaFormaPagamentoProdutos.splice(index, 1);
  }

  clonarFormaPagamentoProduto(vendaFormaPagamentoProduto: VendaFormaPagamentoProduto) {
    return new VendaFormaPagamentoProduto(vendaFormaPagamentoProduto.codigo,
      vendaFormaPagamentoProduto.produto, vendaFormaPagamentoProduto.valor);
  }

  get editando() {
    return this.vendaFormaPagamentoProduto && this.vendaFormaPagamentoProduto.codigo
  }

  carregarProdutos() {
    console.log(this.produtos);
  }
}
