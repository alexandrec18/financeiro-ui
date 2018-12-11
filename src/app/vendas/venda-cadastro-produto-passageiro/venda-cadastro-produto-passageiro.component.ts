import { FormControl } from '@angular/forms';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { MoedaService } from './../../moedas/moeda.service';
import { PessoaService } from './../../pessoas/pessoa.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { VendaProdutoPassageiro } from 'app/core/model';
import { Dropdown } from 'primeng/dropdown';
import { Dialog } from 'primeng/dialog';

@Component({
  selector: 'app-venda-cadastro-produto-passageiro',
  templateUrl: './venda-cadastro-produto-passageiro.component.html',
  styleUrls: ['./venda-cadastro-produto-passageiro.component.css']
})
export class VendaCadastroProdutoPassageiroComponent implements OnInit {

  @ViewChild('apps') apps: Dropdown;

  @Input() passageiros: Array<VendaProdutoPassageiro>;

  @Output() salvarPassageiro = new EventEmitter();

  passageiro: VendaProdutoPassageiro;
  exibindoFormularioPassageiro = false;
  passageiroIndex: number;

  pessoas: [];
  moedas: [];

  totalValorProduto = 0;
  totalTaxas = 0;
  totalOutrasTaxas = 0;
  totalTaxaRav = 0;
  totalTaxaServicoOculta = 0;

  constructor(
    private pessoaService: PessoaService,
    private moedaService: MoedaService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.carregarMoedas();
    this.carregarPessoas();
    this.calcularTotais();
  }

  onShow() {
    this.apps.applyFocus();
  }

  prepararNovoPassageiro() {
    this.exibindoFormularioPassageiro = true;
    this.passageiro = new VendaProdutoPassageiro();
    this.iniciarValores();
    this.passageiroIndex = this.passageiros.length;
  }

  prepararEdicaoPassageiro(passageiro: VendaProdutoPassageiro, index: number) {
    this.passageiro = this.clonarPassageiro(passageiro);
    this.exibindoFormularioPassageiro = true;
    this.passageiroIndex = index;
  }

  confirmarPassageiro(frm: FormControl) {
    this.replicarValor();
    this.passageiros[this.passageiroIndex] = this.clonarPassageiro(this.passageiro);
    this.calcularTotais();
    this.aoSalvarPassageiro();
    this.exibindoFormularioPassageiro = false;
    frm.reset(frm.value);
  }

  removerPassageiro(index: number) {
    this.passageiros.splice(index, 1);
    this.calcularTotais();
    this.aoSalvarPassageiro();
  }

  clonarPassageiro(passageiro: VendaProdutoPassageiro) {
    return new VendaProdutoPassageiro(passageiro.codigo,
      passageiro.passageiro, passageiro.nomeEmissao, passageiro.moedaOrigem,
      passageiro.cambioValor, passageiro.valorProduto, passageiro.valorProdutoBrl,
      passageiro.taxas, passageiro.taxasBrl, passageiro.outrasTaxas, passageiro.outrasTaxasBrl,
      passageiro.taxaRav, passageiro.taxaRavBrl, passageiro.taxaDu, passageiro.taxaDuBrl,
      passageiro.taxaServicoOculta, passageiro.taxaServicoOcultaBrl,
      passageiro.valorTotal, passageiro.valorTotalBrl,
      passageiro.centroCusto, passageiro.documento);
  }

  get editando() {
    return this.passageiro && this.passageiro.codigo
  }

  carregarPessoas() {
    this.pessoaService.listarTodas()
    .then(pessoas => {
      this.pessoas = pessoas.map(a => ({label: a.nome, value: a.codigo}))
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarMoedas() {
    this.moedaService.listarTodas()
    .then(moedas => {
      this.moedas = moedas.map(a => ({label: a.sigla, value: a.codigo}))
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  iniciarValores() {
    this.passageiro.cambioValor = 1;

    this.passageiro.taxas = 0;
    this.passageiro.taxasBrl = 0;
    this.passageiro.outrasTaxas = 0;
    this.passageiro.outrasTaxasBrl = 0;
    this.passageiro.taxaRav = 0;
    this.passageiro.taxaRavBrl = 0;
    this.passageiro.taxaDu = 0;
    this.passageiro.taxaDuBrl = 0;
    this.passageiro.taxaServicoOculta = 0;
    this.passageiro.taxaServicoOcultaBrl = 0;
    this.passageiro.valorTotal = 0;
    this.passageiro.valorTotalBrl = 0;
  }

  calcularTotais() {
    this.limparVariaveisTotais();
    for (let i = 0; i < this.passageiros.length; i++) {
      this.totalValorProduto      += this.passageiros[i].valorProdutoBrl;
      this.totalTaxas             += this.passageiros[i].taxasBrl;
      this.totalOutrasTaxas       += this.passageiros[i].outrasTaxasBrl;
      this.totalTaxaRav           += this.passageiros[i].taxaRavBrl;
      this.totalTaxaServicoOculta += this.passageiros[i].taxaServicoOcultaBrl;
    }
  }

  replicarValor() {
    this.passageiro.valorProdutoBrl      = (this.passageiro.valorProduto * this.passageiro.cambioValor);
    this.passageiro.taxasBrl             = (this.passageiro.taxas * this.passageiro.cambioValor);
    this.passageiro.outrasTaxasBrl       = (this.passageiro.outrasTaxas * this.passageiro.cambioValor);
    this.passageiro.taxaRavBrl           = (this.passageiro.taxaRav * this.passageiro.cambioValor);
    this.passageiro.taxaServicoOcultaBrl = (this.passageiro.taxaServicoOculta * this.passageiro.cambioValor);

    this.passageiro.valorTotal           = (this.passageiro.valorProduto + this.passageiro.taxas +
                                            this.passageiro.outrasTaxas + this.passageiro.taxaRav +
                                            this.passageiro.taxaServicoOculta);

    this.passageiro.valorTotalBrl        = (this.passageiro.valorTotal * this.passageiro.cambioValor);
  }

  limparVariaveisTotais() {
    this.totalValorProduto = 0;
    this.totalTaxas = 0;
    this.totalOutrasTaxas = 0;
    this.totalTaxaRav = 0;
    this.totalTaxaServicoOculta = 0;
  }

  aoSalvarPassageiro() {
    this.salvarPassageiro.emit();
  };

}
