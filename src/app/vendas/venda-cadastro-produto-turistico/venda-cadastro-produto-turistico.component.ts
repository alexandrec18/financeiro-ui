import { FormControl } from '@angular/forms';
import { TransporteService } from './../../transportes/transporte.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { VendaProduto } from 'app/core/model';
import { PessoaService } from 'app/pessoas/pessoa.service';
import { VendaService } from '../venda.service';
import { PacoteService } from 'app/pacotes/pacote.service';

@Component({
  selector: 'app-venda-cadastro-produto-turistico',
  templateUrl: './venda-cadastro-produto-turistico.component.html',
  styleUrls: ['./venda-cadastro-produto-turistico.component.css']
})
export class VendaCadastroProdutoTuristicoComponent implements OnInit, OnChanges {

  @Input() vendaProduto: VendaProduto;

  @Output() emiterConfirmarProduto = new EventEmitter();

  exibindoFormularioVendaProduto = true;

  fornecedores: [];
  representantes: [];
  pacotes: [];
  transportes: [];

  destinos = [
    { label: 'Internacional', value: 'I' },
    { label: 'Nacional', value: 'N' }
  ];

  constructor(
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private vendaService: VendaService,
    private pacoteService: PacoteService,
    private transporteService: TransporteService
  ) { }

  ngOnInit() {
    this.carregarFornecedor();
    this.carregarRepresentante();
    this.carregarPacote();
    this.carregarTransporte();
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

  carregarPacote() {
    return this.pacoteService.listarTodas()
    .then(pacotes => {
      this.pacotes = pacotes.map(p => ({ label: p.nome, value: p.codigo }));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarTransporte() {
    return this.transporteService.listarTodas()
    .then(transportes => {
      this.transportes = transportes.map(t => ({ label: t.nome, value: t.codigo }));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  aoSalvarPassageiro() {
    this.vendaService.eventPassageiroValores(this.vendaProduto);
    console.log(this.vendaProduto);
  }

  confirmarVendaProduto(frm: FormControl) {
    console.log(this.vendaProduto);
    this.emiterConfirmarProduto.emit('PT');
    frm.reset(frm.value);
  }

  ngOnChanges() {
    this.exibindoFormularioVendaProduto = true;
  }
}
