import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/components/common/messageservice';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriaService } from './../categoria.service';
import { Categoria } from './../../core/model';

@Component({
  selector: 'app-categoria-cadastro',
  templateUrl: './categoria-cadastro.component.html',
  styleUrls: ['./categoria-cadastro.component.css']
})
export class CategoriaCadastroComponent implements OnInit {

  categoria = new Categoria();

  constructor(
    private categoriaService: CategoriaService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    const codigoCategoria = this.route.snapshot.params['codigo'];

    this.title.setTitle('Nova Categoria');

    if (codigoCategoria) {
      this.carregarCategoria(codigoCategoria);
    }
  }

  get editando() {
    return Boolean(this.categoria.codigo);
  }

  carregarCategoria(codigo: number) {
    this.categoriaService.buscarPorCodigo(codigo)
      .then(categoria => {
        this.categoria = categoria;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarCategoria(form)
    } else {
      this.adicionarCategoria(form);
    }
  }

  adicionarCategoria(form: FormControl) {
    this.categoriaService.adicionar(this.categoria)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Categoria adicionada com sucesso!'});

        form.reset();
        this.categoria = new Categoria();
      })
      .catch(erro => {this.errorHandler.handle(erro)});
  }

  atualizarCategoria(form: FormControl) {
    this.categoriaService.atualizar(this.categoria)
      .then(categoria => {
        this.categoria = categoria;

        this.messageService.add({ severity: 'success', detail: 'Categoria alterada com sucesso!'});
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl) {
    this.categoria = new Categoria();
    form.reset(this.categoria);

    this.router.navigate(['/categorias/nova'])
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de categoria: ${this.categoria.nome}`);
  }

}
