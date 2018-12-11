import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { MessageService } from 'primeng/api';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { Pacote } from 'app/core/model';
import { PacoteService } from '../pacote.service';

@Component({
  selector: 'app-pacote-cadastro',
  templateUrl: './pacote-cadastro.component.html',
  styleUrls: ['./pacote-cadastro.component.css']
})
export class PacoteCadastroComponent implements OnInit {

  pacote = new Pacote();

  constructor(
    private pacoteService: PacoteService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    const codigoPacote = this.route.snapshot.params['codigo'];

    this.title.setTitle('Novo Pacote');

    if (codigoPacote) {
      this.carregarPacote(codigoPacote);
    }
  }

  get editando() {
    return Boolean(this.pacote.codigo);
  }

  carregarPacote(codigo: number) {
    this.pacoteService.buscarPorCodigo(codigo)
      .then(pacote => {
        this.pacote = pacote;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarPacote(form)
    } else {
      this.adicionarPacote(form);
    }
  }

  adicionarPacote(form: FormControl) {
    this.pacoteService.adicionar(this.pacote)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Pacote adicionado com sucesso!'});

        form.reset();
        this.pacote = new Pacote();
      })
      .catch(erro => {this.errorHandler.handle(erro)});
  }

  atualizarPacote(form: FormControl) {
    this.pacoteService.atualizar(this.pacote)
      .then(pacote => {
        this.pacote = pacote;

        this.messageService.add({ severity: 'success', detail: 'Pacote alterado com sucesso!'});
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl) {
    this.pacote = new Pacote();
    form.reset(this.pacote);

    this.router.navigate(['/pacotes/novo'])
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de pacote: ${this.pacote.nome}`);
  }


}
