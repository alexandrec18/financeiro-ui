import { FormControl } from '@angular/forms';
import { VendaService } from './../venda.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { PessoaService } from './../../pessoas/pessoa.service';
import { Component, OnInit, Input, OnDestroy, OnChanges, EventEmitter, Output } from '@angular/core';
import { VendaProduto } from 'app/core/model';

@Component({
  selector: 'app-venda-cadastro-produto-aerea',
  templateUrl: './venda-cadastro-produto-aerea.component.html',
  styleUrls: ['./venda-cadastro-produto-aerea.component.css']
})
export class VendaCadastroProdutoAereaComponent implements OnInit, OnChanges {

  @Input() vendaProduto: VendaProduto;

  @Output() emiterConfirmarProduto = new EventEmitter();

  exibindoFormularioVendaProduto = true;

  destinos = [
    { label: 'Internacional', value: 'I'  },
    { label: 'Nacional', value: 'N' }
  ];

  fornecedores: [];
  representantes: [];

  constructor(
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private vendaService: VendaService
  ) { }

  ngOnInit() {
    this.carregarFornecedor();
    this.carregarRepresentante();
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

  ngOnChanges() {
    this.exibindoFormularioVendaProduto = true;
  }

  aoSalvarPassageiro() {
    this.vendaService.eventPassageiroValores(this.vendaProduto);
    console.log(this.vendaProduto);
  }

  confirmarVendaProduto(frm: FormControl) {
    console.log(this.vendaProduto);
    this.informarPeriodo();
    this.emiterConfirmarProduto.emit('PA');
    frm.reset(frm.value);
  }

  informarPeriodo() {
    if (this.vendaProduto.dataInicio === undefined) { this.vendaProduto.dataInicio = new Date() }
    if (this.vendaProduto.dataFim === undefined) { this.vendaProduto.dataFim = new Date() }
  }
}
