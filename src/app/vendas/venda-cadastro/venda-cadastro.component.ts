import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { MessageService, SelectItem } from 'primeng/api';

import { AuthService } from './../../seguranca/auth.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { Venda, Pessoa, Aeroporto, Acomodacao, TipoAcomodacao, Regime, Pacote, Transporte } from 'app/core/model';
import { VendaService } from '../venda.service';
import { PessoaService } from 'app/pessoas/pessoa.service';
import { EmpresaService } from 'app/empresas/empresa.service';
import { UsuarioService } from 'app/usuarios/usuario.service';

@Component({
  selector: 'app-venda-cadastro',
  templateUrl: './venda-cadastro.component.html',
  styleUrls: ['./venda-cadastro.component.css']
})
export class VendaCadastroComponent implements OnInit {

  empresa: string;
  vendedor: string;
  periodo: string;
  situacao: string;

  venda = new Venda();

  intermediarios: [];
  pagantes: [];
  solicitantes: [];
  empresas: SelectItem[];
  vendedores: SelectItem[];

  dates: Array<Date>;

  isReady: boolean;

  constructor(
    private vendaService: VendaService,
    private pessoaService: PessoaService,
    private empresaService: EmpresaService,
    private usuarioService: UsuarioService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private auth: AuthService
    ) { }

  ngOnInit() {
    const codigoVenda = this.route.snapshot.params['codigo'];

    this.title.setTitle('Nova venda');

    if (codigoVenda) {
      this.carregarVenda(codigoVenda);
    }

    this.carregarEmpresa();
    this.carregarVendador();
    this.carregarIntermediarios();
    this.carregarPagantes();
    this.carregarSolicitantes();

    this.situacao = this.venda.situacao;

    this.isReady = true;
  }

  get editando() {
    return Boolean(this.venda.codigo);
  }

  carregarVenda(codigo: number) {
    this.vendaService.buscarPorCodigo(codigo)
      .then(venda => {
        this.venda = venda;

        this.atualizarTituloEdicao();
        this.iniciarVariaveis();
        this.iniciarVerificacoes();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    this.validacoesSalvar();

    if (this.editando) {
      this.atualizarVenda(form)
    } else {
      this.adicionarVenda(form);
    }
  }

  adicionarVenda(form: FormControl) {

    if (!this.venda.vendedor.codigo) {
      this.venda.vendedor.codigo = this.auth.jwtPayload.codigo;
    }

    this.calcularTotaisVenda();

    this.vendaService.adicionar(this.venda)
      .then(vendaAdicionado => {
        this.messageService.add({ severity: 'success', detail: 'Venda adicionada com sucesso!'});

        this.router.navigate(['/vendas', vendaAdicionado.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarVenda(form: FormControl) {
    this.isReady = false;

    this.calcularTotaisVenda();

    this.vendaService.atualizar(this.venda)
      .then(venda => {
        this.venda = venda;

        this.isReady = true;
        this.messageService.add({ severity: 'success', detail: 'Venda alterada com sucesso!'});
        this.atualizarTituloEdicao();
        this.iniciarVerificacoes();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarIntermediarios() {
    return this.pessoaService.listarTodas()
      .then(intermediarios => {
        this.intermediarios = intermediarios.map(i => ({ label: i.nome, value: i.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPagantes() {
    return this.pessoaService.listarTodas()
      .then(pagantes => {
        this.pagantes = pagantes.map(p => ({ label: p.nome, value: p.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarSolicitantes() {
    return this.pessoaService.listarTodas()
      .then(solicitantes => {
        this.solicitantes = solicitantes.map(s => ({ label: s.nome, value: s.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl) {
    this.venda = new Venda();
    form.reset(this.venda);

    this.router.navigate(['/vendas/nova'])
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de venda: ${this.venda.codigo}`);
  }

  iniciarVariaveis() {
    this.dates = [this.venda.periodoInicial ? this.venda.periodoInicial : this.venda.dataVenda,
                  this.venda.periodoFinal ? this.venda.periodoFinal : this.venda.dataVenda]
    this.situacao = this.venda.situacao;
  }

  carregarEmpresa() {
    return this.empresaService.buscarPorCodigo(this.auth.jwtPayload.empresa.codigo)
      .then(empresas => {
        this.empresas = [{label: empresas.nome, value: empresas.codigo}];
      })
      .catch(erro => this.errorHandler.handle(erro));

  };

  carregarVendador() {
    return this.usuarioService.buscarPorCodigo(this.auth.jwtPayload.codigo)
    .then(usuarios => {
      this.vendedores = [{label: usuarios.nome, value: usuarios.codigo}];
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  calcularTotaisVenda() {
    this.venda.totalProdutos = 0;
    this.venda.totalFinal = 0;
    for (const vendaProduto of this.venda.vendaProduto) {
      this.venda.totalProdutos += vendaProduto.valoresVendaProduto.totalProdutoBrl;
      this.venda.totalFinal += vendaProduto.valoresVendaProduto.valorTotalBrl;
    }
  }

  validacoesSalvar() {
    if (!this.venda.intermediario.codigo) { this.venda.intermediario = null }
    if (!this.venda.solicitante.codigo) { this.venda.solicitante = null }

    for (const vendaProduto of this.venda.vendaProduto) {

      if (!vendaProduto.representante.codigo) { vendaProduto.representante = null; }
      if (!vendaProduto.acomodacao.codigo) { vendaProduto.acomodacao = null; }
      if (!vendaProduto.tipoAcomodacao.codigo) { vendaProduto.tipoAcomodacao = null; }
      if (!vendaProduto.regime.codigo) { vendaProduto.regime = null; }
      if (!vendaProduto.pacote.codigo) { vendaProduto.pacote = null; }
      if (!vendaProduto.transporte.codigo) { vendaProduto.transporte = null; }

        for (const vendaProdutoTrecho of vendaProduto.vendaProdutoTrecho) {

          if (vendaProdutoTrecho.aeroportoOrigem !== null) {
            if (!vendaProdutoTrecho.aeroportoOrigem.codigo) {vendaProdutoTrecho.aeroportoOrigem = null; }
          }
          if (vendaProdutoTrecho.aeroportoDestino !== null) {
            if (!vendaProdutoTrecho.aeroportoDestino.codigo) {vendaProdutoTrecho.aeroportoDestino = null; }
          }

        }
    }

  }

  iniciarVerificacoes() {
    if (this.venda.intermediario === null) { this.venda.intermediario = new Pessoa() }
    if (this.venda.solicitante === null) { this.venda.solicitante = new Pessoa() }

    for (const vendaProduto of this.venda.vendaProduto) {

      if (vendaProduto.representante === null) { vendaProduto.representante = new Pessoa(); }
      if (vendaProduto.acomodacao === null) { vendaProduto.acomodacao = new Acomodacao(); }
      if (vendaProduto.tipoAcomodacao === null ) { vendaProduto.tipoAcomodacao = new TipoAcomodacao(); }
      if (vendaProduto.regime === null) { vendaProduto.regime = new Regime() }
      if (vendaProduto.pacote === null) { vendaProduto.pacote = new Pacote() }
      if (vendaProduto.transporte === null) { vendaProduto.transporte = new Transporte() }

    }
  }
}
