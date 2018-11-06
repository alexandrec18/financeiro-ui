import { GlobalHttp } from './../seguranca/global-http';
import { AuthService } from './../seguranca/auth.service';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../environments/environment';

import { Pessoa, Estado, Cidade } from './../core/model';

import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class PessoaService {

  pessoasUrl: string;
  cidadesUrl: string;
  estadosUrl: string;

  constructor(
    private http: GlobalHttp,
    private auth: AuthService
  ) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`;
    this.cidadesUrl = `${environment.apiUrl}/cidades`;
    this.estadosUrl = `${environment.apiUrl}/estados`;
  }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    let params = new HttpParams();

    params = params.append('page', filtro.pagina.toString());
    params = params.append('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    params = params.append('empresa', this.auth.jwtPayload.empresa.codigo);

    return this.http.get<any>(`${this.pessoasUrl}`,
        { params })
      .toPromise()
      .then(response => {
        const pessoas = response.content;

        const resultado = {
          pessoas,
          total: response.totalElements
        };

        return resultado;
      })
  }

  listarTodas(): Promise<any> {
    let params = new HttpParams();

    params = params.append('empresa', this.auth.jwtPayload.empresa.codigo);

    return this.http.get<any>(this.pessoasUrl,
      { params })
      .toPromise()
      .then(response => response.content);
  }

  excluir(codigo: number): Promise<void>  {

    return this.http.delete(`${this.pessoasUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    const headers = new HttpHeaders()
        .append('Content-Type', 'application/json');

    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo, { headers })
      .toPromise()
      .then(() => null);
  }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {

    pessoa.empresa.codigo = this.auth.jwtPayload.empresa.codigo;
    pessoa.usuarioCadastro.codigo = this.auth.jwtPayload.codigo;

    return this.http.post<Pessoa>(this.pessoasUrl, pessoa)
      .toPromise();
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {

    return this.http.put<Pessoa>(`${this.pessoasUrl}/${pessoa.codigo}`, pessoa)
      .toPromise()
      .then(response => {
        const pessoaAlterado = response;

        this.converterStringsParaDatas([pessoaAlterado]);

        return pessoaAlterado;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Pessoa> {

    return this.http.get<Pessoa>(`${this.pessoasUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const pessoa = response;

        this.converterStringsParaDatas([pessoa]);

        return pessoa;
      });
  }

  private converterStringsParaDatas(pessoas: Pessoa[]) {
    for (const pessoa of pessoas) {
      if (pessoa.fisica) {
        pessoa.fisica.dataNascimento = moment(pessoa.fisica.dataNascimento,
          'YYYY-MM-DD').toDate();

        if (pessoa.fisica.validadePassaporte) {
          pessoa.fisica.validadePassaporte = moment(pessoa.fisica.validadePassaporte,
            'YYYY-MM-DD').toDate();
        }
      }
    }
  }

  listarEstados(): Promise<Estado[]> {
    return this.http.get<Estado[]>(this.estadosUrl)
      .toPromise();
  }

  pesquisarCidades(estado): Promise<Cidade[]> {
    let params = new HttpParams();

    params = params.append('estado', estado);

    return this.http.get<Cidade[]>(this.cidadesUrl,
      { params })
      .toPromise();
  }
}
