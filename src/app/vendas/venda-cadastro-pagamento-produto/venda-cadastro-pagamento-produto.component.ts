import { FormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

import { MenuItem } from 'primeng/api';

import { VendaService } from './../venda.service';
import { VendaFormaPagamentoProduto, VendaProduto } from './../../core/model';

@Component({
  selector: 'app-venda-cadastro-pagamento-produto',
  templateUrl: './venda-cadastro-pagamento-produto.component.html',
  styleUrls: ['./venda-cadastro-pagamento-produto.component.css']
})
export class VendaCadastroPagamentoProdutoComponent implements OnInit {

  @Input() vendaFormaPagamentoProdutos: Array<VendaFormaPagamentoProduto>;
  @Input() vendaProdutos: Array<VendaProduto>;

  vendaFormaPagamentoProduto: VendaFormaPagamentoProduto;

  exibindoFormularioVendaFormaPagamentoProduto = false;
  vendaFormaPagamentoProdutoIndex: number;

  produtos: MenuItem[];

  constructor(
    private vendaService: VendaService
  ) { }

  ngOnInit() {
    console.log('teste');
  }

  descricaoProduto(produto: string) {
    return this.vendaService.descricaoProduto(produto);
  }

  prepararNovoFormaPagamentoProduto() {
    this.exibindoFormularioVendaFormaPagamentoProduto = true;
    this.vendaFormaPagamentoProduto = new VendaFormaPagamentoProduto();
    this.vendaFormaPagamentoProdutoIndex = this.vendaFormaPagamentoProdutos.length;
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

  onShow() {
    this.produtos = this.vendaProdutos.map(v => ({
      label: this.descricaoProduto(v.produto),
      value: v.produto
    }));
  }

  onChange(event) {
    for (const vendaProduto of this.vendaProdutos) {
      if (vendaProduto.produto === event.value) {
        this.vendaFormaPagamentoProduto.valor = vendaProduto.valoresVendaProduto.saldoBrl;
        break;
      }
    }

  }
}
