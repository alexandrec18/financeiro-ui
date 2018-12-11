import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { MessageService } from 'primeng/api';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { AcomodacaoService } from './../acomodacao.service';
import { Acomodacao } from './../../core/model';

@Component({
  selector: 'app-acomodacao-cadastro',
  templateUrl: './acomodacao-cadastro.component.html',
  styleUrls: ['./acomodacao-cadastro.component.css']
})
export class AcomodacaoCadastroComponent implements OnInit {

  acomodacao = new Acomodacao();

  constructor(
    private acomodacaoService: AcomodacaoService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    const codigoAcomodacao = this.route.snapshot.params['codigo'];

    this.title.setTitle('Nova Acomodação');

    if (codigoAcomodacao) {
      this.carregarAcomodacao(codigoAcomodacao);
    }
  }

  get editando() {
    return Boolean(this.acomodacao.codigo);
  }

  carregarAcomodacao(codigo: number) {
    this.acomodacaoService.buscarPorCodigo(codigo)
      .then(acomodacao => {
        this.acomodacao = acomodacao;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarAcomodacao(form)
    } else {
      this.adicionarAcomodacao(form);
    }
  }

  adicionarAcomodacao(form: FormControl) {
    this.acomodacaoService.adicionar(this.acomodacao)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Acomodação adicionada com sucesso!'});

        form.reset();
        this.acomodacao = new Acomodacao();
      })
      .catch(erro => {this.errorHandler.handle(erro)});
  }

  atualizarAcomodacao(form: FormControl) {
    this.acomodacaoService.atualizar(this.acomodacao)
      .then(acomodacao => {
        this.acomodacao = acomodacao;

        this.messageService.add({ severity: 'success', detail: 'Acomodação alterada com sucesso!'});
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl) {
    this.acomodacao = new Acomodacao();
    form.reset(this.acomodacao);

    this.router.navigate(['/acomodacoes/nova'])
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de acomodacao: ${this.acomodacao.nome}`);
  }

}
