import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { TipoAcomodacao } from 'app/core/model';
import { TipoAcomodacaoService } from '../tipo-acomodacao.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-tipo-acomodacao-cadastro',
  templateUrl: './tipo-acomodacao-cadastro.component.html',
  styleUrls: ['./tipo-acomodacao-cadastro.component.css']
})
export class TipoAcomodacaoCadastroComponent implements OnInit {

  tipoAcomodacao = new TipoAcomodacao();

  constructor(
    private tipoAcomodacaoService: TipoAcomodacaoService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    const codigoTipoAcomodacao = this.route.snapshot.params['codigo'];

    this.title.setTitle('Novo Tipo de Acomodação');

    if (codigoTipoAcomodacao) {
      this.carregarTipoAcomodacao(codigoTipoAcomodacao);
    }
  }

  get editando() {
    return Boolean(this.tipoAcomodacao.codigo);
  }

  carregarTipoAcomodacao(codigo: number) {
    this.tipoAcomodacaoService.buscarPorCodigo(codigo)
      .then(tipoAcomodacao => {
        this.tipoAcomodacao = tipoAcomodacao;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarTipoAcomodacao(form)
    } else {
      this.adicionarTipoAcomodacao(form);
    }
  }

  adicionarTipoAcomodacao(form: FormControl) {
    this.tipoAcomodacaoService.adicionar(this.tipoAcomodacao)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Tipo de Acomodação adicionada com sucesso!'});

        form.reset();
        this.tipoAcomodacao = new TipoAcomodacao();
      })
      .catch(erro => {this.errorHandler.handle(erro)});
  }

  atualizarTipoAcomodacao(form: FormControl) {
    this.tipoAcomodacaoService.atualizar(this.tipoAcomodacao)
      .then(tipoAcomodacao => {
        this.tipoAcomodacao = tipoAcomodacao;

        this.messageService.add({ severity: 'success', detail: 'Tipo de Acomodação alterada com sucesso!'});
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl) {
    this.tipoAcomodacao = new TipoAcomodacao();
    form.reset(this.tipoAcomodacao);

    this.router.navigate(['/tipo-acomodacoes/nova'])
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de tipo de acomodação: ${this.tipoAcomodacao.nome}`);
  }

}
