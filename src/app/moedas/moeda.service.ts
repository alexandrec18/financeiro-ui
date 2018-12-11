import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Moeda } from 'app/core/model';
import { environment } from './../../environments/environment';
import { AuthService } from './../seguranca/auth.service';
import { GlobalHttp } from './../seguranca/global-http';

import 'rxjs/add/operator/toPromise';

export class MoedaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class MoedaService {

  moedasUrl: string;

  constructor(
    private http: GlobalHttp,
    private auth: AuthService
  ) {
    this.moedasUrl = `${environment.apiUrl}/moedas`;
  }

  pesquisar(filtro: MoedaFiltro): Promise<any> {
    let params = new HttpParams();

    params = params.append('page', filtro.pagina.toString());
    params = params.append('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    params = params.append('empresa', this.auth.jwtPayload.empresa.codigo);

    return this.http.get<any>(`${this.moedasUrl}`,
        { params })
      .toPromise()
      .then(response => {
        const moedas = response.content;

        const resultado = {
          moedas,
          total: response.totalElements
        };

        return resultado;
      })
  }

  listarTodas(): Promise<any> {
    let params = new HttpParams();

    params = params.append('empresa', this.auth.jwtPayload.empresa.codigo);

    return this.http.get<any>(this.moedasUrl,
        { params })
      .toPromise()
      .then(response => response.content);
  }

  excluir(codigo: number): Promise<void>  {

    return this.http.delete(`${this.moedasUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(moeda: Moeda): Promise<Moeda> {

    moeda.empresa.codigo = this.auth.jwtPayload.empresa.codigo;

    return this.http.post<Moeda>(this.moedasUrl, moeda)
      .toPromise();
  }

  atualizar(moeda: Moeda): Promise<Moeda> {

    return this.http.put<Moeda>(`${this.moedasUrl}/${moeda.codigo}`, moeda)
      .toPromise()
      .then(response => {
        const moedaAlterada = response;

        return moedaAlterada;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Moeda> {

    return this.http.get<Moeda>(`${this.moedasUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const moeda = response;

        return moeda;
      });
  }

}
