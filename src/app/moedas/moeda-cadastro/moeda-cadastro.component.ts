import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { MessageService } from 'primeng/api';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { Moeda } from 'app/core/model';
import { MoedaService } from '../moeda.service';

@Component({
  selector: 'app-moeda-cadastro',
  templateUrl: './moeda-cadastro.component.html',
  styleUrls: ['./moeda-cadastro.component.css']
})
export class MoedaCadastroComponent implements OnInit {

  moeda = new Moeda();

  constructor(
    private moedaService: MoedaService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    const codigoMoeda = this.route.snapshot.params['codigo'];

    this.title.setTitle('Nova Moeda');

    if (codigoMoeda) {
      this.carregarMoeda(codigoMoeda);
    }
  }

  get editando() {
    return Boolean(this.moeda.codigo);
  }

  carregarMoeda(codigo: number) {
    this.moedaService.buscarPorCodigo(codigo)
      .then(moeda => {
        this.moeda = moeda;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarMoeda(form)
    } else {
      this.adicionarMoeda(form);
    }
  }

  adicionarMoeda(form: FormControl) {
    this.moedaService.adicionar(this.moeda)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Moeda adicionada com sucesso!'});

        form.reset();
        this.moeda = new Moeda();
      })
      .catch(erro => {this.errorHandler.handle(erro)});
  }

  atualizarMoeda(form: FormControl) {
    this.moedaService.atualizar(this.moeda)
      .then(moeda => {
        this.moeda = moeda;

        this.messageService.add({ severity: 'success', detail: 'Moeda alterada com sucesso!'});
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl) {
    this.moeda = new Moeda();
    form.reset(this.moeda);

    this.router.navigate(['/moedas/nova'])
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de moeda: ${this.moeda.nome}`);
  }

}
