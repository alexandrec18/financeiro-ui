import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { MessageService } from 'primeng/api';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { Regime } from 'app/core/model';
import { RegimeService } from '../regime.service';

@Component({
  selector: 'app-regime-cadastro',
  templateUrl: './regime-cadastro.component.html',
  styleUrls: ['./regime-cadastro.component.css']
})
export class RegimeCadastroComponent implements OnInit {

  regime = new Regime();

  constructor(
    private regimeService: RegimeService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    const codigoRegime = this.route.snapshot.params['codigo'];

    this.title.setTitle('Novo Regime');

    if (codigoRegime) {
      this.carregarRegime(codigoRegime);
    }
  }

  get editando() {
    return Boolean(this.regime.codigo);
  }

  carregarRegime(codigo: number) {
    this.regimeService.buscarPorCodigo(codigo)
      .then(regime => {
        this.regime = regime;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarRegime(form)
    } else {
      this.adicionarRegime(form);
    }
  }

  adicionarRegime(form: FormControl) {
    this.regimeService.adicionar(this.regime)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Regime adicionado com sucesso!'});

        form.reset();
        this.regime = new Regime();
      })
      .catch(erro => {this.errorHandler.handle(erro)});
  }

  atualizarRegime(form: FormControl) {
    this.regimeService.atualizar(this.regime)
      .then(regime => {
        this.regime = regime;

        this.messageService.add({ severity: 'success', detail: 'Regime alterado com sucesso!'});
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl) {
    this.regime = new Regime();
    form.reset(this.regime);

    this.router.navigate(['/regimes/novo'])
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de regime: ${this.regime.nome}`);
  }

}
