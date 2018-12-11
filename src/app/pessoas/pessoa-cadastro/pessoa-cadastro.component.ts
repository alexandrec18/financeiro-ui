import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/components/common/messageservice';

import { Pessoa} from './../../core/model';
import { PessoaService } from '../pessoa.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { formatDate } from '@angular/common';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();
  estados: any[];
  cidades: any[];
  estadoSelecionado: number;
  tipoPessoa: string;
  resetForm = false;

  constructor(
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    const codigoPessoa = this.route.snapshot.params['codigo'];
    const tipoPessoa   = this.route.snapshot.params['tipo'];

    this.title.setTitle('Nova pessoa');

    this.carregarEstados();

    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
    }

    if (tipoPessoa) {
      this.tipoPessoa = tipoPessoa;
    }
  }

  getItems(form: FormControl): MenuItem[] {
    return [
      {label: 'Física', command: () => {
        this.pessoa = new Pessoa();
        this.tipoPessoa = 'F';
        form.reset(this.pessoa);
        this.router.navigate(['/pessoas/nova', 'F'])
      }},
      {label: 'Jurídica',  command: () => {
        this.pessoa = new Pessoa();
        this.tipoPessoa = 'J';
        form.reset(this.pessoa);
        this.router.navigate(['/pessoas/nova', 'J'])
      }}
    ];
  }

  pessoaFisica(): boolean {
    return this.tipoPessoa === 'F';
  }

  invalido(form: FormControl): boolean {
    const invalido =
      (this.tipoPessoa === 'F' && (!this.pessoa.fisica.dataNascimento || !this.pessoa.fisica.sexo)) ||
      (this.tipoPessoa === 'J' && (!this.pessoa.juridica.razaoSocial));

    return form.invalid || invalido;
  }

  carregarEstados() {
    this.pessoaService.listarEstados()
      .then(lista => {
        this.estados = lista.map(uf => ({
          label: uf.nome,
          value: uf.codigo
        }))
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCidades() {
    this.pessoaService.pesquisarCidades(this.estadoSelecionado)
      .then(lista => {
        this.cidades = lista.map(c => ({
          label: c.nome,
          value: c.codigo
        }))
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean(this.pessoa.codigo);
  }

  carregarPessoa(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo)
      .then(pessoa => {
        this.pessoa = pessoa;

        this.tipoPessoa = this.pessoa.tipo;

        this.estadoSelecionado = (this.pessoa.endereco.cidade) ?
            this.pessoa.endereco.cidade.estado.codigo : null;

        if (this.estadoSelecionado) {
          this.carregarCidades();
        }

        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarPessoa(form)
    } else {
      this.adicionarPessoa(form);
    }
  }

  adicionarPessoa(form: FormControl) {
    let myDate;
    myDate = new Date();
    myDate = formatDate(myDate, 'yyyy-MM-dd', 'pt-BR');

    this.pessoa.ativo = true;
    this.pessoa.tipo  = this.tipoPessoa;
    this.pessoa.dataCadastro = myDate;

    this.pessoaService.adicionar(this.pessoa)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Pessoa adicionada com sucesso!'});

        this.resetForm = true;
        form.reset();
        this.pessoa = new Pessoa();
      })
      .catch(erro => {this.errorHandler.handle(erro)});
  }

  atualizarPessoa(form: FormControl) {
    this.pessoaService.atualizar(this.pessoa)
      .then(pessoa => {
        this.pessoa = pessoa;

        this.messageService.add({ severity: 'success', detail: 'Pessoa alterada com sucesso!'});
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de pessoa: ${this.pessoa.nome}`);
  }

}
