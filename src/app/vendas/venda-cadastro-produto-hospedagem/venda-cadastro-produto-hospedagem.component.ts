import { FormControl } from '@angular/forms';
import { TipoAcomodacaoService } from './../../tipo-acomodacoes/tipo-acomodacao.service';
import { AcomodacaoService } from './../../acomodacoes/acomodacao.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { VendaProduto } from 'app/core/model';
import { PessoaService } from 'app/pessoas/pessoa.service';
import { VendaService } from '../venda.service';
import { RegimeService } from 'app/regime/regime.service';

@Component({
  selector: 'app-venda-cadastro-produto-hospedagem',
  templateUrl: './venda-cadastro-produto-hospedagem.component.html',
  styleUrls: ['./venda-cadastro-produto-hospedagem.component.css']
})
export class VendaCadastroProdutoHospedagemComponent implements OnInit, OnChanges {

  @Input() vendaProduto: VendaProduto;

  @Output() emiterConfirmarProduto = new EventEmitter();

  exibindoFormularioVendaProduto = true;

  fornecedores: [];
  representantes: [];
  acomodacoes: [];
  tipoAcomodacoes: [];
  regimes: [];

  constructor(
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private vendaService: VendaService,
    private acomodacaoService: AcomodacaoService,
    private tipoAcomodacaoService: TipoAcomodacaoService,
    private regimeService: RegimeService
  ) { }

  ngOnInit() {
    this.carregarFornecedor();
    this.carregarRepresentante();
    this.carregarAcomodacao();
    this.carregarTipoAcomodacao();
    this.carregarRegime();
  }

  get editando() {
    return this.vendaProduto && this.vendaProduto.codigo
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

  carregarAcomodacao() {
    return this.acomodacaoService.listarTodas()
    .then(acomodacoes => {
      this.acomodacoes = acomodacoes.map(r => ({ label: r.nome, value: r.codigo }));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarTipoAcomodacao() {
    return this.tipoAcomodacaoService.listarTodas()
    .then(tipoAcomodacoes => {
      this.tipoAcomodacoes = tipoAcomodacoes.map(r => ({ label: r.nome, value: r.codigo }));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarRegime() {
    return this.regimeService.listarTodas()
    .then(regimes => {
      this.regimes = regimes.map(r => ({ label: r.nome, value: r.codigo }));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  aoSalvarPassageiro() {
    this.vendaService.eventPassageiroValores(this.vendaProduto);
    console.log(this.vendaProduto);
  }

  confirmarVendaProduto(frm: FormControl) {
    console.log(this.vendaProduto);
    this.emiterConfirmarProduto.emit('DH');
    frm.reset(frm.value);
  }

  ngOnChanges() {
    this.exibindoFormularioVendaProduto = true;
  }
}
