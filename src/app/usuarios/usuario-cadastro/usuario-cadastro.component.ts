import { EmpresaService } from './../../empresas/empresa.service';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/components/common/messageservice';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { UsuarioService } from './../usuario.service';
import { Usuario } from '../../core/model';
import { PermissaoService } from 'app/permissoes/permissao.service';
import { SelectItem } from 'primeng/components/common/api';

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.css']
})
export class UsuarioCadastroComponent implements OnInit {

  empresas = [];
  permissoes: SelectItem[];
  usuario = new Usuario();
  permissao = [];

  constructor(
    private usuarioService: UsuarioService,
    private empresaService: EmpresaService,
    private permissoesService: PermissaoService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    const codigoUsuario = this.route.snapshot.params['codigo'];

    this.title.setTitle('Novo usuário');

    if (codigoUsuario) {
      this.carregarUsuario(codigoUsuario);
    }

    this.carregarEmpresas();
    this.carregarPermissoes();
  }

  get editando() {
    return Boolean(this.usuario.codigo);
  }

  carregarUsuario(codigo: number) {
    this.usuarioService.buscarPorCodigo(codigo)
      .then(usuario => {
        this.usuario = usuario;
        this.atualizarTituloEdicao();
        this.atualizarPermissoesEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarUsuario(form)
    } else {
      this.adicionarUsuario(form);
    }
  }

  adicionarUsuario(form: FormControl) {
    this.atualizarPermissoesAdicionar();
    this.usuarioService.adicionar(this.usuario)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Usuário adicionado com sucesso!'});

        form.reset();
        this.usuario = new Usuario();
      })
      .catch(erro => {this.errorHandler.handle(erro)});
  }

  atualizarUsuario(form: FormControl) {
    this.atualizarPermissoesAdicionar();
    this.usuarioService.atualizar(this.usuario)
      .then(usuario => {
        this.usuario = usuario;

        this.atualizarPermissoesEdicao();
        this.messageService.add({ severity: 'success', detail: 'Usuário alterado com sucesso!'});
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl) {
    this.usuario = new Usuario();
    form.reset(this.usuario);

    this.router.navigate(['/usuarios/novo'])
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de usuário: ${this.usuario.nome}`);
  }

  carregarEmpresas() {
    return this.empresaService.listarTodas()
      .then(empresas => {
        this.empresas = empresas.map(c => ({ label: c.nome, value: c.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPermissoes() {
    return this.permissoesService.listarTodas()
      .then(permissoes => {
        this.permissoes = permissoes.map(p => ({ label: p.descricao, value: p.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarPermissoesEdicao() {
    this.usuario.permissoes.forEach((valor, chave) => {
      return this.usuario.permissoes[chave] = valor.codigo;
    });
  };

  atualizarPermissoesAdicionar() {
    this.usuario.permissoes.forEach((valor, chave) => {
      return this.usuario.permissoes[chave] = {codigo: valor};
    });
  };

}
