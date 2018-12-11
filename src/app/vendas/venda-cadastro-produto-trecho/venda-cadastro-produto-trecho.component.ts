import { ErrorHandlerService } from './../../core/error-handler.service';
import { AeroportoService } from './../../aeroportos/aeroporto.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit, Input, AfterViewInit, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';

import { VendaProdutoTrecho } from './../../core/model';

@Component({
  selector: 'app-venda-cadastro-produto-trecho',
  templateUrl: './venda-cadastro-produto-trecho.component.html',
  styleUrls: ['./venda-cadastro-produto-trecho.component.css']
})
export class VendaCadastroProdutoTrechoComponent implements OnInit {

  @Input() trechos: Array<VendaProdutoTrecho>;
  trecho: VendaProdutoTrecho;
  exibindoFormularioTrecho = false;
  trechoIndex: number;

  aeroportoOrigens: [];
  aeroportoDestinos: [];

  constructor(
    private aeroportoService: AeroportoService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.carregarAeroportoOrigem();
    this.carregarAeroportoDestino();
  }

  prepararNovoTrecho() {
    this.exibindoFormularioTrecho = true;
    this.trecho = new VendaProdutoTrecho();
    this.trechoIndex = this.trechos.length;
  }

  prepararEdicaoTrecho(trecho: VendaProdutoTrecho, index: number) {
    this.trecho = this.clonarTrecho(trecho);
    this.exibindoFormularioTrecho = true;
    this.trechoIndex = index;
  }

  confirmarTrecho(frm: FormControl) {
    this.trechos[this.trechoIndex] = this.clonarTrecho(this.trecho);
    this.exibindoFormularioTrecho = false;
    frm.reset(frm.value);
  }

  removerTrecho(index: number) {
    this.trechos.splice(index, 1);
  }

  clonarTrecho(trecho: VendaProdutoTrecho) {
    return new VendaProdutoTrecho(trecho.codigo,
      trecho.ciaAerea, trecho.voo, trecho.classe,
      trecho.aeroportoOrigem, trecho.dataSaida, trecho.horaSaida,
      trecho.aeroportoDestino, trecho.dataChegada, trecho.horaChegada);
  }

  get editando() {
    return this.trecho && this.trecho.codigo
  }

  carregarAeroportoOrigem() {
    this.aeroportoService.listarTodas()
    .then(aeroportoOrigens => {
      this.aeroportoOrigens = aeroportoOrigens.map(a => ({
        label: a.iata + ' - ' + a.nome + ' - ' + a.cidade + ',' + a.pais,
        value: a.codigo}))
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarAeroportoDestino() {
    this.aeroportoService.listarTodas()
    .then(aeroportoDestinos => {
      this.aeroportoDestinos = aeroportoDestinos.map(a => ({
        label: a.iata + ' - ' + a.nome + ' - ' + a.cidade + ',' + a.pais,
        value: a.codigo}))
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

}
