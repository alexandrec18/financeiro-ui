import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { Transporte } from 'app/core/model';
import { Component, OnInit } from '@angular/core';
import { TransporteService } from '../transporte.service';
import { MessageService } from 'primeng/api';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-transporte-cadastro',
  templateUrl: './transporte-cadastro.component.html',
  styleUrls: ['./transporte-cadastro.component.css']
})
export class TransporteCadastroComponent implements OnInit {

  transporte = new Transporte();

  constructor(
    private transporteService: TransporteService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    const codigoTransporte = this.route.snapshot.params['codigo'];

    this.title.setTitle('Novo Transporte');

    if (codigoTransporte) {
      this.carregarTransporte(codigoTransporte);
    }
  }

  get editando() {
    return Boolean(this.transporte.codigo);
  }

  carregarTransporte(codigo: number) {
    this.transporteService.buscarPorCodigo(codigo)
      .then(transporte => {
        this.transporte = transporte;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarTransporte(form)
    } else {
      this.adicionarTransporte(form);
    }
  }

  adicionarTransporte(form: FormControl) {
    this.transporteService.adicionar(this.transporte)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Transporte adicionado com sucesso!'});

        form.reset();
        this.transporte = new Transporte();
      })
      .catch(erro => {this.errorHandler.handle(erro)});
  }

  atualizarTransporte(form: FormControl) {
    this.transporteService.atualizar(this.transporte)
      .then(transporte => {
        this.transporte = transporte;

        this.messageService.add({ severity: 'success', detail: 'Transporte alterado com sucesso!'});
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl) {
    this.transporte = new Transporte();
    form.reset(this.transporte);

    this.router.navigate(['/transportes/novo'])
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de transporte: ${this.transporte.nome}`);
  }

}
