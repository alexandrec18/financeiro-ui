import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';

import { Moeda } from './../../core/model';
import { VendaService } from 'app/vendas/venda.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { MoedaService } from './../../moedas/moeda.service';
import { ValoresVendaProduto } from 'app/core/model';

@Component({
  selector: 'app-venda-cadastro-produto-valores',
  templateUrl: './venda-cadastro-produto-valores.component.html',
  styleUrls: ['./venda-cadastro-produto-valores.component.css']
})
export class VendaCadastroProdutoValoresComponent implements OnInit, OnDestroy {

  @Input() valores: ValoresVendaProduto;
  moedas: [];
  collapsed = true;
  private subscription;

  constructor(
    private moedaService: MoedaService,
    private errorHandler: ErrorHandlerService,
    private vendaService: VendaService
  ) { }

  ngOnInit() {
    this.carregarMoeda();
    this.subscription = this.vendaService.emitirPassageiroValores.subscribe(
      valoresPassageiros => {
        this.calcularTotais(valoresPassageiros),
        this.atualizarMoeda(valoresPassageiros),
        this.calcularValorTotalAbatimentos(),
        this.calcularValorTotalTaxaServDestac(),
        this.calcularValorTotalDesconto()
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  carregarMoeda() {
    this.moedaService.listarTodas()
    .then(moedas => {
      this.moedas = moedas.map(a => ({label: a.sigla, value: a.codigo})),
      this.moedaDefault(moedas)
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  moedaDefault(moedas: Moeda[]) {
    for (const moeda of moedas) {
      if (moeda.sigla === 'BRL' && this.valores.codigoMoeda.codigo === undefined) {
        this.valores.codigoMoeda.codigo = moeda.codigo;
        break;
      }
    }
  }

  carregarMoedaPassageiro(codigo) {
    this.moedaService.listarTodas()
    .then(moedas => {
      this.moedas = moedas.map(a => ({label: a.sigla, value: a.codigo})),
      this.valores.codigoMoeda.codigo = codigo;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  calcularTotais(valoresPassageiros) {
    this.valores.valorTotal = 0;
    this.valores.valorTotalBrl = 0;
    this.valores.totalProduto = 0;
    this.valores.totalProdutoBrl = 0;
    this.valores.valorTotalOriginal = 0;
    this.valores.valorTotalOriginalBrl = 0;

    for (let i = 0; i < valoresPassageiros.vendaProdutoPassageiro.length; i++) {
      this.valores.valorTotal    += valoresPassageiros.vendaProdutoPassageiro[i].valorTotal;
      this.valores.valorTotalBrl += valoresPassageiros.vendaProdutoPassageiro[i].valorTotalBrl;

      this.valores.valorTotalOriginal    += valoresPassageiros.vendaProdutoPassageiro[i].valorTotal;
      this.valores.valorTotalOriginalBrl += valoresPassageiros.vendaProdutoPassageiro[i].valorTotalBrl;

      this.valores.totalProduto    += valoresPassageiros.vendaProdutoPassageiro[i].valorProduto;
      this.valores.totalProdutoBrl += valoresPassageiros.vendaProdutoPassageiro[i].valorProdutoBrl;
    }
  }

  atualizarMoeda(valoresPassageiros) {
    for (let i = 0; i < valoresPassageiros.vendaProdutoPassageiro.length; i++) {
      this.valores.cambioValor = valoresPassageiros.vendaProdutoPassageiro[i].cambioValor;
      this.carregarMoedaPassageiro(
        valoresPassageiros.vendaProdutoPassageiro[i].moedaOrigem.codigo);
      break;
    }
  }

  calcularValorComissao() {
    if (this.valores) {
      this.valores.comissaoValor = 0;
      if (this.valores.comissaoPorcentagem > 0) {
        this.valores.comissaoValor =
          ((this.valores.totalProdutoBrl * this.valores.comissaoPorcentagem) / 100);
      }
    }
  }

  calcularPorcentagemComissao() {
    if (this.valores) {
      this.valores.comissaoPorcentagem = 0;
      if (this.valores.comissaoValor > 0) {
        this.valores.comissaoPorcentagem =
          ((this.valores.comissaoValor / this.valores.totalProdutoBrl ) * 100);
      }
    }
  }

  calcularValorOver() {
    if (this.valores) {
      this.valores.overValor = 0;
      if (this.valores.overPorcentagem > 0) {
        let valor;

        valor = ((this.valores.totalProdutoBrl * this.valores.overSobre) / 100);
        this.valores.overValor = ((valor * this.valores.overPorcentagem) / 100);
      }
    }
  }

  calcularPorcentagemOver() {
    if (this.valores) {
      this.valores.overPorcentagem = 0;
      if (this.valores.overValor > 0) {
        let valor;

        valor = ((this.valores.totalProdutoBrl * this.valores.overSobre) / 100);
        this.valores.overPorcentagem  = ((this.valores.overValor / valor) * 100);
      }
    }
  }

  calcularValorTotalAbatimentos() {
    this.valorTotalComTodosOsAcrescimosEDebitos();
  }

  calcularValorTotalTaxaServDestac() {
    this.valorTotalComTodosOsAcrescimosEDebitos();
  }

  calcularValorTotalDesconto() {
    this.valorTotalComTodosOsAcrescimosEDebitos();
  }

  valorTotalComTodosOsAcrescimosEDebitos() {
    if (this.valores) {
      this.valores.valorTotal = this.valores.valorTotalOriginal;
      this.valores.valorTotalBrl = this.valores.valorTotalOriginalBrl;

      if (this.valores.operadoraAbatimentos > 0) {
        this.valores.valorTotal =
          (this.valores.valorTotal -
            (this.valores.operadoraAbatimentos / this.valores.cambioValor));

        this.valores.valorTotalBrl =
          (this.valores.valorTotalBrl - this.valores.operadoraAbatimentos);
      }

      if (this.valores.agenciaTaxaServDestac > 0) {
        this.valores.valorTotal =
          (this.valores.valorTotal + (this.valores.agenciaTaxaServDestac / this.valores.cambioValor));

        this.valores.valorTotalBrl =
          (this.valores.valorTotalBrl + this.valores.agenciaTaxaServDestac);
      }

      if (this.valores.agenciaDesconto > 0) {
        this.valores.valorTotal =
          (this.valores.valorTotal - (this.valores.agenciaDesconto / this.valores.cambioValor));

        this.valores.valorTotalBrl =
          (this.valores.valorTotalBrl - this.valores.agenciaDesconto);
      }
    }
  }
}
