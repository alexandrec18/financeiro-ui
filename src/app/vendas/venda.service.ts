import { Injectable, EventEmitter } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { Venda } from 'app/core/model';
import { environment } from './../../environments/environment';
import { AuthService } from './../seguranca/auth.service';
import { GlobalHttp } from './../seguranca/global-http';

import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';

export class VendaFiltro {
  situacao: string;
  pagante: string;
  periodoInicial: Date;
  periodoFinal: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class VendaService {

  vendasUrl: string;
  emitirPassageiroValores = new EventEmitter();
  emitirCalcularFormaPagamentoSaldo = new EventEmitter();

  constructor(
    private http: GlobalHttp,
    private auth: AuthService
  ) {
    this.vendasUrl = `${environment.apiUrl}/vendas`;
  }

  eventPassageiroValores(valores: any) {
    this.emitirPassageiroValores.emit(valores);
  }

  eventCalcularFormaPagamentoSaldo() {
    this.emitirCalcularFormaPagamentoSaldo.emit();
  }

  descricaoProduto(produto: string) {
    if (produto === 'PA') {
      return 'Passagem Aérea';
    }
    if (produto === 'DH') {
      return 'Diária de Hospedagem';
    }
    if (produto === 'PT') {
      return 'Pacote Turístico';
    }
    if (produto === 'AC') {
      return 'Aluguel de Carro';
    }
    if (produto === 'VI') {
      return 'Visto';
    }
    if (produto === 'SV') {
      return 'Seguro Viagem';
    }
    if (produto === 'SE') {
      return 'Serviço';
    }
    if (produto === 'IG') {
      return 'Ingresso';
    }
    if (produto === 'CI') {
      return 'Chip Internacional';
    }
    return '';
  }

  pesquisar(filtro: VendaFiltro): Promise<any> {
    let params = new HttpParams();

    params = params.append('page', filtro.pagina.toString());
    params = params.append('size', filtro.itensPorPagina.toString());

    if (filtro.pagante) {
      params = params.append('pagante', filtro.pagante);
    }

    if (filtro.situacao) {
      params = params.append('situacao', filtro.situacao);
    }

    if (filtro.periodoInicial) {
      params = params.append('periodoInicial',
        moment(filtro.periodoInicial).format('YYYY-MM-DD'));
    }

    if (filtro.periodoFinal) {
      params = params.append('periodoFinal',
        moment(filtro.periodoFinal).format('YYYY-MM-DD'));
    }

    params = params.append('empresa', this.auth.jwtPayload.empresa.codigo);

    return this.http.get<any>(`${this.vendasUrl}?resumo`,
        { params })
      .toPromise()
      .then(response => {
        const vendas = response.content;

        const resultado = {
          vendas,
          total: response.totalElements
        };

        return resultado;
      })
  }

  excluir(codigo: number): Promise<void>  {

    return this.http.delete(`${this.vendasUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(venda: Venda): Promise<Venda> {

    venda.empresa.codigo = this.auth.jwtPayload.empresa.codigo;
    venda.dataCadastro = new Date();
    venda.usuarioCadastro.codigo = this.auth.jwtPayload.codigo;

    this.AjustarHorarioTimeZone(venda);

    return this.http.post<Venda>(this.vendasUrl, venda)
      .toPromise();
  }

  atualizar(venda: Venda): Promise<Venda> {

    this.AjustarHorarioTimeZone(venda);

    return this.http.put<Venda>(`${this.vendasUrl}/${venda.codigo}`, venda)
      .toPromise()
      .then(response => {
        const vendaAlterado = response;

        this.converterStringsParaDatas([vendaAlterado]);

        return vendaAlterado;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Venda> {

    return this.http.get<Venda>(`${this.vendasUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const venda = response;

        this.converterStringsParaDatas([venda]);

        return venda;
      });
  }

  private converterStringsParaDatas(vendas: Venda[]) {
    for (const venda of vendas) {
      venda.dataVenda = moment(venda.dataVenda,
        'YYYY-MM-DD').toDate();

      venda.dataCadastro = moment(venda.dataCadastro,
        'YYYY-MM-DD').toDate();

      if (venda.periodoInicial) {
        venda.periodoInicial = moment(venda.periodoInicial,
          'YYYY-MM-DD').toDate();
      }

      if (venda.periodoFinal) {
        venda.periodoFinal = moment(venda.periodoFinal,
          'YYYY-MM-DD').toDate();
      }

      for (const vendaProduto of venda.vendaProduto) {

        if (vendaProduto.dataInicio) {
          vendaProduto.dataInicio = moment(vendaProduto.dataInicio,
            'YYYY-MM-DD').toDate();
        }

        if (vendaProduto.dataFim) {
          vendaProduto.dataFim = moment(vendaProduto.dataFim,
            'YYYY-MM-DD').toDate();
        }

        if (vendaProduto.horaInicio) {
          vendaProduto.horaInicio = moment(vendaProduto.horaInicio,
            'YYYY-MM-DD HH:mm:ss').toDate();
        }

        if (vendaProduto.horaFim) {
          vendaProduto.horaFim = moment(vendaProduto.horaFim,
            'YYYY-MM-DD HH:mm:ss').toDate();
        }

        for (const vendaProdutoTrecho of vendaProduto.vendaProdutoTrecho) {

          if (vendaProdutoTrecho.dataSaida) {
            vendaProdutoTrecho.dataSaida = moment(vendaProdutoTrecho.dataSaida,
              'YYYY-MM-DD').toDate();
          }

          if (vendaProdutoTrecho.dataChegada) {
            vendaProdutoTrecho.dataChegada = moment(vendaProdutoTrecho.dataChegada,
              'YYYY-MM-DD').toDate();
          }

          if (vendaProdutoTrecho.horaSaida) {
            vendaProdutoTrecho.horaSaida = moment(vendaProdutoTrecho.horaSaida,
              'YYYY-MM-DD HH:mm:ss').toDate();
          }

          if (vendaProdutoTrecho.horaChegada) {
            vendaProdutoTrecho.horaChegada = moment(vendaProdutoTrecho.horaChegada,
              'YYYY-MM-DD HH:mm:ss').toDate();
          }
        }
      }

      for (const vendaFormaPagamento of venda.vendaFormaPagamento) {
        if (vendaFormaPagamento.data) {
          vendaFormaPagamento.data = moment(vendaFormaPagamento.data,
            'YYYY-MM-DD').toDate();
        }
      }
    }
  }

  private AjustarHorarioTimeZone(venda: Venda) {
    for (const vendaProduto of venda.vendaProduto) {

      if (vendaProduto.horaInicio) {
        vendaProduto.horaInicio =
          new Date(vendaProduto.horaInicio.valueOf() -
          vendaProduto.horaInicio.getTimezoneOffset() * 60000);
      }

      if (vendaProduto.horaFim) {
        vendaProduto.horaFim =
          new Date(vendaProduto.horaFim.valueOf() -
          vendaProduto.horaFim.getTimezoneOffset() * 60000);
      }

      for (const vendaProdutoTrecho of vendaProduto.vendaProdutoTrecho) {
        if (vendaProdutoTrecho.horaSaida) {
          vendaProdutoTrecho.horaSaida =
            new Date(vendaProdutoTrecho.horaSaida.valueOf() -
              vendaProdutoTrecho.horaSaida.getTimezoneOffset() * 60000);
        }

        if (vendaProdutoTrecho.horaChegada) {
          vendaProdutoTrecho.horaChegada =
            new Date(vendaProdutoTrecho.horaChegada.valueOf() -
              vendaProdutoTrecho.horaChegada.getTimezoneOffset() * 60000);
        }
      }
    }
  }
}
