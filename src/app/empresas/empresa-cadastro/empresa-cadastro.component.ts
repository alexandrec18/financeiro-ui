import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { EmpresaService } from './../empresa.service';
import { Empresa } from './../../core/model';

@Component({
  selector: 'app-empresa-cadastro',
  templateUrl: './empresa-cadastro.component.html',
  styleUrls: ['./empresa-cadastro.component.css']
})
export class EmpresaCadastroComponent implements OnInit {

  empresa = new Empresa();

  constructor(
    private empresaService: EmpresaService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    const codigoEmpresa = this.route.snapshot.params['codigo'];

    this.title.setTitle('Nova Empresa');

    if (codigoEmpresa) {
      this.carregarEmpresa(codigoEmpresa);
    }
  }
  get editando() {
    return Boolean(this.empresa.codigo);
  }

  carregarEmpresa(codigo: number) {
    this.empresaService.buscarPorCodigo(codigo)
      .then(empresa => {
        this.empresa = empresa;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarEmpresa(form)
    } else {
      this.adicionarEmpresa(form);
    }
  }

  adicionarEmpresa(form: FormControl) {
    this.empresaService.adicionar(this.empresa)
      .then(() => {
        this.toasty.success('Empresa adicionada com sucesso!');

        form.reset();
        this.empresa = new Empresa();
      })
      .catch(erro => {this.errorHandler.handle(erro)});
  }

  atualizarEmpresa(form: FormControl) {
    this.empresaService.atualizar(this.empresa)
      .then(empresa => {
        this.empresa = empresa;

        this.toasty.success('Empresa alterada com sucesso!');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl) {
    this.empresa = new Empresa();
    form.reset(this.empresa);

    this.router.navigate(['/empresas/nova'])
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de empresa: ${this.empresa.nome}`);
  }
}
